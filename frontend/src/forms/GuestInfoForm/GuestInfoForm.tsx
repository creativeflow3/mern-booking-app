import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useSearchContext } from '../../context/SearchContext';
import { useAppContext } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [dateError, setDateError] = useState<boolean>(false);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    // date problems, missing date or checkIn is after checkOut
    if (!data.checkIn || !data.checkOut || data.checkIn > data.checkOut) {
      return;
    }
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate('/sign-in', { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    // date problems, missing date or checkIn is after checkOut
    if (!data.checkIn || !data.checkOut || data.checkIn > data.checkOut) {
      return;
    }
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  const handleDateChange = (date: Date, type: 'checkIn' | 'checkOut') => {
    if (!date) {
      return;
    }

    setValue(type, date);

    if (type === 'checkIn') {
      if (date > checkOut) {
        setDateError(true);
      } else {
        setDateError(false);
      }
    }

    if (type === 'checkOut') {
      if (date < checkIn) {
        setDateError(true);
      } else {
        setDateError(false);
      }
    }
  };

  const errorBord = ' border-4 border-solid border-red-500';

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => handleDateChange(date as Date, 'checkIn')} // Use the handleDateChange to set the value and check for errors
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in date"
              className={`min-w-full bg-white p-2 focus:outline-none${dateError ? errorBord : ''}`}
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => handleDateChange(date as Date, 'checkOut')} // Use the handleDateChange to set the value and check for errors
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out date"
              className={`min-w-full bg-white p-2 focus:outline-none${dateError ? errorBord : ''}`}
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register('adultCount', {
                  required: 'This field is required',
                  min: {
                    value: 1,
                    message: 'There must be at least one adult',
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register('childCount', {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;

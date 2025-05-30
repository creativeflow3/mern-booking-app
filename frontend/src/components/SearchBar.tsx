import { FormEvent, useState } from 'react';
import { useSearchContext } from '../context/SearchContext';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [dateError, setDateError] = useState<boolean>(false);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // date problems, missing date or checkIn is after checkOut
    if (!checkIn || !checkOut || checkIn > checkOut) {
      setDateError(true);
      return;
    }
    setDateError(false);
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate('/search');
  };

  const handleDateChange = (date: Date, type: string) => {
    if (!date) {
      // setDateError(true);
      return;
    }
    if (type === 'checkIn') {
      setCheckIn(date);
      if (date > checkOut) {
        setDateError(true);
      } else {
        setDateError(false);
      }
    }
    if (type === 'checkOut') {
      setCheckOut(date);
      if (date < checkIn) {
        setDateError(true);
      } else {
        setDateError(false);
      }
    }
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const errorBord = ' border-4 border-solid border-red-500';

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-rowitems-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
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
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          // onChange={(date) => setCheckIn(date as Date)}
          onChange={(date) =>
            handleDateChange(date as Date, 'checkIn' as string)
          }
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className={`w-full m:min-w-full bg-white px-1 py-2 focus:outline-none${dateError ? errorBord : ''}`}
          wrapperClassName="min-w-full"
          id="picker-checkin"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          // onChange={(date) => setCheckOut(date as Date)}
          onChange={(date) =>
            handleDateChange(date as Date, 'checkOut' as string)
          }
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className={`w-full m:min-w-full bg-white px-1 py-2 focus:outline-none${dateError ? errorBord : ''}`}
          wrapperClassName="min-w-full"
          id="picker-checkout"
        />
      </div>
      <div className="flex gap-1">
        <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
          Search
        </button>
        <button className="w-1/3 bg-red-600 text-white h-full py-2 px-1 m:px-2 font-bold text-xl hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

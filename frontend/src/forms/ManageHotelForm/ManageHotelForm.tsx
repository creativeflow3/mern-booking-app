import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
  starRating: number;
};

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <DetailsSection />
        <TypeSection />
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;

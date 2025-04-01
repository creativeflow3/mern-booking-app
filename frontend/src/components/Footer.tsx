const Footer = () => {
  return (
    <div className="bg-blue-800 py-10 px-4 m:px-0">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-l m:text-3xl text-white font-bold tracking-tight">
          McneilHolidays.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;

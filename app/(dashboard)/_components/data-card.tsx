import React from 'react';

interface DataCardProps {
  title: string;
  value: string;
  unit: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, value, unit }) => {
  return (
    <div className=' bg-white h-fit border border-[#F0F0F0] rounded-2xl px-5 py-5 lg:py-10'>
      <h2 className='text-xl mb-2' >{title}</h2>
      <div>
        <span className='text-customBlue text-[40px] font-black'>
          {value}
        </span>
        <span className='text-xl pl-1 text-customGrey' >
          {unit}
        </span>
      </div>
    </div>
  );
};

export default DataCard;

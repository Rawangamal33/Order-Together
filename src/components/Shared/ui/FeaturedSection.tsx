import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaLink } from 'react-icons/fa';
import { TbMoneybag } from 'react-icons/tb';
import { Element } from 'react-scroll';
import { FaCircleCheck } from 'react-icons/fa6';

const FeaturedSection = () => {
  const featuresData = [
    {
      id: 1,
      icon: <MdOutlineShoppingCart />,
      headText: 'Create a Cart',
      text: 'Pick a restaurant and start a lobby. You become the Host and control the order.',
    },
    {
      id: 2,
      icon: <FaLink />,
      headText: 'Share the Code',
      text: 'Send unique code to friends. They join and add their own items to the cart.',
    },
    {
      id: 3,
      icon: <TbMoneybag />,
      headText: 'Track Debts',
      text: 'We calculate exactly what everyone owes (including delivery fees) so the Host gets paid back.',
    },
  ];

  const cartCreatorFeatures = [
    {
      id: 1,
      icon: <FaCircleCheck />,
      headText: 'Real-time Totals: ',
      text: 'See exactly how much cash you need to collect.',
    },
    {
      id: 2,
      icon: <FaCircleCheck />,
      headText: 'Fair Splitting: ',
      text: 'Delivery fees are automatically split among participants.',
    },
    {
      id: 3,
      icon: <FaCircleCheck />,
      headText: 'Status Tracking: ',
      text: 'Mark friends as Paid when they send you the money.',
    },
  ];
  return (
    <Element name='workGuide'>
      <div className='mt-9 flex flex-col items-center pb-5'>
        <div className='flex items-center gap-4'>
          <div className='md:w-14 w-12 h-[3px] bg-[#a9acae]' />
          <h3 className='text-[#9b9d9e] md:mx-3 font-semibold md:text-3xl text-2xl'>
            Now you can
          </h3>
          <div className='md:w-14 w-12 h-[3px]  bg-[#a9acae]' />
        </div>

        <div className='flex flex-col items-center gap-4 sm:gap-0 sm:flex-row sm:justify-evenly sm:items-center  mt-6'>
          {featuresData.map((feature) => {
            return (
              <div
                key={feature.id}
                className='border border-[#ddd] rounded-lg p-7 sm:w-[30%] w-[90%] items-center space-y-1.5 shadow-[2px_2px_9px_-2px_#ddd]'
              >
                <div className='sm:text-2xl text-lg text-white p-3 bg-orange-600 rounded-md w-fit'>
                  {feature.icon}
                </div>
                <h4 className='font-semibold text-gray-800 mt-3 tracking-wide sm:text-base text-sm'>
                  {feature.headText}
                </h4>
                <p className='text-gray-500 tracking-wide leading-[23px] sm:text-base text-sm'>
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className='mb-16 md:flex-row md:justify-between md:gap-5 flex flex-col gap-10 mt-14 mx-9'>
        <div>
          <h4 className='sm:text-3xl text-2xl text-gray-800 mb-4 font-semibold'>
            The Cart Creator
          </h4>
          <ul className='space-y-4'>
            {cartCreatorFeatures.map((feature) => {
              return (
                <li key={feature.id} className='flex gap-4'>
                  <div className='mt-1.5 text-green-600'>{feature.icon}</div>
                  <p>
                    <span className='font-semibold text-gray-800'>
                      {feature.headText}
                    </span>

                    <span className='text-gray-600'>{feature.text}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className='md:w-1/2 relative'>
          <div className='absolute inset-0 bg-gradient-to-tr from-green-400 to-green-600 rounded-2xl rotate-3 opacity-10 blur-lg'></div>

          <div className='bg-white border border-gray-200 rounded-2xl shadow-md p-6 relative'>
            <div className='flex justify-between items-center border-b border-gray-100 pb-4 mb-4'>
              <div className='h-4 w-24 bg-gray-200 rounded'></div>
              <div className='h-8 w-8 bg-gray-100 rounded-full'></div>
            </div>

            <div className='space-y-3'>
              <div className='flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-green-200 rounded-full'></div>
                  <div className='h-3 w-20 bg-green-200 rounded'></div>
                </div>
                <div className='h-5 w-12 bg-green-300 rounded-full'></div>
              </div>

              <div className='flex justify-between items-center p-3 bg-white rounded-lg border border-red-200 border-l-4 border-l-red-500'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-orange-100 rounded-full'></div>
                  <div className='h-3 w-20 bg-gray-200 rounded'></div>
                </div>
                <div className='h-5 w-12 bg-orange-100 rounded-full'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default FeaturedSection;

import DialogTrigger from '../Dialog/DialogTrigger';

export interface EmptyDataTableProps {
  headText: string;
  text: string;
  btnText: string;
  ariaLabel: string;
  title: string;
  children: React.ReactNode;
}

const EmptyDataTable = ({
  headText,
  text,
  btnText,
  ariaLabel,
  title,
  children,
}: EmptyDataTableProps) => {
  return (
    <section>
      <p className='text-center mt-5 text-xl font-semibold text-blue-600'>
        {headText}
      </p>
      <p className='text-center text-lg  text-gray-500'>{text}</p>

      <div className='mb-5'>
        <DialogTrigger
          trigger={
            <button className='flex-center gap-2 mx-auto mt-4 shadow-md py-2 px-4 border border-gray-300 hover:bg-gray-100 rounded-md'>
              <span className='font-sans text-gray-600 font-semibold'>
                {btnText}
              </span>
            </button>
          }
          ariaLabel={ariaLabel}
          title={title}
          showCloseIcon={true}
          maxWidth='sm'
        >
          {children}
        </DialogTrigger>
      </div>
    </section>
  );
};

export default EmptyDataTable;

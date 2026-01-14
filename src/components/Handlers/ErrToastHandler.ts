import { toast } from 'react-toastify';

const ErrToastHandler = (err: any) => {
  if (!err?.data) {
    toast.error('Please check Network Connection.');
  } else if (err?.data?.status === 409) {
    toast.error(err.data.title);
  } else if (err?.data?.status === 401) {
    toast.error(err.data.title);
  } else if (err?.data?.status === 400) {
    toast.error(err.data.title);
  } else {
    toast.error('Something went wrong. Please try again.');
  }
};

export default ErrToastHandler;

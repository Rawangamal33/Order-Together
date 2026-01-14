import { Button } from '../ui/button';

interface FormButtonActionsProps {
  onClose?: () => void;
  isValid: boolean;
  isLoading?: boolean;
  isUploadingFile?: boolean;
  loadingLabel?: string;
  submitLabel: string;
}

const FormButtonActions = ({
  onClose,
  isValid,
  isLoading = false,
  isUploadingFile = false,
  loadingLabel = 'Saving...',
  submitLabel,
}: FormButtonActionsProps) => {
  return (
    <div className='flex justify-between items-center mt-4'>
      {onClose && (
        <Button
          variant='outline'
          type='button'
          className='border-gray-300'
          onClick={onClose}
        >
          Cancel
        </Button>
      )}
      <Button
        type='submit'
        size={'sm'}
        variant='destructive'
        disabled={!isValid || isUploadingFile || isLoading}
      >
        {isLoading ? loadingLabel : submitLabel}
      </Button>
    </div>
  );
};

export default FormButtonActions;

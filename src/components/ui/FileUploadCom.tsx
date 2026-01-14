import CircularProgress from '@mui/material/CircularProgress';
import type { ChangeEvent } from 'react';
import { BsFillImageFill } from 'react-icons/bs';

export interface FileUploadComProps {
  previewLogo: string;
  isUploading: boolean;
  fileUploadErr: any;
  handleUploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const FileUploadCom = ({
  previewLogo,
  isUploading,
  fileUploadErr,
  handleUploadFile,
}: FileUploadComProps) => {
  return (
    <div>
      <label
        htmlFor='upload-image'
        className={`w-full mx-auto h-32 cursor-pointer flex flex-col items-center justify-center gap-2 ${
          !previewLogo &&
          'border-2 border-dashed rounded-md border-gray-300 bg-[#F9FAFB]'
        }`}
      >
        {isUploading ? (
          <CircularProgress size={40} color='primary' />
        ) : previewLogo ? (
          <img
            src={previewLogo}
            className='max-h-24 max-w-full object-contain rounded-lg'
            alt='Restaurant logo preview'
          />
        ) : (
          <>
            <div className='text-[23px] text-[#9CA3AF]'>
              <BsFillImageFill />
            </div>
            <p className='text-xs text-[#6B7280]'>
              Click to upload (.jpg, .png, and .webp).
            </p>
          </>
        )}
      </label>

      <input
        type='file'
        name='file'
        id='upload-image'
        className='hidden'
        accept='.jpg, .png, .jpeg, .webp'
        onChange={handleUploadFile}
      />
      {fileUploadErr && (
        <div className='text-red-600 mt-2 text-sm'>
          {(fileUploadErr as any).data.title ||
            'File upload failed. Please Try again.'}
        </div>
      )}
    </div>
  );
};

export default FileUploadCom;

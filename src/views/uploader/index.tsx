import { FC } from 'react';

import { UploadMetadata } from 'components/UploadMetadata';

export const UploaderView: FC = ({ }) => {

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text text-purple-800">
          Upload Metadata
        </h1>      
        <div className="text-center">
          <UploadMetadata />
        </div>
      </div>
    </div>
  );
};

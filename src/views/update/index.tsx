import { FC } from 'react';

import { UpdateMetadata } from 'components/UpdateMetadata';

export const UpdateView: FC = ({ }) => {

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-purple-800 text-transparent bg-clip-text ">
          Update Metadata
        </h1>      
        <div className="text-center">
          <UpdateMetadata />
        </div>
      </div>
    </div>
  );
};

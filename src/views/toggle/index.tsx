// Next, React
import { FC } from 'react';
import { ToggleFreeze } from 'components/ToggleFreeze';

export const ToggleFreezeView: FC = ({ }) => {

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text text-purple-800">
          Toggle Freeze
        </h1>      
        <div className="text-center">
          <ToggleFreeze />
        </div>
      </div>
    </div>
  );
};

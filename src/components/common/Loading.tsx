import React from 'react';
import { UI } from '../../constants';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-bounce flex">
        <span
          className={`${UI.LOADING_DOT_SIZE} ${UI.LOADING_DOT_COLORS.PRIMARY} rounded-full mx-1`}
        ></span>
        <span
          className={`${UI.LOADING_DOT_SIZE} ${UI.LOADING_DOT_COLORS.SECONDARY} 
          rounded-full mx-1 animate-bounce delay-100`}
        ></span>
        <span
          className={`${UI.LOADING_DOT_SIZE} ${UI.LOADING_DOT_COLORS.TERTIARY} 
          rounded-full mx-1 animate-bounce delay-200`}
        ></span>
      </div>
    </div>
  );
};

export default Loading;

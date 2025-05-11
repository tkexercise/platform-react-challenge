import React from 'react';
const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-40" data-testid="loading">
      <div className="animate-bounce flex">
        <span className="w-4 h-4 bg-action rounded-full mx-1"></span>
        <span
          className="w-4 h-4 bg-action/60
          rounded-full mx-1 animate-bounce delay-100"
        ></span>
        <span
          className="w-4 h-4 bg-action/30 rounded-full mx-1 
            animate-bounce delay-200"
        ></span>
      </div>
    </div>
  );
};

export default Loading;

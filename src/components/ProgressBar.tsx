import React from 'react';

interface ProgressBarProps {
  progress: number; // 进度，取值 0 - 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;

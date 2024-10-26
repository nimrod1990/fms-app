// src/components/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  progress: number; // 进度，取值 0 - 100
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ progress }) => {
  return (
    <div
      className="progress-bar-container"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="测试进度"
    >
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
});

export default ProgressBar;

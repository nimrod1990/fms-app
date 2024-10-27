// src/components/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  progress: number; // 进度，取值 0 - 100
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ progress }) => {
  // 确保 progress 在 0 - 100 之间
  const validProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className="progress-bar-container"
      role="progressbar"
      aria-valuenow={validProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="测试进度"
    >
      <div className="progress-bar" style={{ width: `${validProgress}%` }}>
        <span>{Math.round(validProgress)}%</span>
      </div>
    </div>
  );
});

export default ProgressBar;

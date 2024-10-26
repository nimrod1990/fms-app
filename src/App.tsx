// src/App.tsx
import React, { useState, Suspense, lazy } from 'react';
import ProgressBar from './components/ProgressBar';
import data from './data/fmsData';
import { TestResult, PersonalInfo } from './types';
import './styles/App.css';

// 使用 React.lazy 懒加载组件
const PersonalInfoForm = lazy(() => import('./components/PersonalInfoForm'));
const Test = lazy(() => import('./components/Test'));
const Summary = lazy(() => import('./components/Summary'));

const App: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [currentTestIndex, setCurrentTestIndex] = useState<number>(0);
  const [results, setResults] = useState<TestResult[]>([]);

  const handlePersonalInfoSubmit = (info: PersonalInfo) => {
    setPersonalInfo(info);
  };

  const handleNext = (score: number, clearingTest: boolean | null) => {
    const testName = data.categories[currentTestIndex].test_name;
    const finalScore = clearingTest ? 0 : score;
    const newResult: TestResult = { testName, score: finalScore, clearingTest };
    const updatedResults = [...results];
    updatedResults[currentTestIndex] = newResult; // 覆盖当前测试结果
    setResults(updatedResults);

    if (currentTestIndex < data.categories.length - 1) {
      setCurrentTestIndex(currentTestIndex + 1);
    } else {
      // 所有测试完成
      setCurrentTestIndex(-1);
    }
  };

  const handleBack = () => {
    if (currentTestIndex > 0) {
      setCurrentTestIndex(currentTestIndex - 1);
    }
  };

  const handleRestart = () => {
    setPersonalInfo(null);
    setCurrentTestIndex(0);
    setResults([]);
  };

  return (
    <Suspense fallback={<div>加载中...</div>}>
      {!personalInfo ? (
        <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} />
      ) : currentTestIndex === -1 ? (
        <Summary results={results} personalInfo={personalInfo} onRestart={handleRestart} />
      ) : (
        <div className="app-container">
          <ProgressBar progress={((currentTestIndex + 1) / data.categories.length) * 100} />
          <Test
            key={data.categories[currentTestIndex].test_name}
            test={data.categories[currentTestIndex]}
            onNext={handleNext}
            onBack={handleBack}
            existingResult={results[currentTestIndex] || null}
          />
        </div>
      )}
    </Suspense>
  );
};

export default App;

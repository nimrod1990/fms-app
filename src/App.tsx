// src/App.tsx
import React, { useState } from 'react';
import PersonalInfoForm from './components/PersonalInfoForm';
import Test from './components/Test';
import Summary from './components/Summary';
import ProgressBar from './components/ProgressBar';
import data from './data/fmsData';
import { TestResult, PersonalInfo } from './types';
import './styles/App.css';

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

  if (!personalInfo) {
    // 显示个人信息表单
    return <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} />;
  }

  if (currentTestIndex === -1) {
    // 显示总结页面
    return <Summary results={results} personalInfo={personalInfo} onRestart={handleRestart} />;
  }

  const currentTest = data.categories[currentTestIndex];
  const progress = ((currentTestIndex + 1) / data.categories.length) * 100;

  // 获取当前测试的已有结果（如果有）
  const existingResult = results[currentTestIndex] || null;

  return (
    <div className="app-container">
      <ProgressBar progress={progress} />
      {/* 添加 key 属性，确保每次测试切换时 Test 组件重新挂载 */}
      <Test
        key={currentTest.test_name}
        test={currentTest}
        onNext={handleNext}
        onBack={handleBack}
        existingResult={existingResult}
      />
    </div>
  );
};

export default App;

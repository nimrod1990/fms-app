// src/components/Summary.tsx
import React from 'react';
import { TestResult, PersonalInfo } from '../types';
import { generateMarkdown } from '../utils/markdown';

interface SummaryProps {
  results: TestResult[];
  personalInfo: PersonalInfo;
}

const Summary: React.FC<SummaryProps> = ({ results, personalInfo }) => {
  const totalScore = results.reduce((sum, result) => sum + result.score, 0);

  const handleExport = () => {
    const markdownContent = generateMarkdown(results, personalInfo);
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'FMS评估结果.md';
    link.click();
  };

  return (
    <div className="summary-container">
      <h2>评估结果</h2>
      <div className="personal-info">
        <p>被测试者姓名：{personalInfo.name}</p>
        <p>测试时间：{personalInfo.testDate}</p>
        <p>优势手：{personalInfo.dominantHand}</p>
        <p>优势脚：{personalInfo.dominantFoot}</p>
        <p>测试者：{personalInfo.tester}</p>
        <p>总分：{totalScore} / 21</p>
      </div>
      <div className="results-chart">
        {/* 可以在这里添加图表组件来可视化结果 */}
        {/* 由于不使用外部库，这里以简单的方式展示 */}
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <strong>{result.testName}</strong>: 得分 {result.score}
              {result.clearingTest && (
                <span>（清除测试选择“是”，得分设为0）</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="evaluation">
        <h3>测量结果的评价</h3>
        {/* 根据得分提供具体的评价 */}
        {totalScore < 14 ? (
          <p>您的总分低于14，存在较高的受伤风险，建议进行针对性的功能训练。</p>
        ) : (
          <p>您的总分高于14，受伤风险较低，请继续保持良好的运动状态。</p>
        )}
        {/* 对每个测试项进行评价 */}
        {results.map((result) => {
          if (result.score === 1) {
            return (
              <p key={result.testName}>
                在<strong>{result.testName}</strong>项目中得分为1，建议加强该部位的功能训练。
              </p>
            );
          }
          if (result.score === 0) {
            return (
              <p key={result.testName}>
                在<strong>{result.testName}</strong>过程中有疼痛，建议咨询专业医生。
              </p>
            );
          }
          return null;
        })}
      </div>
      <button onClick={handleExport}>导出为 Markdown</button>
    </div>
  );
};

export default Summary;

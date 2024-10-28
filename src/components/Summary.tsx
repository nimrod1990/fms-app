// src/components/Summary.tsx

import React, { useState, useMemo, useEffect } from 'react';
import { TestResult, PersonalInfo } from '../types';
import { generateMarkdown } from '../utils/markdown';
import Modal from './Modal'; // 导入 Modal 组件
import { Info } from 'lucide-react';
import { Tooltip } from 'react-tooltip'; // 正确导入 Tooltip
import 'react-tooltip/dist/react-tooltip.css'; // 导入样式

interface SummaryProps {
  results: TestResult[];
  personalInfo: PersonalInfo;
  onRestart: () => void;
}

// 定义每个测试的详细评价信息
const evaluationMessages: { [key: string]: { [score: number]: string } } = {
  '深蹲 (Deep Squat)': {
    3: '表现良好，躯干与胫骨平行，膝盖与脚对齐，显示出良好的下肢灵活性和核心稳定性。',
    2: '脚跟抬高，动作与3分相同，但仍存在轻微的灵活性不足。',
    1: '脚跟抬高，动作存在重大功能障碍，建议进行髋关节和踝关节的灵活性训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
  '跨栏步 (Hurdle Step)': {
    3: '表现良好，髋、膝、踝对齐，腰椎活动最小或无活动，显示出良好的单腿稳定性和核心控制能力。',
    2: '保持平衡，但有代偿性运动，建议加强核心稳定性训练。',
    1: '脚接触栏杆或失去平衡，建议进行骨盆稳定性和髋关节灵活性的训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
  '直线弓箭步 (Inline Lunge)': {
    3: '表现良好，保持杠杆接触，无躯干运动，膝盖触碰脚跟后的板子，显示出良好的下肢力量和核心稳定性。',
    2: '有代偿性运动，但保持平衡，建议加强髋部和膝关节的稳定性训练。',
    1: '失去平衡或错位，建议进行下肢稳定性和躯干控制的训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
  '肩部灵活性 (Shoulder Mobility)': {
    3: '肩部灵活性良好。',
    2: '肩部有轻微的灵活性不足。',
    1: '肩部灵活性不足，建议进行肩部灵活性训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
  '主动直腿抬高 (Active Straight Leg Raise)': {
    3: '良好的下肢灵活性和骨盆稳定性。',
    2: '轻微的灵活性不足。',
    1: '建议进行下肢灵活性和骨盆稳定性的训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
  '躯干稳定性俯卧撑 (Trunk Stability Push-Up)': {
    3: '良好的核心稳定性。',
    2: '核心稳定性一般。',
    1: '建议进行核心稳定性训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
  '躯干旋转稳定性 (Rotary Stability)': {
    3: '正确完成单侧重复动作，保持平衡，显示出良好的核心稳定性和协调性。',
    2: '无法正确完成单侧动作，但保持平衡，建议加强核心控制能力。',
    1: '无法完成单侧动作，失去平衡，建议进行核心稳定性和协调性的训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
};

const Summary: React.FC<SummaryProps> = ({ results, personalInfo, onRestart }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // 用于触发条形图动画

  // 使用 useMemo 计算总分，避免不必要的重新计算
  const totalScore = useMemo(() => {
    return results.reduce((sum, result) => sum + result.score, 0);
  }, [results]);

  const handleExport = () => {
    const markdownContent = generateMarkdown(results, personalInfo, evaluationMessages);
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'FMS评估结果.md';
    link.click();
  };

  const openModal = (testName: string) => {
    setSelectedTest(testName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTest('');
  };

  useEffect(() => {
    // 延迟触发动画效果
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  return (
    <div className={`summary-container ${isLoaded ? 'loaded' : ''}`}>
      <h2>评估结果</h2>
      <div className="personal-info">
        <p>被测试者姓名：{personalInfo.name}</p>
        <p>测试时间：{personalInfo.testDate}</p>
        <p>优势手：{personalInfo.dominantHand}</p>
        <p>优势脚：{personalInfo.dominantFoot}</p>
        <p>测试者：{personalInfo.tester}</p>
        <p>总分：{totalScore} / 21</p>
      </div>

      {/* 结果可视化展示 */}
      <div className="score-visualization">
        <h3>测试分数可视化</h3>
        {results.map((result, index) => (
          <div key={index} className="score-bar">
            <div className="label">{result.testName}</div>
            <div className="bar-container">
              <div
                className="bar"
                style={{ width: `${(result.score / 3) * 100}%` }}
              ></div>
            </div>
            <div className="score">{result.score}/3</div>
          </div>
        ))}
      </div>

      {/* 移除详细信息的表格 */}
      <div className="results-chart">
        {/* 使用表格展示评估结果 */}
        <table className="results-table">
          <thead>
            <tr>
              <th>测试项目</th>
              <th>得分</th>
              <th>
                清除测试结果{' '}
                <Info
                  size={16}
                  data-tooltip-id="clearing-test-tooltip"
                  data-tooltip-content="阳性意味着该项分数自动设为0，阴性则保留原得分。"
                  style={{ cursor: 'pointer', verticalAlign: 'middle' }}
                />
                <Tooltip id="clearing-test-tooltip" place="top" />
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.testName}</td>
                <td>{result.score}</td>
                <td>
                  {result.clearingTest === true
                    ? '阳性（分数自动设为0）'
                    : result.clearingTest === false
                      ? '阴性'
                      : '无'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 卡片式展示评估结果，仅在移动端显示 */}
        <div className="results-cards">
          {results.map((result, index) => (
            <div key={index} className="result-card">
              <h4>{result.testName}</h4>
              <p><strong>得分：</strong>{result.score} / 3</p>
              <p><strong>清除测试结果：</strong>
                {result.clearingTest === true
                  ? '阳性（分数自动设为0）'
                  : result.clearingTest === false
                    ? '阴性'
                    : '无'}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="evaluation">
        <h3>测量结果的评价</h3>
        {/* 根据总分提供总体评价 */}
        {totalScore < 14 ? (
          <p>您的总分低于14，存在较高的受伤风险，建议进行针对性的功能训练。</p>
        ) : (
          <p>您的总分高于14，受伤风险较低，请继续保持良好的运动状态。</p>
        )}

        {/* 对每个测试项进行详细评价 */}
        {results.map((result) => {
          const testName = result.testName;
          const score = result.score;
          const message = evaluationMessages[testName]?.[score];

          if (message) {
            return (
              <p key={testName}>
                <strong>{testName}</strong>：{message}
              </p>
            );
          }

          return null;
        })}
      </div>
      <div className="button-group">
        <button onClick={handleExport}>导出为 Markdown</button>
        <button onClick={onRestart}>重新开始</button>
      </div>

      {/* Modal 组件 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedTest}>
        {/* 由于不再需要详细信息，这里可以为空或提供简要信息 */}
        <p>详细信息已移除。</p>
      </Modal>
    </div >
  );
};

export default Summary;
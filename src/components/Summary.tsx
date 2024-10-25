// src/components/Summary.tsx
import React from 'react';
import { TestResult, PersonalInfo } from '../types';
import { generateMarkdown } from '../utils/markdown';

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
  '直线弓步 (Inline Lunge)': {
    3: '表现良好，保持杠杆接触，无躯干运动，膝盖触碰脚跟后的板子，显示出良好的下肢力量和核心稳定性。',
    2: '有代偿性运动，但保持平衡，建议加强髋部和膝关节的稳定性训练。',
    1: '失去平衡或错位，建议进行下肢稳定性和躯干控制的训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
  '肩部灵活性 (Shoulder Mobility)': {
    3: '两拳之间的距离在一手长度内，肩部灵活性良好。',
    2: '两拳之间的距离在一手半长度内，肩部有轻微的灵活性不足。',
    1: '两拳之间的距离大于一手半长度，肩部灵活性不足，建议进行肩部灵活性训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
  '主动直腿抬高 (Active Straight Leg Raise)': {
    3: '踝关节位于大腿中部与髂前上棘（ASIS）之间，显示出良好的下肢灵活性和骨盆稳定性。',
    2: '踝关节位于大腿中部与膝关节线之间，显示出轻微的灵活性不足。',
    1: '踝关节位于膝关节线以下，建议进行下肢灵活性和骨盆稳定性的训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
  '躯干稳定性俯卧撑 (Trunk Stability Push-Up)': {
    3: '身体整体抬起，脊柱没有滞后，拇指与头顶（男性）或下巴（女性）对齐，显示出良好的核心稳定性。',
    2: '男性拇指与下巴对齐，女性拇指与锁骨对齐，核心稳定性良好。',
    1: '无法正确完成动作，建议进行核心稳定性训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
  '旋转稳定性 (Rotary Stability)': {
    3: '正确完成单侧重复动作，保持平衡，显示出良好的核心稳定性和协调性。',
    2: '无法正确完成单侧动作，但保持平衡，建议加强核心控制能力。',
    1: '无法完成单侧动作，失去平衡，建议进行核心稳定性和协调性的训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
};

const Summary: React.FC<SummaryProps> = ({ results, personalInfo, onRestart }) => {
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
        {/* 使用表格展示评估结果 */}
        <table className="results-table">
          <thead>
            <tr>
              <th>测试项目</th>
              <th>得分</th>
              <th>清除测试结果</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.testName}</td>
                <td>{result.score}</td>
                <td>
                  {result.clearingTest === true
                    ? '通过（得分设为0）'
                    : result.clearingTest === false
                    ? '未通过'
                    : '无'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="evaluation">
        <h3>测量结果的评价</h3>
        {/* 根据总分提供具体的评价 */}
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
    </div>
  );
};

export default Summary;

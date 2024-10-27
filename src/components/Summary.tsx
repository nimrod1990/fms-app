// src/components/Summary.tsx

import React, { useState, useMemo } from 'react';
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
    2: '男性拇指与下巴对齐，女性拇指与锁骨对齐，核心稳定性一般。',
    1: '无法正确完成动作，建议进行核心稳定性训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
  '躯干旋转稳定性 (Rotary Stability)': {
    3: '正确完成单侧重复动作，保持平衡，显示出良好的核心稳定性和协调性。',
    2: '无法正确完成单侧动作，但保持平衡，建议加强核心控制能力。',
    1: '无法完成单侧动作，失去平衡，建议进行核心稳定性和协调性的训练。',
    0: '运动过程中有疼痛，建议咨询专业医生。',
  },
};

// 定义每个测试的详细信息
const testDetails: { [key: string]: React.ReactNode } = {
  '深蹲 (Deep Squat)': (
    <div>
      <p><strong>原理：</strong>深蹲是一项多关节复合动作，主要评估髋、膝和踝关节的活动度，同时检测核心稳定性、肩部灵活性和全身的对称性。</p>
      <p><strong>医学解释：</strong>深蹲测试揭示下肢关节（髋、膝、踝）的灵活性是否受限，以及脊柱的中立位稳定性。</p>
      <p><strong>解决方案：</strong>改善髋关节灵活性、踝关节活动度的改善、脊柱稳定性训练。</p>
      {/* 添加更多详细信息 */}
    </div>
  ),
  '跨栏步 (Hurdle Step)': (
    <div>
      <p><strong>原理：</strong>通过迈步跨越障碍来评估下肢的对称性、髋关节的活动度和核心稳定性。</p>
      <p><strong>医学解释：</strong>测试主要观察髋关节的屈曲能力、骨盆的稳定性及下肢肌肉的协调性。</p>
      <p><strong>解决方案：</strong>改善髋关节屈曲紧张、增加骨盆稳定性、改善核心控制能力。</p>
      {/* 添加更多详细信息 */}
    </div>
  ),
  // 为其他测试项添加详细信息
  '直线弓箭步 (Inline Lunge)': (
    <div>
      <p><strong>原理：</strong>通过弓步动作评估下肢的稳定性及髋、膝、踝的活动度和核心控制力。</p>
      <p><strong>医学解释：</strong>主要关注下肢与躯干之间的协调性，尤其是在髋和膝之间的力学传导。</p>
      <p><strong>解决方案：</strong>解决髋屈和膝关节的稳定性问题，控制膝盖和脚的对齐，躯干稳定性练习。</p>
      {/* 添加更多详细信息 */}
    </div>
  ),
  '肩部灵活性 (Shoulder Mobility)': (
    <div>
      <p><strong>原理：</strong>评估肩关节在内旋和外旋时的活动范围和对称性。肩部灵活性对于维持肩带的健康及减少上肢运动中的代偿至关重要，该测试能够帮助评估肩关节的运动范围和灵活度。</p>
      <p><strong>医学解释：</strong>肩关节灵活性测试揭示肩带、肩胛骨和上背部的肌肉之间的相互协调性。肩胛骨的不对称性、胸椎活动受限或肩部周围肌肉的紧张都会影响动作。如果在肩部灵活性测试中发现明显的限制，这可能导致运动中出现肩部代偿，增加损伤的风险，尤其是肩袖损伤的可能性。</p>
      <p><strong>解决方案：</strong>- **墙上滑行（Wall Slides）**：此练习有助于激活肩部的肌肉，促进肩胛骨的稳定性和肩部灵活性。站立在墙前，用前臂支撑墙面，将手臂滑向天花板的方向，保持肩膀稳定。
- **书本打开式旋转（Open Book Rotation）**：该练习能够帮助打开胸椎并改善肩关节的活动范围。躺在瑜伽垫上，一侧卧姿，双臂向前伸展，然后慢慢转动上身，向相反方向伸展手臂，感受胸部的扩展和肩部的灵活度提升。
- **肩关节外旋（External Rotation）**：肩关节外旋可以强化旋转肌群中的冈下肌，增加肩部的稳定性。使用弹力带进行肩关节的外旋练习，有助于增加肩部的活动范围并减少代偿性动作。
- **坐姿辅助外旋（Seated Assisted External Rotation）**：这种练习使用一根棍棒来帮助推动肩部运动，尤其适合肩部疼痛严重的人群，有助于缓解紧张并增加肩关节的活动度。</p>
      {/* 添加更多详细信息 */}
    </div>
  ),
  '主动直腿抬高 (Active Straight Leg Raise)': (
    <div>
      <p><strong>原理：</strong>通过弓步动作评估下肢的稳定性及髋、膝、踝的活动度和核心控制力。</p>
      <p><strong>医学解释：</strong>主要关注下肢与躯干之间的协调性，尤其是在髋和膝之间的力学传导。</p>
      <p><strong>解决方案：</strong>解决髋屈和膝关节的稳定性问题，控制膝盖和脚的对齐，躯干稳定性练习。</p>
      {/* 添加更多详细信息 */}
    </div>
  ),
  '躯干稳定性俯卧撑 (Trunk Stability Push-Up)': (
    <div>
      <p><strong>原理：</strong>通过弓步动作评估下肢的稳定性及髋、膝、踝的活动度和核心控制力。</p>
      <p><strong>医学解释：</strong>主要关注下肢与躯干之间的协调性，尤其是在髋和膝之间的力学传导。</p>
      <p><strong>解决方案：</strong>解决髋屈和膝关节的稳定性问题，控制膝盖和脚的对齐，躯干稳定性练习。</p>
      {/* 添加更多详细信息 */}
    </div>
  ),
  '旋转稳定性 (Rotary Stability)': (
    <div>
      <p><strong>原理：</strong>通过弓步动作评估下肢的稳定性及髋、膝、踝的活动度和核心控制力。</p>
      <p><strong>医学解释：</strong>主要关注下肢与躯干之间的协调性，尤其是在髋和膝之间的力学传导。</p>
      <p><strong>解决方案：</strong>解决髋屈和膝关节的稳定性问题，控制膝盖和脚的对齐，躯干稳定性练习。</p>
      {/* 添加更多详细信息 */}
    </div>
  ),
  
};

const Summary: React.FC<SummaryProps> = ({ results, personalInfo, onRestart }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTest, setSelectedTest] = useState<string>('');

  // 使用 useMemo 计算总分，避免不必要的重新计算
  const totalScore = useMemo(() => {
    return results.reduce((sum, result) => sum + result.score, 0);
  }, [results]);

  const handleExport = () => {
    const markdownContent = generateMarkdown(results, personalInfo);
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
              <th>
                清除测试结果{' '}
                <Info
                  size={16}
                  data-tooltip-id="clearing-test-tooltip"
                  data-tooltip-content="通过意味着该项分数自动设为0，未通过则保留原得分。"
                  style={{ cursor: 'pointer', verticalAlign: 'middle' }}
                />
                <Tooltip id="clearing-test-tooltip" place="top" type="dark" effect="solid" />
              </th>
              <th>详细信息</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.testName}</td>
                <td>{result.score}</td>
                <td>
                  {result.clearingTest === true
                    ? '通过（分数自动设为0）'
                    : result.clearingTest === false
                    ? '未通过'
                    : '无'}
                </td>
                <td>
                  <button onClick={() => openModal(result.testName)}>详细信息</button>
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

      {/* Modal 组件 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedTest}>
        {testDetails[selectedTest]}
      </Modal>
    </div>
  );
};

export default Summary;
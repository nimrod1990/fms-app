// src/components/Summary.tsx

import React, { useState, useMemo, useEffect } from 'react';
import { TestResult, PersonalInfo } from '../types';
import { generateMarkdown } from '../utils/markdown';
import Modal from './Modal'; // 导入 Modal 组件
import { Info } from 'lucide-react';
import { Tooltip } from 'react-tooltip'; // 正确导入 Tooltip
import 'react-tooltip/dist/react-tooltip.css'; // 导入样式
import ReactMarkdown from 'react-markdown';

interface SummaryProps {
  results: TestResult[];
  personalInfo: PersonalInfo;
  onRestart: () => void;
}

// 定义每个测试的详细评价信息
const evaluationMessages: { [key: string]: { [score: number]: string } } = {
  '深蹲 (Deep Squat)': {
    3: '表现良好，躯干与胫骨平行，膝盖与脚对齐，显示出良好的下肢灵活性和核心稳定性。',
    2: '脚跟抬高，动作与3分相同，但仍存在**轻微的灵活性不足**。\n\n **参考方案：** \n\n**改善髋关节灵活性**：髋关节的灵活性可以通过髋部拉伸和自我关节松动来提高。例如，四点跪姿髋关节下方和侧向的牵引，使用弹力带辅助来进行髋屈和外旋的拉伸。这种练习有助于增加髋关节在负重情况下的活动度，并减少髋关节周围的紧张感，防止代偿性运动的发生。**世界上最棒的拉伸**是一种非常有效的髋关节和脊柱灵活性练习，这个动作结合了髋部、臀部、腿筋的伸展，有助于在执行深蹲和其他功能性动作时增加活动范围并减少紧张。\n\n**改善踝关节活动度**：踝关节的活动度对于深蹲和其他下肢功能性动作非常重要，可以通过使用弹力带进行踝关节的松动练习来增强。例如，将弹力带绑在脚踝附近，做前后或侧向的拉伸，可以增加踝关节的背屈度，帮助减少在深蹲过程中足跟抬起的代偿性问题。**前弓步拉伸**是一种有效的踝关节拉伸方法，可以在锻炼前使用弹力带进行踝关节的动员，帮助减少代偿性动作并提高训练效果。\n\n**改善脊柱稳定性**：脊柱的稳定性对保持运动中的正确姿势至关重要。建议使用“内部单元功能激活”训练，例如下腹部的静态练习，帮助激活内侧稳定肌肉群（如腹肌），防止髋部成为脊柱稳定的主要来源。此外，**闭合蛤壳运动**也是一种有助于提高髋部中心稳定性的练习，通过激活髋屈肌和外旋肌，增强髋部和骨盆的稳定性，减少运动中脊柱的不必要移动。',
    1: '脚跟抬高，动作存在**重大功能障碍**，建议进行**髋关节**和**踝关节**的**灵活性**训练。\n\n **参考方案：** \n\n**改善髋关节灵活性**：髋关节的灵活性可以通过髋部拉伸和自我关节松动来提高。例如，四点跪姿髋关节下方和侧向的牵引，使用弹力带辅助来进行髋屈和外旋的拉伸。这种练习有助于增加髋关节在负重情况下的活动度，并减少髋关节周围的紧张感，防止代偿性运动的发生。**世界上最棒的拉伸**是一种非常有效的髋关节和脊柱灵活性练习，这个动作结合了髋部、臀部、腿筋的伸展，有助于在执行深蹲和其他功能性动作时增加活动范围并减少紧张。\n\n**改善踝关节活动度**：踝关节的活动度对于深蹲和其他下肢功能性动作非常重要，可以通过使用弹力带进行踝关节的松动练习来增强。例如，将弹力带绑在脚踝附近，做前后或侧向的拉伸，可以增加踝关节的背屈度，帮助减少在深蹲过程中足跟抬起的代偿性问题。**前弓步拉伸**是一种有效的踝关节拉伸方法，可以在锻炼前使用弹力带进行踝关节的动员，帮助减少代偿性动作并提高训练效果。\n\n**改善脊柱稳定性**：脊柱的稳定性对保持运动中的正确姿势至关重要。建议使用“内部单元功能激活”训练，例如下腹部的静态练习，帮助激活内侧稳定肌肉群（如腹肌），防止髋部成为脊柱稳定的主要来源。此外，**闭合蛤壳运动**也是一种有助于提高髋部中心稳定性的练习，通过激活髋屈肌和外旋肌，增强髋部和骨盆的稳定性，减少运动中脊柱的不必要移动。',
    0: '运动过程中有**疼痛**，建议咨询专业医生。',
  },
  '跨栏步 (Hurdle Step)': {
    3: '表现良好，髋、膝、踝对齐，腰椎活动最小或无活动，显示出良好的单腿稳定性和核心控制能力。',
    2: '保持平衡，但**有代偿性运动**，建议**加强核心稳定性**训练。\n\n **参考方案：** \n\n**改善髋关节屈曲紧张**：髋屈肌的紧张可能导致骨盆的前倾和腰椎的不稳定性。使用**髋屈肌拉伸和核心激活练习**，例如**世界上最棒的拉伸**、**闭合蛤式运动**，有助于缓解髋屈肌的紧张。\n\n**增加骨盆稳定性**：通过练习**哥本哈根平板支撑**，可以有效增强髋部内收肌群和核心肌肉的力量，帮助提高骨盆的稳定性。此外，通过**脚后跟触地行进**，可以提高骨盆的控制力和下腹肌的力量，保持骨盆在动态运动中的稳定性。\n\n**改善核心控制能力**：使用**深层核心肌肉激活**（例如横膈膜呼吸和腹部拉紧），结合髋部和下腹部的稳定性练习，可以增强核心控制能力，有助于减少髋屈运动中的代偿性动作。',
    1: '脚接触栏杆或失去平衡，建议进行**骨盆稳定性和髋关节灵活性**的训练。\n\n **参考方案：** \n\n**改善髋关节屈曲紧张**：髋屈肌的紧张可能导致骨盆的前倾和腰椎的不稳定性。使用**髋屈肌拉伸和核心激活练习**，例如**世界上最棒的拉伸**、**闭合蛤式运动**，有助于缓解髋屈肌的紧张。\n\n**增加骨盆稳定性**：通过练习**哥本哈根平板支撑**，可以有效增强髋部内收肌群和核心肌肉的力量，帮助提高骨盆的稳定性。此外，通过**脚后跟触地行进**，可以提高骨盆的控制力和下腹肌的力量，保持骨盆在动态运动中的稳定性。\n\n**改善核心控制能力**：使用**深层核心肌肉激活**（例如横膈膜呼吸和腹部拉紧），结合髋部和下腹部的稳定性练习，可以增强核心控制能力，有助于减少髋屈运动中的代偿性动作。',
    0: '运动过程中有**疼痛**，建议咨询专业医生。',
  },
  '直线弓箭步 (Inline Lunge)': {
    3: '表现良好，保持杠杆接触，无躯干运动，膝盖触碰脚跟后的板子，显示出良好的下肢力量和核心稳定性。',
    2: '有**代偿性运动**，但保持平衡，建议**加强髋部和膝关节的稳定性**训练。\n\n **参考方案：** \n\n**髋屈和膝关节的控制与稳定性练习**：可以通过一些修正性练习，例如**前脚抬高的分腿蹲**和**单腿臀桥**来帮助增加髋屈肌群和膝关节的稳定性。这些练习有助于加强下肢肌肉的力量和平衡能力，减少弓步中代偿性动作的出现。\n\n**控制膝盖和脚的对齐**：在进行弓步动作时，确保前脚和膝盖指向正前方，以减少膝关节的扭力应力。膝盖内扣或脚的旋转会增加关节应力，导致膝盖疼痛或受伤的风险，因此应保持膝盖和脚的方向一致。\n\n**躯干稳定性练习**：使用**平衡垫或泡沫板**增加动作的不稳定性，可以强化核心稳定肌的激活，从而帮助稳定下肢和躯干。增加不稳定性要求身体的稳定肌更积极地工作，有助于在弓步中保持更好的控制。',
    1: '失去平衡或错位，建议进行**下肢稳定性和躯干控制**的训练。\n\n **参考方案：** \n\n**髋屈和膝关节的控制与稳定性练习**：可以通过一些修正性练习，例如**前脚抬高的分腿蹲**和**单腿臀桥**来帮助增加髋屈肌群和膝关节的稳定性。这些练习有助于加强下肢肌肉的力量和平衡能力，减少弓步中代偿性动作的出现。\n\n**控制膝盖和脚的对齐**：在进行弓步动作时，确保前脚和膝盖指向正前方，以减少膝关节的扭力应力。膝盖内扣或脚的旋转会增加关节应力，导致膝盖疼痛或受伤的风险，因此应保持膝盖和脚的方向一致。\n\n**躯干稳定性练习**：使用**平衡垫或泡沫板**增加动作的不稳定性，可以强化核心稳定肌的激活，从而帮助稳定下肢和躯干。增加不稳定性要求身体的稳定肌更积极地工作，有助于在弓步中保持更好的控制。',
    0: '运动过程中有**疼痛**，建议咨询专业医生。',
  },
  '肩部灵活性 (Shoulder Mobility)': {
    3: '肩部灵活性良好。',
    2: '肩部有**轻微的灵活性不足**。\n\n **参考方案：** \n\n**墙上滑行**：此练习有助于激活肩部的肌肉，促进肩胛骨的稳定性和肩部灵活性。站立在墙前，用前臂支撑墙面，将手臂滑向天花板的方向，保持肩膀稳定。\n\n**书本打开式旋转**：该练习能够帮助打开胸椎并改善肩关节的活动范围。躺在瑜伽垫上，一侧卧姿，双臂向前伸展，然后慢慢转动上身，向相反方向伸展手臂，感受胸部的扩展和肩部的灵活度提升。\n\n**肩关节外旋**：肩关节外旋可以强化旋转肌群中的冈下肌，增加肩部的稳定性。使用弹力带进行肩关节的外旋练习，有助于增加肩部的活动范围并减少代偿性动作。\n\n**坐姿辅助外旋**：这种练习使用一根棍棒来帮助推动肩部运动，尤其适合肩部疼痛严重的人群，有助于缓解紧张并增加肩关节的活动度。',
    1: '肩部**灵活性不足**，建议进行**肩部灵活性**训练。\n\n **参考方案：** \n\n**墙上滑行**：此练习有助于激活肩部的肌肉，促进肩胛骨的稳定性和肩部灵活性。站立在墙前，用前臂支撑墙面，将手臂滑向天花板的方向，保持肩膀稳定。\n\n**书本打开式旋转**：该练习能够帮助打开胸椎并改善肩关节的活动范围。躺在瑜伽垫上，一侧卧姿，双臂向前伸展，然后慢慢转动上身，向相反方向伸展手臂，感受胸部的扩展和肩部的灵活度提升。\n\n**肩关节外旋**：肩关节外旋可以强化旋转肌群中的冈下肌，增加肩部的稳定性。使用弹力带进行肩关节的外旋练习，有助于增加肩部的活动范围并减少代偿性动作。\n\n**坐姿辅助外旋**：这种练习使用一根棍棒来帮助推动肩部运动，尤其适合肩部疼痛严重的人群，有助于缓解紧张并增加肩关节的活动度。',
    0: '运动过程中有**疼痛**，建议咨询专业医生。',
  },
  '主动直腿抬高 (Active Straight Leg Raise)': {
    3: '良好的下肢灵活性和骨盆稳定性。',
    2: '**轻微的灵活性不足**。\n\n **参考方案：** \n\n**腘绳肌拉伸**：可以通过一些有效的动态和静态拉伸练习来缓解腘绳肌的紧张。例如，**动态腿部摆动**可以提高肌肉的活动度和灵活性，而**站立前屈拉伸**有助于缓解腘绳肌的紧张，增加腿后侧的柔韧性。\n\n**骨盆稳定性训练**：通过练习**臀桥**来增强臀部和核心的力量，以提高骨盆的稳定性。此外，**侧卧抬腿**也可以激活髋部和骨盆周围的肌肉，帮助保持骨盆的稳定性。\n\n**神经松动技术**：使用**坐姿神经滑动**可以改善下肢的神经滑动性，减少因腘绳肌紧张引起的神经紧张，这对于增加腿部的活动范围非常有帮助。',
    1: '建议进行**下肢灵活性和骨盆稳定性**的训练。\n\n **参考方案：** \n\n**腘绳肌拉伸**：可以通过一些有效的动态和静态拉伸练习来缓解腘绳肌的紧张。例如，**动态腿部摆动**可以提高肌肉的活动度和灵活性，而**站立前屈拉伸**有助于缓解腘绳肌的紧张，增加腿后侧的柔韧性。\n\n**骨盆稳定性训练**：通过练习**臀桥**来增强臀部和核心的力量，以提高骨盆的稳定性。此外，**侧卧抬腿**也可以激活髋部和骨盆周围的肌肉，帮助保持骨盆的稳定性。\n\n**神经松动技术**：使用**坐姿神经滑动**可以改善下肢的神经滑动性，减少因腘绳肌紧张引起的神经紧张，这对于增加腿部的活动范围非常有帮助。',
    0: '运动过程中有**疼痛**，建议咨询专业医生。',
  },
  '躯干稳定性俯卧撑 (Trunk Stability Push-Up)': {
    3: '良好的核心稳定性。',
    2: '**核心稳定性一般**。\n\n **参考方案：** \n\n**核心稳定性训练**：可以通过练习**卷腹**和**平板支撑**来增强腹部和脊柱伸肌的力量，这些练习有助于提高脊柱在俯卧撑过程中的稳定性，减少下背部的代偿。\n\n**动态俯卧撑变体**：通过**俯卧撑行走**，手部走动到平板位置并返回，可以提高整体的躯干稳定性和控制力。\n\n**使用平衡工具的训练**：在稳定球上进行俯卧撑（如**稳定球俯卧撑**），可以增加对核心肌群的挑战，从而进一步增强躯干的稳定性。',
    1: '建议进行**核心稳定性**训练。\n\n **参考方案：** \n\n**核心稳定性训练**：可以通过练习**卷腹**和**平板支撑**来增强腹部和脊柱伸肌的力量，这些练习有助于提高脊柱在俯卧撑过程中的稳定性，减少下背部的代偿。\n\n**动态俯卧撑变体**：通过**俯卧撑行走**，手部走动到平板位置并返回，可以提高整体的躯干稳定性和控制力。\n\n**使用平衡工具的训练**：在稳定球上进行俯卧撑（如**稳定球俯卧撑**），可以增加对核心肌群的挑战，从而进一步增强躯干的稳定性。',
    0: '运动过程中有**疼痛**，建议咨询专业医生。',
  },
  '躯干旋转稳定性 (Rotary Stability)': {
    3: '正确完成单侧重复动作，保持平衡，显示出良好的核心稳定性和协调性。',
    2: '无法正确完成单侧动作，但保持平衡，建议**加强核心控制能力**。\n\n **参考方案：** \n\n**静态控制训练**：进行“**鸟狗式**”和**核心激活的四点支撑摇摆**训练，这些练习有助于增强核心的反射稳定性，尤其是在控制单侧动作时的稳定性。\n\n**动态控制训练**：使用**翻滚练习**来改善动态的核心控制，这种训练可以模仿婴儿的基本运动模式，帮助重新建立躯干的稳定性和控制。\n\n**反旋转训练**：**反旋转平面腿部下放**是一种非常有效的矫正性练习，可以提高脊柱的多平面稳定性和协调性。\n\n**呼吸与核心结合训练**：练习**90/90呼吸**，这种呼吸训练可以帮助放松软组织，提高整体核心的反射性稳定能力。',
    1: '无法完成单侧动作，失去平衡，建议进行**核心稳定性和协调性**的训练。\n\n **参考方案：** \n\n**静态控制训练**：进行“**鸟狗式**”和**核心激活的四点支撑摇摆**训练，这些练习有助于增强核心的反射稳定性，尤其是在控制单侧动作时的稳定性。\n\n**动态控制训练**：使用**翻滚练习**来改善动态的核心控制，这种训练可以模仿婴儿的基本运动模式，帮助重新建立躯干的稳定性和控制。\n\n**反旋转训练**：**反旋转平面腿部下放**是一种非常有效的矫正性练习，可以提高脊柱的多平面稳定性和协调性。\n\n**呼吸与核心结合训练**：练习**90/90呼吸**，这种呼吸训练可以帮助放松软组织，提高整体核心的反射性稳定能力。',
    0: '运动过程中有**疼痛**，建议咨询专业医生。',
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
    const fileName = `${personalInfo.name}_${personalInfo.testDate}.md`;
    link.download = fileName;
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

  // 获取分数条颜色
  const getBarColor = (score: number) => {
    switch (score) {
      case 3:
        return '#4caf50'; // 绿色
      case 2:
        return '#ff9800'; // 橙色
      case 1:
        return '#f44336'; // 红色
      default:
        return '#9e9e9e'; // 灰色
    }
  };

  return (
    <div className={`summary-container ${isLoaded ? 'loaded' : ''}`}>
      <h2>测试报告</h2>

      {/* 个人信息部分优化 */}
      <div
        className="personal-info"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div style={{ flex: '1 1 200px' }}>
          <strong>姓名：</strong>
          {personalInfo.name}
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <strong>测试时间：</strong>
          {personalInfo.testDate}
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <strong>优势手：</strong>
          {personalInfo.dominantHand}
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <strong>优势脚：</strong>
          {personalInfo.dominantFoot}
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <strong>测试者：</strong>
          {personalInfo.tester}
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <strong>总分：</strong>
          {totalScore} / 21
        </div>
      </div>

      {/* 结果可视化展示优化 */}
      <div className="score-visualization" style={{ marginTop: '20px' }}>
        <h3>得分详情</h3>
        {results.map((result, index) => (
          <div
            key={index}
            className="score-bar"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <div
              className="label"
              style={{
                flex: '4', 
                fontWeight: 'bold',
              }}
              title={result.testName.split(' (')[0]} // 添加 title 以显示完整名称
            >
              {result.testName.split(' (')[0]}
            </div>
            <div
              className="bar-container"
              style={{
                flex: '4',
                background: '#e0e0e0',
                borderRadius: '4px',
                overflow: 'hidden',
                marginRight: '10px',
              }}
            >
              <div
                className="bar"
                style={{
                  width: `${(result.score / 3) * 100}%`,
                  height: '20px',
                  backgroundColor: getBarColor(result.score),
                  transition: 'width 1s ease-in-out',
                }}
              ></div>
            </div>
            <div
              className="score"
              style={{
                width: '50px',
                textAlign: 'right',
              }}
            >
              {result.score}/3
            </div>
          </div>
        ))}
      </div>

      {/* 评估结果表格优化 */}
      <div className="results-chart" style={{ marginTop: '20px' }}>
        <table
          className="results-table"
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                }}
              >
                测试项目
              </th>
              <th
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                }}
              >
                得分
              </th>
              <th
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                }}
              >
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
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff',
                }}
              >
                <td
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={result.testName.split(' (')[0]} // 添加 title 以显示完整名称
                >
                  {result.testName.split(' (')[0]}
                </td>
                <td
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    textAlign: 'center',
                  }}
                >
                  {result.score}
                </td>
                <td
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    textAlign: 'center',
                  }}
                >
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
      </div>

      {/* 评价部分优化 */}
      <div className="evaluation" style={{ marginTop: '20px' }}>
        <h3>分析与建议</h3>
        {/* 根据总分提供总体评价 */}
        <div style={{ marginBottom: '15px' }}>
          {totalScore < 14 ? (
            <p
              style={{
                color: '#f44336',
                fontWeight: 'bold',
              }}
            >
              您的总分低于14，存在较高的受伤风险，建议进行针对性的功能训练。
            </p>
          ) : (
            <p
              style={{
                color: '#4caf50',
                fontWeight: 'bold',
              }}
            >
              您的总分高于14，受伤风险较低，请继续保持良好的运动状态。
            </p>
          )}
        </div>

        {/* 对每个测试项进行详细评价，并添加分割线 */}
        {results.map((result, index) => {
          const testName = result.testName;
          const score = result.score;
          const message = evaluationMessages[testName]?.[score];

          if (message) {
            return (
              <div key={testName} style={{ marginBottom: '15px' }}>
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p style={{ marginBottom: '8px' }} {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong style={{ color: '#333' }} {...props} />
                    ),
                  }}
                >
                  {`**${testName.split(' (')[0]}**：${message}`}
                </ReactMarkdown>
                {/* 添加分割线，除最后一项外 */}
                {index < results.length - 1 && (
                  <hr
                    style={{
                      border: 'none',
                      borderTop: '1px solid #e0e0e0',
                      marginTop: '10px',
                    }}
                  />
                )}
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* 按钮组优化 */}
      <div
        className="button-group"
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        <button
          onClick={handleExport}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          导出为 Markdown
        </button>
        <button
          onClick={onRestart}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          重新开始
        </button>
      </div>

      {/* Modal 组件 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedTest}>
        {/* 由于不再需要详细信息，这里可以为空或提供简要信息 */}
        <p>详细信息已移除。</p>
      </Modal>
    </div>
  );
};

export default Summary;
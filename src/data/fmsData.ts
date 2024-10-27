// src/data/fmsData.ts
import { FMSData } from '../types';

const data: FMSData = {
  title: '功能动作筛查 (FMS)',
  categories: [
    {
      test_name: '深蹲 (Deep Squat)',
      purpose: '评估下肢的灵活性和核心稳定性。',
      method: '双脚与肩同宽，手臂举过头顶，深蹲至最低点，保持躯干与胫骨平行。',
      scores: [
        {
          score: 3,
          criteria: 'a. 杆在双足上方平行或更后；b. 躯干与胫骨平行或与地面垂直；c. 下蹲保持大腿低于水平线；d. 保持膝与足2或3趾方向一致。',
          details: '表现良好，躯干与胫骨平行，膝盖与脚对齐，显示出良好的下肢灵活性和核心稳定性。',
          images: ['/images/DM_20241026073914_001.PNG', '/images/DM_20241026073914_002.PNG'],
        },
        {
          score: 2,
          criteria: 'a、b、c、d之一不能达标，但仍能完成动作，或在足跟下加踮木板的前提下能完成动作。',
          details: '脚跟抬高，动作与3分相同，但仍存在轻微的灵活性不足。',
          images: ['/images/DM_20241026073914_003.PNG', '/images/DM_20241026073914_004.PNG'],
        },
        {
          score: 1,
          criteria: 'a、b、c、d中2-4个不能达标，或在足跟下加踮木板的前提下也不能完成动作。',
          details: '脚跟抬高，动作存在重大功能障碍，建议进行髋关节和踝关节的灵活性训练。',
          images: ['/images/DM_20241026073914_005.PNG', '/images/DM_20241026073914_006.PNG'],
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
          details: '运动过程中有疼痛，建议咨询专业医生。',
          images: [],
        },
      ],
    },
    {
      test_name: '跨栏步 (Hurdle Step)',
      purpose: '评估下肢的灵活性和核心稳定性。',
      method: '站立在木杆旁，迈出一步跨过栏杆，保持身体的平衡和稳定。',
      scores: [
        {
          score: 3,
          criteria: '髋、膝、踝在矢状面上呈一条直线；腰部没有明显的移动；木杆与栏架保持平行。',
          details: '表现良好，髋、膝、踝对齐，腰椎活动最小或无活动，显示出良好的单腿稳定性和核心控制能力。',
          images: ['/images/DM_20241026073914_007.PNG', '/images/DM_20241026073914_008.PNG'],
        },
        {
          score: 2,
          criteria: '髋、膝、踝在矢状面上不呈一条直线；腰部有移动；木杆与栏架不平行。',
          details: '保持平衡，但有代偿性运动，建议加强核心稳定性训练。',
          images: ['/images/DM_20241026073914_009.PNG', '/images/DM_20241026073914_010.PNG'],
        },
        {
          score: 1,
          criteria: '脚碰到栏板；身体失去平衡。',
          details: '脚接触栏杆或失去平衡，建议进行骨盆稳定性和髋关节灵活性的训练。',
          images: ['/images/DM_20241026073914_011.PNG', '/images/DM_20241026073914_012.PNG'],
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
          details: '运动过程中有疼痛，建议咨询专业医生。',
          images: [],
        },
      ],
    },
    {
      test_name: '直线弓箭步 (Inline Lunge)',
      purpose: '评估下肢的灵活性和核心稳定性。',
      method: '站立在木杆旁，一脚前踏，保持双脚在同一矢状面上，进行弓箭步动作。',
      scores: [
        {
          score: 3,
          criteria: '木杆仍保持与头、腰椎或骶骨接触；躯干没有明显移动；木杆和双脚仍处于同一矢状面；膝盖接触木板。',
          details: '表现良好，保持杠杆接触，无躯干运动，膝盖触碰脚跟后的板子，显示出良好的下肢力量和核心稳定性。',
          images: ['/images/DM_20241026073914_013.PNG', '/images/DM_20241026073915_014.PNG'],
        },
        {
          score: 2,
          criteria: '木杆不能保持与头、腰椎或骶骨接触；躯干有移动；两脚没有处于同一矢状面；膝盖不能接触木板。',
          details: '有代偿性运动，但保持平衡，建议加强髋部和膝关节的稳定性训练。',
          images: ['/images/DM_20241026073915_015.PNG', '/images/DM_41026073915_016.PNG'],
        },
        {
          score: 1,
          criteria: '身体失去平衡。',
          details: '失去平衡或错位，建议进行下肢稳定性和躯干控制的训练。',
          images: ['/images/DM_41026073915_017.PNG', '/images/DM_41026073915_018.PNG'],
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
          details: '运动过程中有疼痛，建议咨询专业医生。',
          images: [],
        },
      ],
    },
    {
      test_name: '肩部灵活性 (Shoulder Mobility)',
      purpose: '评估肩部的灵活性及潜在的肩部冲击问题。',
      method: '运动员双手握住木杆，尝试在不移动身体的情况下尽可能向后移动木杆。',
      scores: [
        {
          score: 3,
          criteria: '两拳之间的距离在一手长度内。',
          details: '肩部灵活性良好。',
          images: ['/images/DM_20241026073915_019.PNG'],
        },
        {
          score: 2,
          criteria: '两拳之间的距离在一手半长度内。',
          details: '肩部有轻微的灵活性不足。',
          images: ['/images/DM_20241026073915_020.PNG'],
        },
        {
          score: 1,
          criteria: '两拳之间的距离大于一手半长度。',
          details: '肩部灵活性不足，建议进行肩部灵活性训练。',
          images: ['/images/DM_20241026073915_021.PNG'],
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
          details: '运动过程中有疼痛，建议咨询专业医生。',
          images: [],
        },
      ],
      clearing_test: {
        purpose: '排除肩部冲击（Impingement）的问题，以确保肩部灵活性测试的准确性。',
        method: '运动员将手掌放在对侧肩上，保持手掌与肩的接触，尽可能高地上抬肘部。',
        criteria: '如果在执行清除测试时出现疼痛或无法完成动作，则得分为0分。',
        images: ['/images/DM_20241026073915_022.PNG'],
        details:
          '肩夹击测试是必需的，因为仅仅采用肩部灵活性测试本身，有时不能发现肩部的冲击。通过此测试可以更准确地评估肩部是否存在潜在的冲击问题，从而确保整体测试的有效性。',
      },
    },
    {
      test_name: '主动直腿抬高 (Active Straight Leg Raise)',
      purpose: '评估下肢的灵活性和骨盆的稳定性。',
      method: '运动员平躺，双腿伸直，主动抬起一条腿尽可能高，同时保持另一条腿平放不动。',
      scores: [
        {
          score: 3,
          criteria: '踝关节位于大腿中部与髂前上棘（ASIS）之间。',
          details: '良好的下肢灵活性和骨盆稳定性。',
          images: ['/images/DM_20241026073915_023.PNG'],
        },
        {
          score: 2,
          criteria: '踝关节位于大腿中部与膝关节线之间。',
          details: '轻微的灵活性不足。',
          images: ['/images/DM_20241026073915_024.PNG'],
        },
        {
          score: 1,
          criteria: '踝关节位于膝关节线以下。',
          details: '建议进行下肢灵活性和骨盆稳定性的训练。',
          images: ['/images/DM_20241026073915_025.PNG'],
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
          details: '运动过程中有疼痛，建议咨询专业医生。',
          images: [],
        },
      ],
    },
    {
      test_name: '躯干稳定性俯卧撑 (Trunk Stability Push-Up)',
      purpose: '评估核心稳定性和上肢力量。',
      method: '运动员进入标准俯卧撑姿势，完成规定次数的俯卧撑动作。',
      scores: [
        {
          score: 3,
          criteria:
            '在规定姿势下能很好的完成动作1次：男运动员的拇指与前额在一条线上。女运动员拇指与下颌成一条线。',
          details: '良好的核心稳定性。',
          images: ['/images/DM_20241026073915_026.PNG','/images/DM_20241026073915_027.PNG'],
        },
        {
          score: 2,
          criteria:
            '在降低难度的姿势下能完成动作1次。男运动员的拇指与下颌在一条线上。女运动员拇指与锁骨成一条线。',
          details: '核心稳定性一般。',
          images: ['/images/DM_20241026073915_028.PNG'],
        },
        {
          score: 1,
          criteria: '在降低难度的姿势下也无法完成动作或者出现动作代偿。',
          details: '建议进行核心稳定性训练。',
          images: [ '/images/DM_20241026073915_029.PNG', '/images/DM_20241026073915_030.PNG'],
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
          details: '运动过程中有疼痛，建议咨询专业医生。',
          images: [],
        },
      ],
      clearing_test: {
        purpose: '排除脊柱伸展相关的疼痛或功能障碍，确保躯干稳定性俯卧撑测试的准确性。',
        method:
          '从俯撑动作开始姿势撑起上体，使脊柱充分伸展，观察是否有疼痛或不适。',
        criteria: '如果在执行脊柱伸展清除测试时出现疼痛，则得分为0分。',
        images: ['/images/DM_20241026073915_031.PNG'],
        details:
          '脊柱伸展清除测试用于确保在进行躯干稳定性俯卧撑测试时，运动员的脊柱不会因测试动作而引发疼痛或加剧现有的脊柱问题。这有助于更准确地评估核心稳定性。',
      },
    },
    {
      test_name: '躯干旋转稳定性 (Rotary Stability)',
      purpose: '评估核心的旋转稳定性和协调性。',
      method: '运动员进入四点支撑姿势，交替抬起对侧的手和脚，保持躯干稳定。',
      scores: [
        {
          score: 3,
          criteria: '运动员进行重复动作时躯干与木板保持平行；肘和膝接触时同木板在同一线上。',
          details: '正确完成单侧重复动作，保持平衡，显示出良好的核心稳定性和协调性。',
          images: ['/images/DM_20241026073915_032.PNG', '/images/DM_20241026073915_033.PNG'],
        },
        {
          score: 2,
          criteria: '运动员能够以异侧对角的形式正确完成动作。',
          details: '无法正确完成单侧动作，但保持平衡，建议加强核心控制能力。',
          images: ['/images/DM_41026073915_034.PNG', '/images/DM_41026073915_035.PNG'],
        },
        {
          score: 1,
          criteria: '失去平衡或者不能正确完成动作。',
          details: '无法完成单侧动作，失去平衡，建议进行核心稳定性和协调性的训练。',
          images: ['/images/DM_41026073915_036.PNG', '/images/DM_41026073915_037.PNG'],
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
          details: '运动过程中有疼痛，建议咨询专业医生。',
          images: [],
        },
      ],
      clearing_test: {
        purpose: '排除脊柱屈曲相关的疼痛或功能障碍，确保躯干旋转稳定性测试的准确性。',
        method:
          '从四点支撑姿势开始，然后后移上体，使臀部接触双脚的脚跟、胸部接触双腿的大腿。双手保持在身体前方，尽量向远处伸出。',
        criteria: '如果在执行脊柱屈曲清除测试时出现疼痛，则得分为0分。',
        images: ['/images/DM_20241026073915_038.PNG'],
        details:
          '脊柱屈曲清除测试用于确保在进行躯干旋转稳定性测试时，运动员的脊柱不会因测试动作而引发疼痛或加剧现有的脊柱问题。这有助于更准确地评估核心旋转稳定性。',
      },
    },
  ],
};

export default data;

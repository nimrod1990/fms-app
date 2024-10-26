// src/data/fmsData.ts
import { FMSData } from '../types';

const data: FMSData = {
  title: '功能动作筛查 (FMS)',
  categories: [
    {
      test_name: '深蹲 (Deep Squat)',
      scores: [
        {
          score: 3,
          criteria: 'a. 杆在双足上方平行或更后；b. 躯干与胫骨平行或与地面垂直；c. 下蹲保持大腿低于水平线；d. 保持膝与足2或3趾方向一致。',
        },
        {
          score: 2,
          criteria: 'a b c d 之一不能达标，但仍能完成动作，或在足跟下加踮木板的前提下能完成动作。',
        },
        {
          score: 1,
          criteria: 'a b c d 中2-4个不能达标，或在足跟下加踮木板的前提下也不能完成动作。',
        },
        {
          score: 0,
          criteria: '测试过程中，身体某部位疼痛。',
        },
      ],
    },
    {
      test_name: '跨栏步 (Hurdle Step)',
      scores: [
        {
          score: 3,
          criteria: '髋、膝、踝在矢状面上呈一条直线；腰部没有明显的移动；木杆与栏架保持平行。',
        },
        {
          score: 2,
          criteria: '髋、膝、踝在矢状面上不呈一条直线；腰部有移动；木杆与栏架不平行。',
        },
        {
          score: 1,
          criteria: '脚碰到栏板；身体失去平衡。',
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
        },
      ],
    },
    {
      test_name: '直线弓箭步 (Inline Lunge)',
      scores: [
        {
          score: 3,
          criteria: '木杆仍保持与头、腰椎或骶骨接触；躯干没有明显移动；木杆和双脚仍处于同一矢状面；膝盖接触木板。',
        },
        {
          score: 2,
          criteria: '木杆不能保持与头、腰椎或骶骨接触；躯干有移动；两脚没有处于同一矢状面；膝盖不能接触木板。',
        },
        {
          score: 1,
          criteria: '身体失去平衡。',
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
        },
      ],
    },
    {
      test_name: '肩部灵活性 (Shoulder Mobility)',
      scores: [
        {
          score: 3,
          criteria: '两拳之间的距离在一手长度内。',
        },
        {
          score: 2,
          criteria: '两拳之间的距离在一手半长度内。',
        },
        {
          score: 1,
          criteria: '两拳之间的距离大于一手半长度。',
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
        },
      ],
      clearing_test:
        '肩夹击测试：运动员将手掌放在对侧肩上，保持手掌与肩的接触.尽可能高地上抬肘部。这个排除性检查是必需的。因为仅仅采用肩部灵活性测试本身，有时不能发现肩部的冲击。',
    },
    {
      test_name: '主动直腿抬高 (Active Straight Leg Raise)',
      scores: [
        {
          score: 3,
          criteria: '踝关节位于大腿中部与髂前上棘（ASIS）之间。',
        },
        {
          score: 2,
          criteria: '踝关节位于大腿中部与膝关节线之间。',
        },
        {
          score: 1,
          criteria: '踝关节位于膝关节线以下。',
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
        },
      ],
    },
    {
      test_name: '躯干稳定性俯卧撑 (Trunk Stability Push-Up)',
      scores: [
        {
          score: 3,
          criteria:
            '在规定姿势下能很好的完成动作1次：男运动员的拇指与前额在一条线上。女运动员拇指与下颌成一条线',
        },
        {
          score: 2,
          criteria:
            '在降低难度的姿势下能完成动作1 次。男运动员的拇指与下颌在一条线上。女运动员拇指与锁骨成一条线。',
        },
        {
          score: 1,
          criteria: '在降低难度的姿势下也无法完成动作或者出现动作代偿。',
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
        },
      ],
      clearing_test:
        '脊柱伸展清除测试：从俯撑动作开始姿势撑起上体，使脊柱充分伸展，若此动作引发疼痛，得分为0分。',
    },
    {
      test_name: '躯干旋转稳定性 (Rotary Stability)',
      scores: [
        {
          score: 3,
          criteria: '运动员进行重复动作时躯干与木板保持平行；肘和膝接触时同木板在同一线上。',
        },
        {
          score: 2,
          criteria: '运动员能够以异侧对角的形式正确完成动作。',
        },
        {
          score: 1,
          criteria: '失去平衡或者不能正确完成动作。',
        },
        {
          score: 0,
          criteria: '测试过程中身体任何部位出现疼痛。',
        },
      ],
      clearing_test:
        '脊柱屈曲清除测试：从四点支撑姿势开始，然后后移上体，使臀部接触双脚的脚跟、胸部接触双腿的大腿。双手保持在身体前方，尽量向远处伸出。若有疼痛，得分为0分。',
    },
  ],
};

export default data;

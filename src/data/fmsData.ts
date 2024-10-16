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
          criteria: '躯干与胫骨平行，股骨低于水平线，膝盖与脚对齐，杠杆与脚对齐。'
        },
        {
          score: 2,
          criteria: '脚跟抬高，但动作与得分3相同。'
        },
        {
          score: 1,
          criteria: '脚跟抬高，动作存在重大功能障碍。'
        },
        {
          score: 0,
          criteria: '运动过程中有疼痛。'
        }
      ]
    },
    {
      test_name: '跨栏步 (Hurdle Step)',
      scores: [
        {
          score: 3,
          criteria: '髋、膝、踝对齐，腰椎活动最小或无活动，杠杆和栏杆保持平行。'
        },
        {
          score: 2,
          criteria: '保持平衡，但有代偿性运动。'
        },
        {
          score: 1,
          criteria: '脚接触栏杆或失去平衡。'
        },
        {
          score: 0,
          criteria: '运动过程中有疼痛。'
        }
      ]
    },
    {
      test_name: '直线弓步 (Inline Lunge)',
      scores: [
        {
          score: 3,
          criteria: '保持杠杆接触，无躯干运动，杠杆和脚在矢状面，膝盖触碰脚跟后的板子。'
        },
        {
          score: 2,
          criteria: '有代偿性运动，但保持平衡。'
        },
        {
          score: 1,
          criteria: '失去平衡或错位。'
        },
        {
          score: 0,
          criteria: '运动过程中有疼痛。'
        }
      ]
    },
    {
      test_name: '肩部灵活性 (Shoulder Mobility)',
      scores: [
        {
          score: 3,
          criteria: '两拳之间的距离在一手长度内。'
        },
        {
          score: 2,
          criteria: '两拳之间的距离在一手半长度内。'
        },
        {
          score: 1,
          criteria: '两拳之间的距离大于一手半长度。'
        },
        {
          score: 0,
          criteria: '运动过程中有疼痛。'
        }
      ],
      clearing_test: '肩夹击测试：受试者将手臂置于肩后，用另一只手触碰对侧肩胛骨，若此动作引发疼痛，得分为0分。'
    },
    {
      test_name: '主动直腿抬高 (Active Straight Leg Raise)',
      scores: [
        {
          score: 3,
          criteria: '踝关节位于大腿中部与髂前上棘 (ASIS) 之间。'
        },
        {
          score: 2,
          criteria: '踝关节位于大腿中部与膝关节线之间。'
        },
        {
          score: 1,
          criteria: '踝关节位于膝关节线以下。'
        },
        {
          score: 0,
          criteria: '运动过程中有疼痛。'
        }
      ]
    },
    {
      test_name: '躯干稳定性俯卧撑 (Trunk Stability Push-Up)',
      scores: [
        {
          score: 3,
          criteria: '身体作为一个整体抬起，脊柱没有滞后，拇指与头顶（男性）或下巴（女性）对齐。'
        },
        {
          score: 2,
          criteria: '男性：拇指与下巴对齐；女性：拇指与锁骨对齐。'
        },
        {
          score: 1,
          criteria: '无法正确完成动作。'
        },
        {
          score: 0,
          criteria: '运动过程中有疼痛。'
        }
      ],
      clearing_test: '脊柱伸展清除测试：受试者跪姿，臀部后坐，上身向下压，若此动作引发疼痛，得分为0分。'
    },
    {
      test_name: '旋转稳定性 (Rotary Stability)',
      scores: [
        {
          score: 3,
          criteria: '正确完成单侧重复动作，保持平衡。'
        },
        {
          score: 2,
          criteria: '无法正确完成单侧动作，但保持平衡。'
        },
        {
          score: 1,
          criteria: '无法完成单侧动作，失去平衡。'
        },
        {
          score: 0,
          criteria: '运动过程中有疼痛。'
        }
      ],
      clearing_test: '脊柱屈曲清除测试：通过伏地挺身观察脊柱屈曲是否引发疼痛，若有疼痛，得分为0分。'
    }
  ]
};

export default data;

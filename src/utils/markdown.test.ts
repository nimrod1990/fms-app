// src/utils/markdown.test.ts

import { generateMarkdown } from './markdown';
import { TestResult, PersonalInfo, DominantHand, DominantFoot } from '../types';

describe('generateMarkdown', () => {
  const personalInfo: PersonalInfo = {
    name: '张三',
    testDate: '2024-10-27',
    dominantHand: DominantHand.Right, // 使用枚举值
    dominantFoot: DominantFoot.Left,  // 使用枚举值
    tester: '李四',
  };

  const resultsHighScore: TestResult[] = [
    { testName: '深蹲 (Deep Squat)', score: 3, clearingTest: null },
    { testName: '跨栏步 (Hurdle Step)', score: 3, clearingTest: null },
    { testName: '直线弓步 (Inline Lunge)', score: 3, clearingTest: null },
    { testName: '肩部灵活性 (Shoulder Mobility)', score: 3, clearingTest: null },
    { testName: '主动直腿抬高 (Active Straight Leg Raise)', score: 3, clearingTest: null },
  ];

  const resultsLowScore: TestResult[] = [
    { testName: '深蹲 (Deep Squat)', score: 2, clearingTest: null },
    { testName: '跨栏步 (Hurdle Step)', score: 2, clearingTest: false },
    { testName: '直线弓步 (Inline Lunge)', score: 1, clearingTest: null },
    { testName: '肩部灵活性 (Shoulder Mobility)', score: 0, clearingTest: true },
  ];

  const emptyResults: TestResult[] = [];

  test('generates correct markdown for totalScore >= 14', () => {
    const markdown = generateMarkdown(resultsHighScore, personalInfo);
    expect(markdown).toContain('**总分**：15 / 21');
    expect(markdown).toContain('您的总分高于14，受伤风险较低，请继续保持良好的运动状态。');
  });

  test('generates correct markdown for totalScore < 14', () => {
    const markdown = generateMarkdown(resultsLowScore, personalInfo);
    expect(markdown).toContain('**总分**：5 / 21');
    expect(markdown).toContain('您的总分低于14，存在较高的受伤风险，建议进行针对性的功能训练。');
    expect(markdown).toContain('- **直线弓步 (Inline Lunge)** 得分为1，建议加强该部位的功能训练。');
    expect(markdown).toContain('- **肩部灵活性 (Shoulder Mobility)** 过程中有疼痛，建议咨询专业医生。');
  });

  test('handles empty results', () => {
    const markdown = generateMarkdown(emptyResults, personalInfo);
    expect(markdown).toContain('**总分**：0 / 21');
    expect(markdown).toContain('您的总分低于14，存在较高的受伤风险，建议进行针对性的功能训练。');
  });
});

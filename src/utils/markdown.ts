// src/utils/markdown.ts

import { TestResult, PersonalInfo } from '../types';

/**
 * 生成 FMS 评估结果的 Markdown 文本
 * @param results - 测试结果数组
 * @param personalInfo - 被测试者的个人信息
 * @param evaluationMessages - 每项测试的评价信息
 * @returns Markdown 格式的评估结果
 */
export const generateMarkdown = (
  results: TestResult[],
  personalInfo: PersonalInfo,
  evaluationMessages: { [key: string]: { [score: number]: string } }
): string => {
  const totalScore = results.reduce((sum, result) => sum + result.score, 0);
  let markdown = `# 红医师训练伤风险评估结果\n\n`;

  markdown += `**被测试者姓名**：${personalInfo.name}  \n`;
  markdown += `**测试时间**：${personalInfo.testDate}  \n`;
  markdown += `**优势手**：${personalInfo.dominantHand}  \n`;
  markdown += `**优势脚**：${personalInfo.dominantFoot}  \n`;
  markdown += `**测试者**：${personalInfo.tester}  \n`;
  markdown += `**总分**：${totalScore} / 21\n\n`;

  // 添加结果可视化表格
  markdown += `## 测试分数可视化\n\n`;
  markdown += `| 测试项目 | 得分 |\n`;
  markdown += `| -------- | ---- |\n`;
  results.forEach((result) => {
    // 使用 Unicode 方块表示得分
    const scoreBlocks = '█'.repeat(result.score) + '░'.repeat(3 - result.score);
    markdown += `| ${result.testName} | ${scoreBlocks} (${result.score}/3) |\n`;
  });
  markdown += `\n`;

  // 添加结果表格
  markdown += `## 测试结果\n\n`;
  markdown += `| 测试项目 | 得分 | 清除测试结果 |\n`;
  markdown += `| -------- | ---- | ------------ |\n`;
  results.forEach((result) => {
    markdown += `| ${result.testName} | ${result.score} | ${
      result.clearingTest === true
        ? '阳性（分数设为0）'
        : result.clearingTest === false
          ? '阴性'
          : '无'
    } |\n`;
  });
  markdown += `\n`;

  // 分析与建议部分
  markdown += `# 分析与建议\n\n`;
  if (totalScore < 14) {
    markdown += '- **您的总分低于14，存在较高的受伤风险，建议进行针对性的功能训练。**\n';
  } else {
    markdown += '- **您的总分高于14，受伤风险较低，请继续保持良好的运动状态。**\n';
  }

  // 添加每项测试的评价
  markdown += `\n`;
  results.forEach((result) => {
    const testName = result.testName;
    const score = result.score;
    const message = evaluationMessages[testName]?.[score];

    if (message) {
      markdown += `- **${testName}**：${message}\n`;
    }
  });

  markdown += `\n`;

  return markdown;
};
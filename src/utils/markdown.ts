// src/utils/markdown.ts

import { TestResult, PersonalInfo } from '../types';

/**
 * 生成 FMS 评估结果的 Markdown 文本
 * @param results - 测试结果数组
 * @param personalInfo - 被测试者的个人信息
 * @returns Markdown 格式的评估结果
 */
export const generateMarkdown = (
  results: TestResult[],
  personalInfo: PersonalInfo
): string => {
  const totalScore = results.reduce((sum, result) => sum + result.score, 0);
  let markdown = `# 红医师运动伤风险评估结果\n\n`;

  markdown += `**被测试者姓名**：${personalInfo.name}  \n`;
  markdown += `**测试时间**：${personalInfo.testDate}  \n`;
  markdown += `**优势手**：${personalInfo.dominantHand}  \n`;
  markdown += `**优势脚**：${personalInfo.dominantFoot}  \n`;
  markdown += `**测试者**：${personalInfo.tester}  \n`;
  markdown += `**总分**：${totalScore} / 21\n\n`;

  results.forEach((result) => {
    markdown += `## ${result.testName}\n`;
    markdown += `- 得分: ${result.score}\n`;
    if (result.clearingTest !== null) {
      markdown += `- 清除测试结果: ${result.clearingTest ? '阳性（分数设为0）' : '阴性'}\n`;
    }
    markdown += '\n';
  });

  // 分析与建议部分
  markdown += `# 分析与建议\n\n`;
  if (totalScore < 14) {
    markdown += '- **您的总分低于14，存在较高的受伤风险，建议进行针对性的功能训练。**\n';
  } else {
    markdown += '- **您的总分高于14，受伤风险较低，请继续保持良好的运动状态。**\n';
  }

  results.forEach((result) => {
    if (result.score === 1) {
      markdown += `- **${result.testName}** 得分为1，建议加强该部位的功能训练。\n`;
    }
    if (result.score === 0) {
      markdown += `- **${result.testName}** 过程中有疼痛，建议咨询专业医生。\n`;
    }
  });

  return markdown;
};

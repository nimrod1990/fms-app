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

  markdown += `**姓名**：${personalInfo.name}  \n`;
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
  markdown += `## 分析与建议\n\n`;
  if (totalScore < 14) {
    markdown += `**您的总分低于14，存在较高的受伤风险，建议进行针对性的功能训练。**\n\n`;
  } else {
    markdown += `**您的总分高于14，受伤风险较低，请继续保持良好的运动状态。**\n\n`;
  }

  // 开始有序列表
  results.forEach((result, index) => {
    const testName = result.testName.split(' (')[0];
    const score = result.score;
    const message = evaluationMessages[result.testName]?.[score];

    if (message) {
      const messageLines = message.split('\n').map(line => line.trim());

      let inReferencePlan = false;

      // 添加有序列表编号
      markdown += `${index + 1}. **${testName}**：\n\n`;

      messageLines.forEach(line => {
        if (line.startsWith('**参考方案') || line.startsWith('**参考方案：')) {
          inReferencePlan = true;
          markdown += `   **参考方案：**\n\n`;
        } else if (inReferencePlan) {
          if (line.startsWith('**') || line.startsWith('*')) {
            // 如果行以 ** 开头，视为子标题
            markdown += `   ${line}\n\n`;
          } else if (line.startsWith('改善') || line.startsWith('使用') || line.startsWith('增加') || line.startsWith('通过') || line.startsWith('练习')) {
            // 如果行以特定关键词开头，视为子项
            markdown += `   - ${line}\n\n`;
          } else {
            // 普通段落
            markdown += `   ${line}\n\n`;
          }
        } else {
          // 普通内容，不在“参考方案”部分
          markdown += `   ${line}\n\n`;
        }
      });
    }
  });

  markdown += `\n`;

  return markdown;
};
// src/types.ts

// 使用枚举定义优势手和脚
export enum DominantHand {
  Left = '左手',
  Right = '右手',
}

export enum DominantFoot {
  Left = '左脚',
  Right = '右脚',
}

export interface ScoreCriteria {
  score: number;
  criteria: string;
  details: string;
  images: string[]; // 可选的图片数组
}

export interface ClearingTest {
  purpose: string;
  method: string;
  criteria: string;
  images: string[];
  details: string;
}

export interface TestItem {
  test_name: string;
  purpose: string; // 测试目的
  method: string;  // 测试方法
  scores: ScoreCriteria[];
  clearing_test?: ClearingTest;
}

export interface FMSData {
  title: string;
  categories: TestItem[];
}

export interface TestResult {
  testName: string;
  score: number;
  clearingTest: boolean | null;
}

export interface PersonalInfo {
  name: string;
  testDate: string;
  dominantHand: DominantHand;
  dominantFoot: DominantFoot;
  tester: string;
}

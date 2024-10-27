// src/types.ts

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
  dominantHand: string;
  dominantFoot: string;
  tester: string;
}
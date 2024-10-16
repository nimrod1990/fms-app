// src/types.ts
export interface ScoreCriteria {
  score: number;
  criteria: string;
}

export interface TestItem {
  test_name: string;
  scores: ScoreCriteria[];
  clearing_test?: string;
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

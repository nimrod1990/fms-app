// src/components/Test.tsx
import React, { useState, useEffect } from 'react';
import { TestItem, TestResult } from '../types';

interface TestProps {
  test: TestItem;
  onNext: (score: number, clearingTest: boolean | null) => void;
  onBack?: () => void;
  existingResult?: TestResult | null;
}

const Test: React.FC<TestProps> = ({ test, onNext, onBack, existingResult }) => {
  // 初始化选中的分数
  const [selectedScore, setSelectedScore] = useState<number | null>(
    existingResult
      ? test.clearing_test && existingResult.clearingTest
        ? 0
        : existingResult.score
      : null
  );

  // 初始化清除测试结果
  const [clearingTestResult, setClearingTestResult] = useState<boolean | null>(
    test.clearing_test ? (existingResult ? existingResult.clearingTest : null) : false
  );

  // 如果清除测试选择“是”，则清除分数选择
  useEffect(() => {
    if (clearingTestResult) {
      setSelectedScore(null);
    }
  }, [clearingTestResult]);

  const handleSubmit = () => {
    if (
      (test.clearing_test && clearingTestResult !== null) ||
      !test.clearing_test
    ) {
      if (
        (selectedScore !== null && !clearingTestResult) ||
        (test.clearing_test && clearingTestResult === true)
      ) {
        const finalScore = clearingTestResult ? 0 : selectedScore!;
        onNext(finalScore, clearingTestResult);
      } else {
        alert('请完成所有选项');
      }
    } else {
      alert('请完成所有选项');
    }
  };

  return (
    <div className="test-container">
      <h2>{test.test_name}</h2>
      <h3>评分标准：</h3>
      <ul>
        {test.scores.map((scoreItem) => (
          <li key={scoreItem.score}>
            <label>
              <input
                type="radio"
                name={`score-${test.test_name}`} // 确保 name 属性唯一
                value={scoreItem.score}
                onChange={() => setSelectedScore(scoreItem.score)}
                disabled={clearingTestResult === true} // 禁用分数选择
                checked={selectedScore === scoreItem.score}
              />
              {`得分 ${scoreItem.score}: ${scoreItem.criteria}`}
            </label>
          </li>
        ))}
      </ul>
      {test.clearing_test && (
        <div className="clearing-test-section">
          <h3>清除测试：</h3>
          <p>{test.clearing_test}</p>
          <label>
            <input
              type="radio"
              name={`clearingTest-${test.test_name}`} // 确保 name 属性唯一
              value="yes"
              onChange={() => setClearingTestResult(true)}
              checked={clearingTestResult === true}
            />
            是（此选择将自动将本项得分设为0）
          </label>
          <label>
            <input
              type="radio"
              name={`clearingTest-${test.test_name}`} // 确保 name 属性唯一
              value="no"
              onChange={() => setClearingTestResult(false)}
              checked={clearingTestResult === false}
            />
            否
          </label>
        </div>
      )}
      <div className="button-group">
        {onBack && (
          <button type="button" onClick={onBack}>
            返回上一页
          </button>
        )}
        <button type="button" onClick={handleSubmit}>
          下一步
        </button>
      </div>
    </div>
  );
};

export default Test;

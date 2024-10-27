// src/components/Test.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { TestItem, TestResult, ScoreCriteria, ClearingTest } from '../types';
import Modal from './Modal';

// 导入 Lucide React 图标
import { HelpCircle, Info } from 'lucide-react';

interface TestProps {
  test: TestItem;
  onNext: (score: number, clearingTest: boolean | null) => void;
  onBack?: () => void;
  existingResult?: TestResult | null;
}

const Test: React.FC<TestProps> = React.memo(({ test, onNext, onBack, existingResult }) => {
  // 选定分数的状态
  const [selectedScore, setSelectedScore] = useState<number | null>(
    existingResult
      ? test.clearing_test && existingResult.clearingTest
        ? 0
        : existingResult.score
      : null
  );

  // 清除测试结果的状态
  const [clearingTestResult, setClearingTestResult] = useState<boolean | null>(
    test.clearing_test ? (existingResult ? existingResult.clearingTest : null) : false
  );

  // 分数详情模态框的状态
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [detailsModalContent, setDetailsModalContent] = useState<{
    title: string;
    details: string;
    images: string[];
  } | null>(null);

  // “方法”模态框的状态
  const [isHowToModalOpen, setIsHowToModalOpen] = useState<boolean>(false);

  // 清除测试详情模态框的状态
  const [isClearingTestModalOpen, setIsClearingTestModalOpen] = useState<boolean>(false);
  const [clearingTestModalContent, setClearingTestModalContent] = useState<{
    title: string;
    details: string;
    images: string[];
  } | null>(null);

  // 如果选择了清除测试，则清除选定的分数
  useEffect(() => {
    if (clearingTestResult) {
      setSelectedScore(null);
    }
  }, [clearingTestResult]);

  // 提交测试的处理函数
  const handleSubmit = useCallback(() => {
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
  }, [test.clearing_test, clearingTestResult, selectedScore, onNext]);

  // 处理分数选择
  const handleScoreChange = useCallback((score: number) => {
    setSelectedScore(score);
  }, []);

  // 处理清除测试选择
  const handleClearingTestChange = useCallback((result: boolean) => {
    setClearingTestResult(result);
  }, []);

  // 打开分数详情模态框
  const openDetailsModal = useCallback((score: ScoreCriteria) => {
    setDetailsModalContent({
      title: `${test.test_name} - 得分 ${score.score}`,
      details: score.details,
      images: score.images,
    });
    setIsDetailsModalOpen(true);
  }, [test.test_name]);

  // 关闭分数详情模态框
  const closeDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false);
    setDetailsModalContent(null);
  }, []);

  // 打开“方法”模态框
  const openHowToModal = useCallback(() => {
    setIsHowToModalOpen(true);
  }, []);

  // 关闭“方法”模态框
  const closeHowToModal = useCallback(() => {
    setIsHowToModalOpen(false);
  }, []);

  // 打开清除测试模态框
  const openClearingTestModal = useCallback(() => {
    if (test.clearing_test) {
      setClearingTestModalContent({
        title: `清除测试 - ${test.test_name}`,
        details: test.clearing_test.details,
        images: test.clearing_test.images,
      });
      setIsClearingTestModalOpen(true);
    }
  }, [test.clearing_test, test.test_name]);

  // 关闭清除测试模态框
  const closeClearingTestModal = useCallback(() => {
    setIsClearingTestModalOpen(false);
    setClearingTestModalContent(null);
  }, []);

  return (
    <div className="test-container">
      {/* 标题部分，标题居中，“方法”按钮紧靠右侧 */}
      <div className="test-header">
        <h2 className="test-title">{test.test_name}</h2>
        <button
          type="button"
          onClick={openHowToModal}
          className="how-to-button"
          aria-label={`方法 ${test.test_name}`}
        >
          <HelpCircle size={16} />
        </button>
      </div>

      {/* “方法”模态框 */}
      {test.purpose && test.method && (
        <Modal
          isOpen={isHowToModalOpen}
          onClose={closeHowToModal}
          title={`方法 - ${test.test_name}`}
        >
          <h4>测试目的</h4>
          <p>{test.purpose}</p>
          <h4>测试方法</h4>
          <p>{test.method}</p>
        </Modal>
      )}

      {/* 评分标准列表 */}
      <h3>评分标准：</h3>
      <ul className="score-list">
        {test.scores.map((scoreItem) => (
          <li key={scoreItem.score} className="score-item">
            <label className="score-label">
              <input
                type="radio"
                name={`score-${test.test_name}`} // 确保每个测试的名称唯一
                value={scoreItem.score}
                onChange={() => handleScoreChange(scoreItem.score)}
                disabled={clearingTestResult === true} // 如果选择了清除测试，则禁用
                checked={selectedScore === scoreItem.score}
              />
              {`得分 ${scoreItem.score}: ${scoreItem.criteria}`}
            </label>
            {/* “讲解”按钮 */}
            <button
              type="button"
              onClick={() => openDetailsModal(scoreItem)}
              className="details-button"
              aria-label={`查看得分 ${scoreItem.score} 的详细信息`}
            >
              <Info size={16} />
            </button>
          </li>
        ))}
      </ul>

      {/* 清除测试部分 */}
      {test.clearing_test && (
        <div className="clearing-test-section">
          <h3>清除测试：</h3>
          <p><strong>目的：</strong>{test.clearing_test.purpose}</p>
          <p><strong>方法：</strong>{test.clearing_test.method}</p>
          <button
            type="button"
            onClick={openClearingTestModal}
            className="details-button"
            aria-label={`查看清除测试 ${test.test_name} 的详细信息`}
          >
            <Info size={16} />
          </button>
          <div className="clearing-test-options">
            <label>
              <input
                type="radio"
                name={`clearingTest-${test.test_name}`} // 确保每个测试的名称唯一
                value="yes"
                onChange={() => handleClearingTestChange(true)}
                checked={clearingTestResult === true}
              />
              是（此选择将自动将本项得分设为0）
            </label>
            <label>
              <input
                type="radio"
                name={`clearingTest-${test.test_name}`} // 确保每个测试的名称唯一
                value="no"
                onChange={() => handleClearingTestChange(false)}
                checked={clearingTestResult === false}
              />
              否
            </label>
          </div>
        </div>
      )}

      {/* 提交和返回按钮 */}
      <div className="button-group">
        {onBack && (
          <button type="button" onClick={onBack} className="back-button">
            返回上一页
          </button>
        )}
        <button type="button" onClick={handleSubmit} className="next-button">
          下一步
        </button>
      </div>

      {/* 分数详情模态框 */}
      {detailsModalContent && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
          title={detailsModalContent.title}
        >
          <p>{detailsModalContent.details}</p>
          {/* 如果有图像，则渲染图像 */}
          {detailsModalContent.images && detailsModalContent.images.length > 0 && (
            <div className="modal-images">
              {detailsModalContent.images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`${detailsModalContent.title} 图片 ${index + 1}`}
                  className="modal-image"
                />
              ))}
            </div>
          )}
        </Modal>
      )}

      {/* 清除测试详情模态框 */}
      {clearingTestModalContent && (
        <Modal
          isOpen={isClearingTestModalOpen}
          onClose={closeClearingTestModal}
          title={clearingTestModalContent.title}
        >
          <p>{clearingTestModalContent.details}</p>
          {/* 如果有图像，则渲染图像 */}
          {clearingTestModalContent.images && clearingTestModalContent.images.length > 0 && (
            <div className="modal-images">
              {clearingTestModalContent.images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`${clearingTestModalContent.title} 图片 ${index + 1}`}
                  className="modal-image"
                />
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
});

export default Test;
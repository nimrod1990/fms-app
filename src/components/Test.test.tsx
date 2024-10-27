// src/components/Test.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Test from './Test';
import { TestItem, TestResult } from '../types';

// Mock Modal component to avoid rendering actual modal during tests
jest.mock('./Modal', () => ({ isOpen, onClose, title, children }: any) => (
  isOpen ? <div data-testid="modal">{title}{children}</div> : null
));

describe('Test Component', () => {
  const mockTest: TestItem = {
    test_name: '测试名称',
    purpose: '测试目的',
    method: '测试方法',
    scores: [
      { score: 3, criteria: '标准3', details: '详细3', images: [] },
      { score: 2, criteria: '标准2', details: '详细2', images: [] },
      { score: 1, criteria: '标准1', details: '详细1', images: [] },
      { score: 0, criteria: '标准0', details: '详细0', images: [] },
    ],
  };

  const onNextMock = jest.fn();
  const onBackMock = jest.fn();

  beforeEach(() => {
    onNextMock.mockClear();
    onBackMock.mockClear();
  });

  test('submits selected score without clearing test', () => {
    render(
      <Test
        test={mockTest}
        onNext={onNextMock}
        onBack={onBackMock}
        existingResult={null}
      />
    );

    // Select score 2
    const score2Radio = screen.getByLabelText(/得分 2: 标准2/i);
    fireEvent.click(score2Radio);

    // Click Next button
    const nextButton = screen.getByText(/下一步/i);
    fireEvent.click(nextButton);

    expect(onNextMock).toHaveBeenCalledWith(2, false);
  });

  test('submits with clearing test selected', () => {
    const testWithClearing: TestItem = {
      ...mockTest,
      clearing_test: {
        purpose: '清除测试目的',
        method: '清除测试方法',
        criteria: '清除测试标准',
        images: [],
        details: '清除测试详细',
      },
    };

    render(
      <Test
        test={testWithClearing}
        onNext={onNextMock}
        onBack={onBackMock}
        existingResult={null}
      />
    );

    // Select clearing test '是'
    const clearingYesRadio = screen.getByLabelText(/是（此选择将自动将本项得分设为0）/i);
    fireEvent.click(clearingYesRadio);

    // Click Next button
    const nextButton = screen.getByText(/下一步/i);
    fireEvent.click(nextButton);

    expect(onNextMock).toHaveBeenCalledWith(0, true);
  });

  test('alerts when required fields are missing', () => {
    window.alert = jest.fn();

    render(
      <Test
        test={mockTest}
        onNext={onNextMock}
        onBack={onBackMock}
        existingResult={null}
      />
    );

    // Do not select any score

    // Click Next button
    const nextButton = screen.getByText(/下一步/i);
    fireEvent.click(nextButton);

    expect(window.alert).toHaveBeenCalledWith('请完成所有选项。');
    expect(onNextMock).not.toHaveBeenCalled();
  });

  test('alerts when clearing test is not properly handled', () => {
    window.alert = jest.fn();

    const testWithClearing: TestItem = {
      ...mockTest,
      clearing_test: {
        purpose: '清除测试目的',
        method: '清除测试方法',
        criteria: '清除测试标准',
        images: [],
        details: '清除测试详细',
      },
    };

    render(
      <Test
        test={testWithClearing}
        onNext={onNextMock}
        onBack={onBackMock}
        existingResult={null}
      />
    );

    // Select clearing test '是'
    const clearingYesRadio = screen.getByLabelText(/是（此选择将自动将本项得分设为0）/i);
    fireEvent.click(clearingYesRadio);

    // Click Next button
    const nextButton = screen.getByText(/下一步/i);
    fireEvent.click(nextButton);

    expect(onNextMock).toHaveBeenCalledWith(0, true);

    // Alternatively, if selecting '否' but not selecting a score, expect alert
    const clearingNoRadio = screen.getByLabelText(/否/i);
    fireEvent.click(clearingNoRadio);

    // Do not select any score

    // Click Next button
    fireEvent.click(nextButton);

    expect(window.alert).toHaveBeenCalledWith('请完成所有选项。');
    expect(onNextMock).toHaveBeenCalledTimes(1); // Only the first call
  });

  test('calls onBack when Back button is clicked', () => {
    render(
      <Test
        test={mockTest}
        onNext={onNextMock}
        onBack={onBackMock}
        existingResult={null}
      />
    );

    const backButton = screen.getByText(/返回上一页/i);
    fireEvent.click(backButton);

    expect(onBackMock).toHaveBeenCalled();
  });
});
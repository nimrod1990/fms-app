// src/components/PersonalInfoForm.tsx
import React, { useState } from 'react';
import { PersonalInfo } from '../types';

interface PersonalInfoFormProps {
  onSubmit: (info: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onSubmit }) => {
  // 获取今天的日期，格式为 YYYY-MM-DD
  const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [name, setName] = useState('');
  const [testDate, setTestDate] = useState(getTodayDate());
  const [dominantHand, setDominantHand] = useState('右手');
  const [dominantFoot, setDominantFoot] = useState('右脚');
  const [tester, setTester] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && testDate && tester) {
      onSubmit({ name, testDate, dominantHand, dominantFoot, tester });
    } else {
      alert('请完整填写所有必填信息。');
    }
  };

  return (
    <form className="personal-info-form" onSubmit={handleSubmit}>
      <h1>功能动作筛查 (FMS)</h1>
      <div className="form-group">
        <label htmlFor="name">被测试者姓名：</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div className="form-group">
        <label htmlFor="testDate">测试时间：</label>
        <input
          id="testDate"
          type="date"
          value={testDate}
          onChange={(e) => setTestDate(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dominantHand">优势手：</label>
        <select
          id="dominantHand"
          value={dominantHand}
          onChange={(e) => setDominantHand(e.target.value)}
        >
          <option value="左手">左手</option>
          <option value="右手">右手</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dominantFoot">优势脚：</label>
        <select
          id="dominantFoot"
          value={dominantFoot}
          onChange={(e) => setDominantFoot(e.target.value)}
        >
          <option value="左脚">左脚</option>
          <option value="右脚">右脚</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="tester">测试者：</label>
        <input
          id="tester"
          type="text"
          value={tester}
          onChange={(e) => setTester(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <button type="submit">开始测试</button>
    </form>
  );
};

export default PersonalInfoForm;

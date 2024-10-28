// src/components/PersonalInfoForm.tsx

import React, { useState } from 'react';
import { PersonalInfo, DominantHand, DominantFoot } from '../types';
import { useNotification } from '../context/NotificationContext'; // 导入 useNotification

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

  const [name, setName] = useState<string>('');
  const [testDate, setTestDate] = useState<string>(getTodayDate());
  const [dominantHand, setDominantHand] = useState<DominantHand>(DominantHand.Right);
  const [dominantFoot, setDominantFoot] = useState<DominantFoot>(DominantFoot.Right);
  const [tester, setTester] = useState<string>('红医师');

  const { notify } = useNotification(); // 使用通知

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && testDate && tester) {
      onSubmit({ name, testDate, dominantHand, dominantFoot, tester });
    } else {
      notify('请完整填写所有必填信息。', 'error');
    }
  };

  return (
    <form className="personal-info-form" onSubmit={handleSubmit}>
      <h2>红医师运动伤风险评估</h2>
      <div className="form-group">
        <label htmlFor="name">被测试者姓名：</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTestDate(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dominantHand">优势手：</label>
        <select
          id="dominantHand"
          value={dominantHand}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDominantHand(e.target.value as DominantHand)}
        >
          <option value={DominantHand.Left}>{DominantHand.Left}</option>
          <option value={DominantHand.Right}>{DominantHand.Right}</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dominantFoot">优势脚：</label>
        <select
          id="dominantFoot"
          value={dominantFoot}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDominantFoot(e.target.value as DominantFoot)}
        >
          <option value={DominantFoot.Left}>{DominantFoot.Left}</option>
          <option value={DominantFoot.Right}>{DominantFoot.Right}</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="tester">测试者：</label>
        <input
          id="tester"
          type="text"
          value={tester}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTester(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <button type="submit">开始测试</button>
    </form>
  );
};

export default PersonalInfoForm;
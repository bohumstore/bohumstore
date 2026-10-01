import { useEffect, useState } from 'react';

const fetchPensionStartAge = async (productType: string, gender: string, age: number): Promise<number | null> => {
  try {
    const response = await fetch('/api/calculate-pension/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gender, age, productType, mode: 'startAges' })
    });
    if (!response.ok) return null;
    const result = await response.json();
    if (!result.success || !result.startAges) return null;
    const byPeriod = result.startAges as Record<string, number>;
    if (byPeriod['10'] > 0) return byPeriod['10'];
    const periods = Object.keys(byPeriod).map(Number).sort((a, b) => a - b);
    return periods.length > 0 ? byPeriod[String(periods[0])] : null;
  } catch (e) {
    return null;
  }
};

// 보험연령에 해당하는 연금개시연령을 엑셀에서 조회해 "65세" 형태로 반환 (납입기간 미선택 시 10년납 기준)
export function usePensionStartAgePreview(productType: string, gender: string, age: number, enabled: boolean): string {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled || isNaN(age)) {
      setText('');
      return;
    }
    let cancelled = false;
    fetchPensionStartAge(productType, gender || 'M', age).then((startAge) => {
      if (!cancelled) setText(startAge ? `${startAge}세` : '');
    });
    return () => { cancelled = true; };
  }, [productType, gender, age, enabled]);

  return text;
}

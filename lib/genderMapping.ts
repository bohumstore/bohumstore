/**
 * 성별 매핑 유틸리티 함수
 * M -> 남, F -> 여로 변환
 */

export function mapGender(gender: string): string {
  if (gender === 'M') return '남';
  if (gender === 'F') return '여';
  return gender; // 기타 값은 그대로 반환
}

export function mapGenderReverse(gender: string): string {
  if (gender === '남') return 'M';
  if (gender === '여') return 'F';
  return gender; // 기타 값은 그대로 반환
}

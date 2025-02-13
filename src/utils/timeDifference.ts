export const timeAgo = (createdAt: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime(); // 밀리초 차이 계산
  const diffMinutes = Math.floor(diffMs / (1000 * 60)); // 분 단위 변환
  const diffHours = Math.floor(diffMinutes / 60); // 시간 단위 변환
  const diffDays = Math.floor(diffHours / 24); // 일 단위 변환
  const diffMonths = Math.floor(diffDays / 30); // 달 단위 변환
  const diffYears = Math.floor(diffMonths / 12); // 년 단위 변환

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`; // 1시간 이내 → "XX분 전"
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`; // 24시간 이내 → "XX시간 전"
  } else if (diffDays < 30) {
    return `${diffDays}일 전`; // 30일 이내 → "XX일 전"
  } else if (diffMonths < 12) {
    return `${diffMonths}달 전`; // 1년 이내 → "XX달 전"
  } else {
    return `${diffYears}년 전`; // 1년 이상 → "XX년 전"
  }
};

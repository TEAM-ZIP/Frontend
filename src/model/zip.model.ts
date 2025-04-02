// 검색 조회
export interface getZipPreview {
  address: string;
  bookstoreCategory: string;
  bookstoreId: number;
  rating: number;
  name: string;
  liked: boolean;
  keyword: string;
}

export interface zipPreview {
  address: string;
  bookstoreId: number;
  description: string;
  hours: string;
  keyword: string;
  liked: boolean;
  name: string;
  phone: string;
  rating: number;
}

export interface bookstoreReview {
  bookstoreReviewId: number;
  nickname: string;
  rating: number;
  text: string;
  imageUrl: string;
  createdAt: string;
}

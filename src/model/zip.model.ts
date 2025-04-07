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
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  keyword: string;
  liked: boolean;
  name: string;
  phone: string;
  rating: number;
}

// 리뷰 받아올 때
export interface bookstoreReview {
  bookstoreReviewId: number;
  nickname: string;
  rating: number;
  text: string;
  imageUrl: string;
  createdAt: string;
}

// 리뷰 넣을 때
export interface postReview {
  bookstoreId: number;
  rating: number;
  text: string;
}

// // 보유 도서
// export interface haveBooks {
//   authors: string[];
//   bookId: number;
//   bookImageUrl: string;
//   title: string;
// }

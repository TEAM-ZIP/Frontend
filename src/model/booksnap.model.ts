// 북스냅 피드 조회
export interface BooksnapPreview {
  bookReviewId: number;
  userName: string;
  createdAt: string;
  like: number;
  review: string;
  isLiked: boolean;
  rating: number;
  bookInfo: BookDetailInfo;
}

// 북스냅 책 정보
export interface BookDetailInfo {
  bookId: string;
  title: string;
  bookImageUrl: string;
  authors: string[];
  publisher: string | null;
  bookType: 'normal' | 'indep';
  bookStores: Bookstore[] | null;
}

export interface Bookstore {
  bookStoreId: number;
  bookStoreName: string;
}

// 북스냅 리뷰
export interface BookReview {
  isbn: string;
  rating: number;
  reviewText: string;
}

export interface IndepBookReview {
  bookstoreIds: number[];
  title: string;
  authorsString: string;
  rating: number;
  reviewText: string;
}

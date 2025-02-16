// 북스냅 피드 조회
export interface BooksnapPreview {
  userName: string;
  createdAt: Date;
  like: string;
  review: string;
  isLiked: boolean;
  bookInfo: BookDetailInfo;
}

// 북스냅 책 정보
export interface BookDetailInfo {
  isbn: string;
  title: string;
  bookImageUrl: string;
  authors: string[];
  publisher: string;
  star?: number;
}

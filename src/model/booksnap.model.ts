export interface BooksnapPreview {
  userName: string;
  createdAt: Date;
  like: string;
  review: string;
  isLiked: boolean;
  bookInfo: BookInfo;
}

export interface BookInfo {
  bookId: string;
  title: string;
  thumbnail: string;
  authors: string[];
  publisher: string;
  star?: number;
}

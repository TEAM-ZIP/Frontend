import { BookReview } from '../model/booksnap.model';
import instance from './instance';

// 책 검색
export const getSearchBook = async (searchWord: string, page: number) => {
  try {
    const response = await instance.get(`api/booksnap/book-search?query=${searchWord}&page=${page}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 한줄 리뷰 등록
export const postBookReview = async (payload: BookReview) => {
  try {
    const response = await instance.post(`api/booksnap/new-review`, payload);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 리뷰 피드 가져오기
export const getReview = async (page: number, size: number) => {
  try {
    const response = await instance.get(`api/booksnap/recent?page=${page}&size=${size}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 좋아요 등록
export const postLike = async (bookReviewId: number) => {
  try {
    const response = await instance.post(`api/booksnap/like`, { bookReviewId: bookReviewId });
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 좋아요 취소
export const deleteLike = async (bookReviewId: number) => {
  try {
    const response = await instance.delete(`api/booksnap/unlike`, {
      data: { bookReviewId: bookReviewId },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 책 담기
export const pickBook = async (isbn: string) => {
  try {
    const response = await instance.post(`api/pick-book`, { isbn: isbn });
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

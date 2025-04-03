import { BookReview, IndepBookReview } from '../model/booksnap.model';
import instance from './instance';

// 책 검색
export const getSearchBook = async (booktype: string, searchtype: string, searchWord: string, page: number) => {
  try {
    const response = await instance.get(
      `api/booksnap/book-search?booktype=${booktype}&searchtype=${searchtype}&query=${searchWord}&page=${page}`,
    );
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

// 한줄 리뷰 등록
export const postBookReview = async (bookType: string, payload: BookReview) => {
  try {
    const response = await instance.post(`api/booksnap/new-review?booktype=${bookType}`, payload);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 독립출판물 등록 및 리뷰
export const postIndepBook = async (thumbnail: File, review: IndepBookReview) => {
  try {
    const formData = new FormData();

    formData.append('thumbnail', thumbnail);
    formData.append('review', JSON.stringify(review));

    const response = await instance.post(`/api/booksnap/indep-book`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 리뷰 피드 가져오기
export const getReview = async (sort: string, page: number) => {
  try {
    const response = await instance.get(`api/booksnap/reviews?sort=${sort}&page=${page}`);
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
    if (response.status == 201) {
      return { success: true, message: '책이 정상적으로 담겼습니다!' };
    }
  } catch (error: any) {
    if (error.response?.status === 409) {
      return { success: false, message: '이미 담긴 책입니다!' };
    }
    console.log(error);
  }
};

// 서점 검색
export const searchBookstore = async (query: string | null) => {
  try {
    const url = query ? `api/booksnap/bookstore?query=${encodeURIComponent(query)}` : 'api/booksnap/bookstore';
    const response = await instance.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    console.log(error);
  }
};

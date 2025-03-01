import { BookReview } from '../model/booksnap.model';
import instance from './instance';

// 책 검색
export const getSearchBook = async (searchWord: string) => {
  try {
    const response = await instance.get(`api/booksnap/book-search?query=${searchWord}`);
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

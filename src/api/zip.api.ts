import { postReview } from '../model/zip.model';
import instance from './instance';

// 서점 검색
export const searchBookstore = async (name: string, lat: number, lng: number) => {
  try {
    const response = await instance.get(`/api/bookstores/search?keyword=${name}&lat=${lat}&lng=${lng}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

// 카테고리 검색
export const getCategoryBookstore = async (category: string, lat: number, lng: number) => {
  try {
    const response = await instance.get(`api/bookstores?category=${category}&lat=${lat}&lng=${lng}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 사용자가 찜한 서점
export const getHeartBookstore = async (lat: number, lng: number) => {
  try {
    const response = await instance.get(`api/bookstores/liked?lat=${lat}&lng=${lng}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 서점 찜하기
export const likeZip = async (bookstoreId: number) => {
  try {
    const response = await instance.post(`api/bookstores/${bookstoreId}/toggle-like`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 서점 상세 정보
export const getZipDetail = async (bookstoreId: number, type: string) => {
  try {
    const response = await instance.get(`api/bookstores/${bookstoreId}/details?type=${type}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 서점 리뷰 등록
export const postBookstoreReview = async (review_img: File, review: postReview) => {
  try {
    const formData = new FormData();

    formData.append('review_img', review_img);
    formData.append('review', JSON.stringify(review));

    const response = await instance.post(`/api/bookstore/reviews`, formData, {
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

// 인기 급상승 독립 서점
export const getTrendZip = async () => {
  try {
    const response = await instance.get('/api/bookstores/trending');
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

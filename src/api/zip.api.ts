import instance from './instance';

// 서점 검색
export const searchBookstore = async (name: string, lat: number, lng: number) => {
  try {
    const response = await instance.get(`/api/bookstores/search?keyword=${name}&lat=${lat}&lng=${lng}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
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
export const getHeartBookstore = async () => {
  try {
    const response = await instance.get(`api/bookstores/liked`);
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

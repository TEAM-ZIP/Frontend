import instance from './instance';

// 서점 검색
export const searchBookstore = async (name: string) => {
  try {
    const response = await instance.get(`/api/bookstores/search?keyword=${name}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryBookstore = async (category: string) => {
  try {
    const response = await instance.get(`api/bookstores?category=${category}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

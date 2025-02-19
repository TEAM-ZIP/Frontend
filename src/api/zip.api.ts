import instance from './instance';

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

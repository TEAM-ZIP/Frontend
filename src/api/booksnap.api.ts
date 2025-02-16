import instance from './instance';

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

import instance from './instance';

export const getMyBook = async () => {
  try {
    const response = await instance.get('/api/pick-book');
    if (response.status == 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

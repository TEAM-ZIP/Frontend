// utils/chatAPI.ts
import instance from './instance';

// 한줄 리뷰 등록 (Spring 서버를 통해 FastAPI 프록시로 전달)
export const sendMessageToChatAPI = async (message: string) => {
  try {
    const response = await instance.post('/bookie/chat', { message: message });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Server responded with error');
    }
  } catch (error) {
    console.error('❌ chat API 호출 실패:', error);
    throw error;
  }
};

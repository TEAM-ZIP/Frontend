import bookie from '../../public/icons/bookie/bookie.png';
import MessageBox from '../components/Bookie/MessageBox';
import { useEffect, useRef, useState } from 'react';
import Input from '../components/Bookie/Input';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { sendMessageToChatAPI } from '../api/bookie.api';
import { MdBookmarkAdd } from 'react-icons/md';
import toast from 'react-hot-toast';
import { pickBook } from '../api/booksnap.api';

type MessageType = {
  text: string;
  type: 'system' | 'user';
  books?: BookCardType[];
};

type BookCardType = {
  title: string;
  bookId: string;
  bookImageUrl: string;
};

const Bookie = () => {
  const endOfMessages = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState<string>('');
  const nav = useNavigate();
  const [isComposing, setIsComposing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userName = '이구역독서짱';
  const [systemRes, setSystemRes] = useState<MessageType[]>([
    {
      text: `안녕하세요! ${userName}님이 좋아하실만한책을 추천해드리는 Bookie입니다! 더 많은 정보를 알려주시면, 책을 찾아드릴게요.`,
      type: 'system',
    },
  ]);

  useEffect(() => {
    if (endOfMessages.current) {
      endOfMessages.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [systemRes]);

  // 메세지 보내기
  const sendMessage = async () => {
    if (!input.trim() || isComposing) return;

    const userMessage: MessageType = { text: input, type: 'user' };
    setSystemRes((prev) => [...prev, userMessage]); // 사용자 메시지 먼저 출력
    setInput('');

    try {
      const reply = await sendMessageToChatAPI(input);
      const systemMessage: MessageType = { text: reply.message, type: 'system', books: reply.books };
      setSystemRes((prev) => [...prev, systemMessage]); // GPT 응답 추가
    } catch (error) {
      const errorMessage: MessageType = {
        text: '서버와 연결할 수 없습니다.',
        type: 'system',
      };
      setSystemRes((prev) => [...prev, errorMessage]);
    }
  };

  const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
    switch (e.type) {
      case 'compositionstart':
        setIsComposing(true);
        break;
      case 'compositionend':
        setIsComposing(false);
        setInput(e.currentTarget.value);
    }
  };

  const handlePickBook = (book: BookCardType) => {
    console.log(book);
    if (!localStorage.getItem('accessToken')) {
      toast.error('로그인이 필요한 서비스입니다.');
    } else {
      pickBook(book.bookId).then((data) => {
        if (data?.success) {
          toast.success(`${book.title}을(를) 책장에 담았어요!`);
        } else {
          toast.error(`${data?.message}`);
        }
      });
    }
  };

  return (
    <div className="mt-[70px] flex flex-col">
      {/* 헤더 */}
      <div className="fixed left-0 right-0 top-0 z-30 m-auto w-full max-w-[500px]">
        <div className="flex items-center bg-bg px-2 py-3">
          <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={() => nav('/')}>
            <IoCloseOutline size={30} className="stroke-white" />
          </div>
          <div className="flex flex-1 items-center justify-center gap-2 text-center text-[20px] font-medium tracking-[-0.8px]">
            <h3 className="text-mint">Bookie의</h3>
            <h3 className="text-white">추천</h3>
          </div>
          <div className="w-11" />
        </div>
      </div>
      {/* 내용 */}
      <div className="flex flex-col overflow-y-auto">
        {/* 설명 */}
        <div className="px-8 py-2 text-[14px] font-light">
          <span className="text-pink">{userName}</span>
          <span className="text-white">
            님의 활동을 기반으로 <br />
            책과 서점을 추천해드릴게요!
          </span>
        </div>
        <div className="flex w-full justify-center bg-gradient-to-b from-[#302D2D] to-[#C0E0D8]">
          <img src={bookie} className="w-24 pt-2" />
        </div>
        {/* 채팅구역 */}
        <div
          className="pointer-events-auto z-10 mb-20 mt-10 flex max-h-[80%] w-full flex-col gap-3 self-end px-8"
          onWheel={(e) => e.stopPropagation()} // 휠 이벤트 차단
        >
          {systemRes.map((msg, index) => (
            <div key={index} className="flex flex-col gap-2">
              <MessageBox text={msg.text} type={msg.type} />
              {msg.books && msg.books.length > 0 && (
                <div className="mt-1 flex flex-col gap-3">
                  <div className="flex gap-4">
                    {msg.books.map((book, idx) => (
                      <div key={idx} className="flex flex-col items-center rounded-lg shadow-md">
                        <div className="relative">
                          <img
                            src={book.bookImageUrl}
                            alt={book.title}
                            className="mb-2 h-36 w-24 rounded-md object-cover"
                          />
                          <button
                            className="absolute bottom-4 right-2 rounded-full bg-white p-1 shadow-md"
                            onClick={() => handlePickBook(book)}
                          >
                            <MdBookmarkAdd className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                        <p className="text-center text-sm font-medium text-white">{book.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div ref={endOfMessages}></div>
        </div>
      </div>
      {/* 입력창 */}
      <div className="fixed bottom-0 z-30 m-auto flex w-full max-w-[500px] items-center justify-between gap-2 bg-bg pb-8 pl-9 pr-[27px]">
        <Input input={input} setInput={setInput} onSend={sendMessage} onComposition={handleComposition} />
        <div className="flex h-11 w-11 items-center justify-center drop-shadow-md">
          {input == '' ? (
            <FaRegArrowAltCircleUp className="h-full w-full fill-white" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink">
              <FaRegArrowAltCircleUp className="h-7 w-7 fill-bg" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookie;

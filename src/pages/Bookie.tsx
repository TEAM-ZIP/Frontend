import Header from '../components/Common/Header';
import bookie from '../../public/icons/bookie/bookie.png';
import MessageBox from '../components/Bookie/MessageBox';
import { useEffect, useRef, useState } from 'react';
import Input from '../components/Bookie/Input';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';

type MessageType = {
  text: string;
  type: 'system' | 'user';
};

const Bookie = () => {
  const endOfMessages = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false);
  const [systemRes, setSystemRes] = useState<MessageType[]>([
    {
      text: '안녕하세요! 이구역 독서짱님이 좋아하실만한책을 추천해드리는 Bookie입니다! 더 많은 정보를 알려주시면, 책을 찾아드릴게요.',
      type: 'system',
    },
  ]);

  useEffect(() => {
    if (endOfMessages.current) {
      endOfMessages.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [systemRes]);

  const sendMessage = () => {
    if (!input.trim() || isComposing) return;
    if (input.trim() !== '') {
      const userMessage: MessageType = { text: input, type: 'user' };
      setSystemRes((prevMessages) => [...prevMessages, userMessage]);

      setInput('');
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

  return (
    <div className="mt-[70px] flex flex-col">
      {/* 헤더 */}
      <div className="fixed left-0 right-0 top-0 m-auto w-full max-w-[500px]">
        <Header title="Bookie의 책 추천" />
      </div>
      {/* 내용 */}
      <div className="flex flex-col">
        {/* 설명 */}
        <p className="px-8 py-2 text-[14px] font-light text-gray_2">
          요즘 인기있는 도서들과
          <br /> 이구역 독서짱님의 활동을 기반으로 책을 추천해드릴게요!
        </p>
        <div className="flex w-full justify-center bg-gradient-to-b from-white to-[#DBE5FF]">
          <img src={bookie} className="w-24" />
        </div>
        {/* 채팅구역 */}
        <div
          className="pointer-events-auto z-10 my-10 flex max-h-[80%] w-full flex-col gap-3 self-end overflow-y-auto px-8"
          onWheel={(e) => e.stopPropagation()} // 휠 이벤트 차단
        >
          {systemRes.map((msg, index) => (
            <MessageBox key={index} text={msg.text} type={msg.type} />
          ))}
          <div ref={endOfMessages}></div>
        </div>
      </div>
      {/* 입력창 */}
      <div className="fixed bottom-8 m-auto flex w-full max-w-[500px] items-center justify-between gap-2 pl-9 pr-[27px]">
        <Input input={input} setInput={setInput} onSend={sendMessage} onComposition={handleComposition} />
        <div className="flex h-11 w-11 items-center justify-center drop-shadow-md">
          {input == '' ? (
            <FaRegArrowAltCircleUp className="h-full w-full fill-main_1" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-main_1">
              <FaRegArrowAltCircleUp className="h-7 w-7 fill-main_2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookie;

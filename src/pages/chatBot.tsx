import { useRef, useState, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import MessageBox from '../components/MessageBox';

type MessageType = {
	text: string;
	type: 'system' | 'user';
	animation?: string;
	facialExpression?: string;
	audio?: string;
};

interface ChatBotProps {
	hidden?: boolean;
}

export const chatBot = ({ hidden }: ChatBotProps): JSX.Element | null => {
	const endOfMessages = useRef<HTMLDivElement | null>(null);
	const { chat, loading, message, setSystemRes, systemRes } = useChat();
	const [input, setInput] = useState<string>('');
	const [isComposing, setIsComposing] = useState(false);

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

	const sendMessage = () => {
		if (!input.trim() || isComposing) return;
		if (!loading && !message && input.trim() !== '') {
			const userMessage: MessageType = { text: input, type: 'user' };
			setSystemRes((prevMessages) => [...prevMessages, userMessage]);

			chat(input);
			setInput('');
		}
	};

	useEffect(() => {
		if (endOfMessages.current) {
			endOfMessages.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [systemRes]);

	if (hidden) return null;

	return (
		<>
			{/* 배경 */}
			<div className="bg fixed bottom-0 left-0 right-0 top-0 z-10 flex flex-col justify-between p-4">
				{/* 상단 안내 메시지 */}
				<div className="pointer-events-auto self-start rounded-lg bg-white bg-opacity-50 p-4 backdrop-blur-md">
					<h1 className="text-left text-xl font-black">척척박사 쏙쏙이</h1>
					<p>궁금한 사항이 있으면 언제든지 물어보세요!</p>
				</div>

				{/* 채팅 메시지 */}
				<div
					className="pointer-events-auto z-10 mx-[100px] my-10 flex max-h-[80%] w-3/6 flex-col gap-3 self-end overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#9ABFA2]"
					onWheel={(e) => e.stopPropagation()} // 휠 이벤트 차단
				>
					{systemRes.map((msg, index) => (
						<MessageBox key={index} text={msg.text} type={msg.type} />
					))}
					<div ref={endOfMessages}></div>
				</div>

				{/* 입력창 */}
				<div className="pointer-events-auto z-20 mx-auto flex w-full max-w-screen-md items-center gap-2">
					<input
						className="w-full rounded-md bg-white bg-opacity-50 p-4 outline-none backdrop-blur-md placeholder:italic placeholder:text-gray-600 focus:ring-2"
						placeholder="자립 준비 청년 관련해서 궁금한 주거, 취업, 금융 정보를 물어보세요!"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								sendMessage();
							}
						}}
						onCompositionStart={handleComposition}
						onCompositionEnd={handleComposition}
					/>
					<button
						disabled={loading || !!message}
						onClick={sendMessage}
						className={`whitespace-nowrap rounded-md bg-[#9ABFA2] p-4 px-10 font-semibold uppercase text-white hover:bg-[#64926E] ${
							loading || message ? 'cursor-not-allowed opacity-30' : ''
						}`}
					>
						전송
					</button>
				</div>
			</div>
		</>
	);
};

export default chatBot;

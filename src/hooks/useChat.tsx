import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import instance from '../api/instance';

const backendUrl: string = 'http://localhost:3000';

// 메시지 타입 정의
type MessageType = {
	text: string;
	type: 'system' | 'user';
	animation?: string; // animation 속성 추가 (선택적)
	facialExpression?: string; // 필요 시 추가
	audio?: string; // 필요 시 추가
	lipsync?: string;
};

// ChatContext 데이터 타입 정의
interface ChatContextType {
	chat: (message: string) => Promise<void>;
	message: MessageType | null;
	onMessagePlayed: () => void;
	systemRes: MessageType[];
	setSystemRes: React.Dispatch<React.SetStateAction<MessageType[]>>;
	loading: boolean;
	cameraZoomed: boolean;
	setCameraZoomed: React.Dispatch<React.SetStateAction<boolean>>;
}

// ChatContext 초기화 (기본값으로 undefined 설정)
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// ChatProviderProps 정의
interface ChatProviderProps {
	children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps): JSX.Element => {
	// State 관리
	const [systemRes, setSystemRes] = useState<MessageType[]>([
		{
			text: '안녕하세요! 자립 준비 청년들에게 맞는 정보를 제공해주는 쏙쏙이입니다! 궁금한 사항이 있으면 언제든지 물어보세요.',
			type: 'system',
		},
	]);

	const [messages, setMessages] = useState<MessageType[]>([]);
	const [message, setMessage] = useState<MessageType | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [cameraZoomed, setCameraZoomed] = useState<boolean>(true);

	// 메시지 전송 함수
	const chat = async (message: string): Promise<void> => {
		try {
			if (!message) {
				console.error('messageObject is undefined or missing text:', message);
				return; // 오류 발생 방지
			}

			setLoading(true);

			const response = await instance.post(`${backendUrl}/chat`, { message });

			if (response.status === 200) {
				console.log('Response Data:', response.data); // 데이터 확인
				const { messages: resp }: { messages: MessageType[] } = response.data;

				// 기존 메시지 업데이트
				setMessages((prevMessages) => [...prevMessages, ...resp]);

				// 시스템 메시지 생성
				const systemMessages: MessageType[] = resp.map((msg) => ({
					text: msg.text,
					type: 'system',
				}));

				// 시스템 응답 업데이트
				setSystemRes((prevMessages) => [...prevMessages, ...systemMessages]);
			} else {
				console.error(
					'메시지 전송 실패: ',
					response.status,
					response.statusText,
				);
			}
		} catch (error) {
			console.error('메시지 전송 중 오류 발생:', error);
		} finally {
			setLoading(false);
		}
	};

	// 메시지 관리 함수
	const onMessagePlayed = (): void => {
		setMessages((messages) => messages.slice(1));
	};

	// 메시지 업데이트 감지
	useEffect(() => {
		if (messages.length > 0) {
			setMessage(messages[0]);
		} else {
			setMessage(null);
		}
	}, [messages]);

	return (
		<ChatContext.Provider
			value={{
				chat,
				message,
				onMessagePlayed,
				systemRes,
				setSystemRes,
				loading,
				cameraZoomed,
				setCameraZoomed,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const useChat = (): ChatContextType => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error('useChat must be used within a ChatProvider');
	}
	return context;
};

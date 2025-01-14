const MessageBox = ({ type, text }: { type: string; text: string }) => {
	let boxClass = 'flex p-3 bg-[#E9F9EC] rounded-xl max-w-md h-auto text-left';

	switch (type) {
		case 'user':
			boxClass =
				'flex p-3 bg-[#A1ACA4] rounded-xl max-w-md h-auto bg-opacity-50 self-end text-left';
			break;
		case 'system':
			boxClass =
				'flex p-3 bg-[#E9F9EC] rounded-xl max-w-md h-auto self-start text-left';
	}

	return (
		<div className={boxClass}>
			<span>{text}</span> {/* 긴 단어나 줄바꿈 처리 */}
		</div>
	);
};

export default MessageBox;

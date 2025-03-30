const MessageBox = ({ type, text }: { type: string; text: string }) => {
  let boxClass = 'flex p-4 rounded-xl max-w-[14rem] h-auto text-left text-[14px] font-light leading-[20px]';

  switch (type) {
    case 'user':
      boxClass += 'flex p-4 bg-pink rounded-[30px] max-w-[16rem] h-auto self-end text-left leading-[20px]';
      break;
    case 'system':
      boxClass += 'flex p-4 bg-mint rounded-[30px] max-w-[16rem] h-auto self-start text-left leading-[20px] ';
  }

  return (
    <div className={boxClass}>
      <span>{text}</span> {/* 긴 단어나 줄바꿈 처리 */}
    </div>
  );
};

export default MessageBox;

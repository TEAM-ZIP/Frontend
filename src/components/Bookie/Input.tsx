interface InputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  onComposition: (e: React.CompositionEvent<HTMLInputElement>) => void;
}

const Input = ({ input, setInput, onSend, onComposition }: InputProps) => {
  return (
    <input
      className="h-10 w-full rounded-[10px] border-[1px] border-main_1 bg-white px-3 py-[7px] text-[14px]"
      placeholder="책 추천을 받기 위한 질문을 해주세요."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onCompositionStart={onComposition}
      onCompositionEnd={onComposition}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSend();
        }
      }}
    ></input>
  );
};

export default Input;

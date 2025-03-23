interface LabeledInputProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput = ({ label, placeholder, value, onChange }: LabeledInputProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <p className="text-[14px] font-medium">{label}</p>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:outline-2 focus:outline-gray-500"
      />
    </div>
  );
};

export default LabeledInput;

interface StepProps {
  step: number;
  text: string;
}

const Step = ({ step, text }: StepProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        <div className="bg-mint h-5 w-5 rounded-full" />
        <div className="bg-mint h-[10px] w-7 rounded-full" />
      </div>
      <p className="text-pink mt-3 text-body3 font-medium">STEP {step}</p>
      <div className="mt-2 h-[1px] w-[66px] bg-white" />
      <p className="mb-6 mt-4 text-[15px] font-light text-white">{text}</p>
    </div>
  );
};

export default Step;

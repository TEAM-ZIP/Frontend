interface TagProps {
  name: string;
}

const Tag = ({ name }: TagProps) => {
  return <div className="rounded-full border-[1px] border-solid border-white px-[10px] py-2 text-[12px]">{name}</div>;
};

export default Tag;

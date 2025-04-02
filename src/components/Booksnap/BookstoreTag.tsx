interface BookstoreProps {
  name: string;
}

const BookstoreTag = ({ name }: BookstoreProps) => {
  return <div className="rounded-[10px] border-[1px] border-pink px-3 py-[2px] text-[12px] text-pink">{name}</div>;
};

export default BookstoreTag;

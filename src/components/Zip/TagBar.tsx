import { useEffect, useState } from 'react';
import { getHashTag } from '../../api/zip.api';
import FilterButton from '../../components/Button/FilterButton';

const TagBar = () => {
  const [tags, setTag] = useState<{ tag: string }[]>([]);
  useEffect(() => {
    getHashTag().then((data) => {
      setTag(data.data);
    });
  }, []);

  return (
    <div className="relative flex gap-2">
      <div className="mx-[-32px] overflow-x-auto px-[32px] scrollbar-hide">
        <div className="flex gap-[10px] after:w-[20px] after:flex-shrink-0 after:content-['']">
          {tags.map((tag, index) => (
            <FilterButton text={tag.tag} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagBar;

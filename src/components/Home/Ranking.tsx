import { useEffect, useState } from 'react';
import { getTrendZip } from '../../api/zip.api';

const Ranking = () => {
  const [bookstores, setBookstores] = useState([
    '게으른 정원',
    '고요서사',
    '스토리지북앤필름',
    '책방이음',
    '유어마인드',
    '퇴근길책한잔',
    '진눈깨비책방',
    '책방서로',
    '북소리서점',
    '책밥서점',
  ]);

  useEffect(() => {
    getTrendZip().then((data) => {
      setBookstores(data.data);
    });
  });

  const left = bookstores.slice(0, 5);
  const right = bookstores.slice(5, 10);

  return (
    <div>
      <div className="flex justify-center gap-[90px] text-[13px] font-semibold text-white">
        {/* 왼쪽 열 */}
        <div className="flex flex-col gap-4">
          {left.map((bookstore, i) => (
            <p key={i}>
              {i + 1}. {bookstore}
            </p>
          ))}
        </div>

        {/* 오른쪽 열 */}
        <div className="flex flex-col gap-4">
          {right.map((bookstore, i) => (
            <p key={i}>
              {i + 6}. {bookstore}
            </p> // 6부터 시작
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ranking;

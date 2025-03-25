const ReviewBox = () => {
  return (
    <div className="w-[165px] flex-shrink-0 overflow-hidden rounded-[20px] bg-bg_2 text-white shadow-md">
      {/* 상단 텍스트 */}
      <div className="px-4 pt-4 text-[16px]">독서왕용가리</div>

      {/* 배경 이미지 영역 */}
      <div className="relative mt-2 h-[190px] w-full overflow-hidden rounded-b-[20px]">
        {/* 흐릿한 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{
            backgroundImage: `url(https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1558147%3Ftimestamp%3D20221210154041)`,
          }}
        />

        {/* 어두운 반투명 레이어*/}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* 오버레이 콘텐츠 */}
        <div className="relative z-10 flex h-full flex-col justify-end p-4">
          <p className="break-keep text-[18px] font-bold">
            “ <br />
            사이키쿠스오가 될래...
            <br />”
          </p>
          <div className="text-green-200 mt-2 flex items-center justify-between text-[12px]">
            <span>수레바퀴 아래서</span>
            <span>★ 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;

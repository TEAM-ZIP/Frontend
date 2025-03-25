import StarIcon from '@mui/icons-material/Star';

const Contact = () => {
  return (
    <div className="py-[20px]">
      <div className="flex items-center gap-[10px] px-[10px]">
        <StarIcon sx={{ fontSize: 40, fill: '#C1D201' }} />
        <StarIcon sx={{ fontSize: 40, fill: '#E27451' }} />
        <p className="ml-[10px] text-body1 font-bold text-white">CONTACT</p>
      </div>
      <div className="flex flex-col items-end p-[10px] text-body3 text-white">
        <p>TEAM ZIP가기</p>
        <p className="text-pink">zipgagi@gmail.com</p>
      </div>
    </div>
  );
};

export default Contact;

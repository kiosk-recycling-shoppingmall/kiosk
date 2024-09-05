import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false, // FormData 처리
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  // 요청에 영업 시간을 포함하여 처리
  const { storeName, foodCourt, category, storeDescription, openingTime, closingTime } = req.body;

  // 영업 시간, 가게 정보를 포함한 가게 생성 로직
  // 실제로는 저장하는 백엔드 로직이 필요하지만, 목업에서는 성공 응답만 반환
  res.status(200).json({ message: '가게 생성 성공' });
};

import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { foodCourt } = req.query; // 사업장별로 필터링

  // 사업장에 속한 가게 목록을 반환
  const allStores = [
    { id: 1, name: '중식집 A', description: '맛있는 중식 요리', image: '/images/store1.jpg', foodCourt: '신세계점' },
    { id: 2, name: '양식집 B', description: '고급 양식 요리', image: '/images/store2.jpg', foodCourt: '현대점' },
  ];

  // foodCourt에 맞는 가게만 필터링
  const filteredStores = allStores.filter(store => store.foodCourt === foodCourt);

  res.status(200).json({ stores: filteredStores });
};

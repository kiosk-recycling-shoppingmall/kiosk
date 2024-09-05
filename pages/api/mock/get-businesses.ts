import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // 사업장 목록을 반환
  const businesses = [
    { id: 1, name: '신세계점' },
    { id: 2, name: '현대점' },
  ];

  res.status(200).json({ businesses });
};

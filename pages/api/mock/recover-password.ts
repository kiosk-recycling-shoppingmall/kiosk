import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  if (email === 'user@example.com') {
    res.status(200).json({ message: '비밀번호 찾기 성공' });
  } else {
    res.status(400).json({ message: '비밀번호 찾기 실패' });
  }
};

import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { phoneNumber, verificationCode } = req.body;

  if (phoneNumber === '010-1234-5678' && verificationCode === '1234') {
    res.status(200).json({ message: '이메일 찾기 성공', email: 'user@example.com' });
  } else {
    res.status(400).json({ message: '이메일 찾기 실패' });
  }
};

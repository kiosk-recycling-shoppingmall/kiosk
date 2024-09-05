import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, phoneNumber, verificationCode, businessNumber } = req.body;

  if (email && password && phoneNumber && verificationCode === '1234' && businessNumber) {
    res.status(200).json({ message: '회원가입 성공' });
  } else {
    res.status(400).json({ message: '회원가입 실패' });
  }
};

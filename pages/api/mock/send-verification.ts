import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { phoneNumber } = req.body;

  if (phoneNumber) {
    // 실제로는 전화번호로 인증번호 발송 로직이 들어가야 함
    res.status(200).json({ message: '인증번호가 발송되었습니다.' });
  } else {
    res.status(400).json({ message: '전화번호를 입력하세요.' });
  }
};

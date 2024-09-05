import { useState } from 'react';
import { useRouter } from 'next/router';
import AuthLayout from '../../components/Auth/AuthLayout';
import BackButton from '../../components/Buttons/BackButton'; // 뒤로 가기 버튼 추가

const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [verificationSent, setVerificationSent] = useState(false); // 인증번호 발송 여부 상태
  const router = useRouter();

  // 회원가입 처리
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 입력 필드 확인
    if (!email || !password || !phoneNumber || !verificationCode || !businessNumber) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const res = await fetch('/api/mock/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, phoneNumber, verificationCode, businessNumber }),
    });

    if (res.ok) {
      router.push('/admin/signup-complete');
    } else {
      alert('회원가입 실패');
    }
  };

  // 인증번호 발송 처리 (목업)
  const handleSendVerification = async () => {
    if (!phoneNumber) {
      alert('전화번호를 입력해주세요.');
      return;
    }

    // 여기에 인증번호 발송 API 호출 로직 추가 (목업 API)
    // const res = await fetch('/api/mock/send-verification', ...);
    setVerificationSent(true); // 인증번호가 발송되었음을 상태로 저장
    alert('인증번호가 발송되었습니다.');
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="email"
          placeholder="이메일"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="전화번호"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          type="button"
          className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
          onClick={handleSendVerification}
        >
          인증번호 발송
        </button>
        {verificationSent && (
          <input
            type="text"
            placeholder="인증번호 입력"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        )}
        <input
          type="text"
          placeholder="사업자 등록번호"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={businessNumber}
          onChange={(e) => setBusinessNumber(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          회원가입
        </button>
      </form>

      <BackButton />
    </AuthLayout>
  );
};

export default AdminSignup;

import { useState } from 'react';
import { useRouter } from 'next/router'; // 뒤로 가기 기능을 위해 추가
import AuthLayout from '../components/AuthLayout';

const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const router = useRouter(); // useRouter 사용

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/mock/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, phoneNumber, verificationCode, businessNumber }),
    });

    if (res.ok) {
      router.push('/admin/login');
    } else {
      alert('회원가입 실패');
    }
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
        <button type="button" className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600">
          인증번호 발송
        </button>
        <input
          type="text"
          placeholder="인증번호 입력"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
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

      {/* 뒤로 가기 버튼 추가 */}
      <button
        onClick={() => router.back()}
        className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
      >
        뒤로 가기
      </button>
    </AuthLayout>
  );
};

export default AdminSignup;

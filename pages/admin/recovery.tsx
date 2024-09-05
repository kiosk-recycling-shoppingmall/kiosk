import { useState } from 'react';
import { useRouter } from 'next/router'; // 뒤로 가기 기능을 위해 추가
import AuthLayout from '../components/AuthLayout';

const Recovery = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const router = useRouter(); // useRouter 사용

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = activeTab === 'email' ? '/api/mock/recover-email' : '/api/mock/recover-password';
    const body = activeTab === 'email' ? { phoneNumber, verificationCode } : { email };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert(`${activeTab === 'email' ? '이메일' : '비밀번호'} 찾기 요청이 성공했습니다.`);
    } else {
      alert(`${activeTab === 'email' ? '이메일' : '비밀번호'} 찾기 요청에 실패했습니다.`);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-4 flex justify-center">
        <button
          className={`px-4 py-2 mr-2 ${activeTab === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('email')}
        >
          이메일 찾기
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'password' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('password')}
        >
          비밀번호 찾기
        </button>
      </div>

      <form onSubmit={handleRecovery} className="space-y-4">
        {activeTab === 'email' && (
          <>
            <input
              type="text"
              placeholder="전화번호 입력"
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
          </>
        )}

        {activeTab === 'password' && (
          <>
            <input
              type="email"
              placeholder="이메일 입력"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          {activeTab === 'email' ? '이메일 찾기' : '비밀번호 찾기'}
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

export default Recovery;

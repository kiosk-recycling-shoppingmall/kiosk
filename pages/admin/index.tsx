import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import AuthLayout from '../../components/Auth/AuthLayout';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/mock/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      alert('로그인 실패');
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleLogin} className="space-y-4">
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
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          로그인
        </button>
      </form>

      <div className="flex justify-between mt-4">
        <Link href="/admin/signup" className="text-blue-500 hover:underline">
          회원가입
        </Link>
        <Link href="/admin/recovery" className="text-blue-500 hover:underline">
          아이디/비밀번호 찾기
        </Link>
      </div>
    </AuthLayout>
  );
};

export default AdminLogin;

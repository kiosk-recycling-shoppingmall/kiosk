import { useRouter } from 'next/router';
import AuthLayout from '../../components/Auth/AuthLayout';

const SignupComplete = () => {
  const router = useRouter();

  const handleStoreCreation = () => {
    router.push('/admin/store/create'); // 가게 생성 페이지로 이동
  };

  const handleLater = () => {
    router.push('/admin'); // 나중에 하기 -> 로그인 페이지로 이동
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-4">회원가입 완료</h1>
      <p className="mb-6">가게를 지금 생성하시겠습니까?</p>
      <div className="flex space-x-4">
        <button onClick={handleStoreCreation} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          가게 생성하기
        </button>
        <button onClick={handleLater} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          나중에 하기
        </button>
      </div>
    </AuthLayout>
  );
};

export default SignupComplete;

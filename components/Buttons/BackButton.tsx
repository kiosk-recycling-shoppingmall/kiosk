import { useRouter } from 'next/router';

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
    >
      뒤로 가기
    </button>
  );
};

export default BackButton;

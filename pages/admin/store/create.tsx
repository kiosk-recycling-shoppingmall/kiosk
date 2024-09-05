import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthLayout from '../../../components/Auth/AuthLayout';

interface Business {
  id: number;
  name: string;
}

const StoreCreate = () => {
  const [storeName, setStoreName] = useState('');
  const [foodCourt, setFoodCourt] = useState(''); // 사업장(푸드코트)
  const [category, setCategory] = useState(''); // 음식 카테고리
  const [storeImage, setStoreImage] = useState<File | null>(null); // 가게 이미지
  const [storeDescription, setStoreDescription] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]); // 사업장 목록
  const [openingTime, setOpeningTime] = useState(''); // 영업 시작 시간
  const [closingTime, setClosingTime] = useState(''); // 영업 종료 시간
  const router = useRouter();

  // 사업장 목록 가져오기
  useEffect(() => {
    const fetchBusinesses = async () => {
      const res = await fetch('/api/mock/get-businesses');
      const data = await res.json();
      setBusinesses(data.businesses);
    };

    fetchBusinesses();
  }, []);

  // 이미지 선택 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setStoreImage(e.target.files[0]);
    }
  };

  const handleStoreCreation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!storeName || !foodCourt || !category || !storeImage || !openingTime || !closingTime) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    // 이미지 업로드 처리 (목업 API로 처리)
    const formData = new FormData();
    formData.append('storeName', storeName);
    formData.append('foodCourt', foodCourt);
    formData.append('category', category);
    formData.append('storeDescription', storeDescription);
    formData.append('storeImage', storeImage);
    formData.append('openingTime', openingTime); // 영업 시작 시간
    formData.append('closingTime', closingTime); // 영업 종료 시간

    const res = await fetch('/api/mock/create-store', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      localStorage.setItem('storeCreated', 'true'); // 가게 생성 성공 시 저장
      router.push('/admin/dashboard');
    } else {
      alert('가게 생성 실패');
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-4">가게 생성</h1>
      <form onSubmit={handleStoreCreation} className="space-y-4">
        <input
          type="text"
          placeholder="가게 이름"
          className="w-full px-4 py-2 border rounded-md"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />

        <select
          className="w-full px-4 py-2 border rounded-md"
          value={foodCourt}
          onChange={(e) => setFoodCourt(e.target.value)}
        >
          <option value="">푸드코트 선택</option>
          {businesses.map((business) => (
            <option key={business.id} value={business.name}>
              {business.name}
            </option>
          ))}
        </select>

        <select
          className="w-full px-4 py-2 border rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">카테고리 선택</option>
          <option value="중식">중식</option>
          <option value="양식">양식</option>
          <option value="일식">일식</option>
          <option value="한식">한식</option>
        </select>

        <input
          type="file"
          accept="image/*"
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleImageChange}
        />

        <textarea
          placeholder="가게 소개 (선택 사항)"
          className="w-full px-4 py-2 border rounded-md"
          value={storeDescription}
          onChange={(e) => setStoreDescription(e.target.value)}
        />

        {/* 영업 시간 필드 추가 */}
        <div className="flex space-x-4">
          <input
            type="time"
            placeholder="영업 시작 시간"
            className="w-full px-4 py-2 border rounded-md"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
          />
          <input
            type="time"
            placeholder="영업 종료 시간"
            className="w-full px-4 py-2 border rounded-md"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          가게 생성
        </button>
      </form>
    </AuthLayout>
  );
};

export default StoreCreate;

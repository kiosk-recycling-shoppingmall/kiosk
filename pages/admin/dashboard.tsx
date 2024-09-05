import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const [storeCreated, setStoreCreated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 클라이언트에서만 localStorage에 접근
    const storedValue = localStorage.getItem('storeCreated');
    if (storedValue === 'true') {
      setStoreCreated(true);
    } else {
      setStoreCreated(false);
    }
  }, []);

  useEffect(() => {
    if (storeCreated === false) {
      // 가게가 생성되지 않았으면 가게 생성 페이지로 이동
      router.push('/admin/store/create');
    }
  }, [storeCreated, router]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {storeCreated === null ? (
        <p className="text-lg font-semibold text-gray-700">로딩 중...</p>
      ) : (
        <div className="bg-white p-8 shadow-md rounded-lg max-w-4xl w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">관리자 대시보드</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 가게 관리 버튼 */}
            <div
              className="bg-blue-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-blue-600 transition"
              onClick={() => handleNavigation('/admin/store/manage')}
            >
              <h2 className="text-xl font-bold mb-2">가게 관리</h2>
              <p>가게 정보 관리 및 수정</p>
            </div>
            
            {/* 메뉴 관리 버튼 */}
            <div
              className="bg-green-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-green-600 transition"
              onClick={() => handleNavigation('/admin/menu/manage')}
            >
              <h2 className="text-xl font-bold mb-2">메뉴 관리</h2>
              <p>메뉴 추가 및 수정</p>
            </div>

            {/* 매출 확인 버튼 */}
            <div
              className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-yellow-600 transition"
              onClick={() => handleNavigation('/admin/sales')}
            >
              <h2 className="text-xl font-bold mb-2">매출 확인</h2>
              <p>매출 보고서 및 통계</p>
            </div>

            {/* 주문 내역 버튼 */}
            <div
              className="bg-red-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-red-600 transition"
              onClick={() => handleNavigation('/admin/orders')}
            >
              <h2 className="text-xl font-bold mb-2">주문 내역</h2>
              <p>고객 주문 내역 조회</p>
            </div>

            {/* 계정 관리 버튼 */}
            <div
              className="bg-purple-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-purple-600 transition"
              onClick={() => handleNavigation('/admin/account')}
            >
              <h2 className="text-xl font-bold mb-2">계정 관리</h2>
              <p>계정 정보 변경 및 비밀번호 관리</p>
            </div>

            {/* 로그아웃 버튼 */}
            <div
              className="bg-gray-700 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition"
              onClick={() => {
                // 로그아웃 로직을 추가할 수 있습니다.
                localStorage.clear();
                router.push('/admin/login');
              }}
            >
              <h2 className="text-xl font-bold mb-2">로그아웃</h2>
              <p>계정에서 로그아웃</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

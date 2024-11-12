import React from 'react';

const MedicalReportResultPage = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF8F6]">
      {/* Header */}
      <div className="px-4 py-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">진단서 분석 결과 확인하기</h1>
          <button className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center">
            ×
          </button>
        </div>
        <div className="text-gray-500 text-sm mt-2 text-center">
          2024.01.01 17:50
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">진단서 내용</h2>
        
        {/* Details Table */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-6">
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <th className="px-4 py-3 text-left bg-gray-50 w-24">병명</th>
                <td className="px-4 py-3">
                  <div>(주) 경도 근막통증증후군</div>
                  <div className="text-gray-500">(부) 일시적 피로감</div>
                </td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-3 text-left bg-gray-50">치료 내용</th>
                <td className="px-4 py-3">물리치료 및 운동치료 필요</td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-3 text-left bg-gray-50">소견</th>
                <td className="px-4 py-3">
                  <p>정기적인 스트레칭과 물리치료를 통해 2-3주 내 호전될 것으로 예상됨.</p>
                  <p className="mt-2">재발 방지를 위해 적절한 운동과 휴식이 필요함.</p>
                </td>
              </tr>
              <tr>
                <th className="px-4 py-3 text-left bg-gray-50">진단일</th>
                <td className="px-4 py-3">2024-01-29</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-medium mb-4">검사 결과 요약</h3>
          <ul className="space-y-4 text-gray-600">
            <li>• 근육의 긴장도가 약간 상승되어 있으나, 정상 범위 내에서 관찰됨 (45-50%)</li>
            <li>• 전반적인 근골격계 상태는 양호하며, 특별한 이상 소견은 관찰되지 않음</li>
            <li>• 적절한 운동과 휴식을 병행하면서 규칙적인 스트레칭 권장</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MedicalReportResultPage;
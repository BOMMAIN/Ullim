import React from 'react';
import '../../index.css';

const AnalyzeResultPage = () => {
  return (
    <div className="max-w-md mx-auto bg-[#FDF8F6] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="text-lg font-medium">심전도 분석 결과 확인하기</div>
        <button className="p-2 rounded-full bg-red-500 text-white">
          <span className="text-xl">×</span>
        </button>
      </div>
      
      {/* Timestamp */}
      <div className="text-gray-500 text-center py-2">
        2024.01.01 17:50
      </div>

      {/* ECG Readings */}
      <div className="m-4 p-4 bg-white rounded-lg shadow">
        <div className="grid gap-4">
          <div className="border-b pb-4">
            <div className="font-medium mb-2">aVR / V1</div>
            <div className="h-24 bg-[#FDF8F6]">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                <path 
                  d="M 0,50 Q 50,50 100,50 T 200,50 T 300,50 T 400,50" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>

          <div className="border-b pb-4">
            <div className="font-medium mb-2">aVL / V2</div>
            <div className="h-24 bg-[#FDF8F6]">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                <path 
                  d="M 0,50 Q 50,50 100,50 T 200,50 T 300,50 T 400,50" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>

          <div>
            <div className="font-medium mb-2">(심전도 사진)</div>
            <div className="h-24 bg-[#FDF8F6]">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                <path 
                  d="M 0,50 Q 50,50 100,50 T 200,50 T 300,50 T 400,50" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      <div className="m-4 bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-medium">분석 결과</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="h-24 bg-[#FDF8F6]">
            <svg viewBox="0 0 400 100" className="w-full h-full">
              <path 
                d="M 0,50 Q 50,50 100,50 T 200,50 T 300,50 T 400,50" 
                fill="none" 
                stroke="black" 
                strokeWidth="1"
              />
              <rect x="100" y="30" width="200" height="40" fill="rgba(255,0,0,0.1)" />
            </svg>
          </div>
          
          <p className="text-sm">
            심전도 검사에서 "ST 분절"이라는 부분이 정상보다 낮게 내려간 것이 일부 기록에서 발견되었습니다.
          </p>
          
          <p className="text-sm">
            이 부분은 심장의 전기 신호가 어떻게 전달되는지를 보여주는데, 
            ST 분절이 내려간 것은 심장 근육에 충분한 산소가 공급되지 않고 있음을 의미할 수 있습니다.
          </p>
          
          <p className="text-sm">
            쉽게 말해, 심장이 피를 제대로 받지 못해서 힘들어하고 있을 가능성이 있다는 것입니다.
          </p>
          
          <p className="text-sm">
            이러한 상황은 심장 근육의 일시적인 혈액 부족(심근 허혈)이나 심장 마비를 일으킬 수 있는
            심장 근육 손상(심근 경색)과 관련이 있을 수 있습니다.
          </p>
          
          <p className="text-sm font-medium mt-4">
            더 정확한 상태를 확인하기 위해 추가 검사가 필요합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeResultPage;
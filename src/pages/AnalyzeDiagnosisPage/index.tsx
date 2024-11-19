import React from "react";
import "../../index.css";

const AnalyzeDiagnosisPage = () => {
  return (
    <div className="mb-6 w-96 mx-auto">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 px-4">
        <h1 className="text-lg font-medium text-center">
          진단서를 분석하는 중입니다...
        </h1>

        {/* Diagnosis Image Display */}
        <div className="relative w-full bg-white rounded-lg shadow-sm">
          <div className="relative h-96 overflow-hidden rounded-lg">
            {/* Diagnosis Image */}
            <img
              src="/path/to/your/image.png" // 업로드한 이미지를 사용해주세요.
              alt="진단서"
              className="w-full h-full object-cover"
            />

            {/* Scanning Animation */}
            <div className="absolute inset-x-0 top-0 h-6 bg-blue-300 opacity-70 animate-scan"></div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-500 text-sm">거의 다 됐어요!</p>
      </div>
    </div>
  );
};

export default AnalyzeDiagnosisPage;

// Add this to your global CSS
const styles = `
@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(100%);
  }
}

.animate-scan {
  animation: scan 2s linear infinite;
}
`;

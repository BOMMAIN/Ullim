import React from 'react';
import './index.css';

const AnalyzePage = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF8F6] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 px-4">
        <h1 className="text-xl font-medium text-center">
          심전도를 분석하는 중입니다...
        </h1>
        
        {/* ECG Display */}
        <div className="w-full bg-white rounded-lg p-4 shadow-sm">
          {/* ECG Graph */}
          <div className="relative h-64 bg-[#FFE8E8]">
            {/* Blue Highlight Sections */}
            <div className="absolute left-1/4 h-full w-12 bg-[#E8F4FF] opacity-50"></div>
            <div className="absolute left-1/3 h-full w-8 bg-[#4A90E2] opacity-30"></div>
            
            {/* Grid Lines */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(#FF9999 1px, transparent 1px), linear-gradient(90deg, #FF9999 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>
        </div>

        {/* Heartbeat Animation */}
        <div className="relative w-40 h-16">
          <svg 
            viewBox="0 0 400 100"
            className="w-full h-full fill-none stroke-[#E48A7C] stroke-2 animate-[heartbeat_2s_ease-in-out_infinite]"
          >
            <path d="M 0 50 
                     L 50 50 
                     L 75 50 
                     L 100 10 
                     L 125 90 
                     L 150 30 
                     L 175 50 
                     L 200 50 
                     L 225 50 
                     L 250 50"
            />
          </svg>
          <svg 
            viewBox="0 0 400 100"
            className="absolute top-0 left-0 w-full h-full fill-none stroke-[#E48A7C] stroke-2 opacity-30 animate-[heartbeat_2s_ease-in-out_infinite_500ms]"
          >
            <path d="M 0 50 
                     L 50 50 
                     L 75 50 
                     L 100 10 
                     L 125 90 
                     L 150 30 
                     L 175 50 
                     L 200 50 
                     L 225 50 
                     L 250 50"
            />
          </svg>
        </div>

        {/* Loading Text */}
        <p className="text-gray-500 text-sm">
          조금만 기다려주세요!
        </p>
      </div>
    </div>
  );
};

export default AnalyzePage;

// Add this to your global CSS
const styles = `
@keyframes heartbeat {
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  45% {
    transform: translateX(0%);
    opacity: 1;
  }
  50% {
    transform: translateX(-2%);
    opacity: 0.8;
  }
  95% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}
`;
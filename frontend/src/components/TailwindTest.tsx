import React from 'react';

export const TailwindTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-red-500 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Tailwind Test</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-800 mb-4">If you can see this styled properly, Tailwind is working!</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
};

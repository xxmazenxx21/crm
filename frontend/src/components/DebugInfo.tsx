import React from 'react';

export const DebugInfo: React.FC = () => {
  const env = import.meta.env;
  
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h4 className="font-bold mb-2">Debug Info:</h4>
      <div>VITE_API_URL: {env.VITE_API_URL}</div>
      <div>Current URL: {window.location.href}</div>
      <div>User in localStorage: {localStorage.getItem('user') ? 'Yes' : 'No'}</div>
      <div>Token in localStorage: {localStorage.getItem('token') ? 'Yes' : 'No'}</div>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 bg-blue-500 px-2 py-1 rounded text-xs"
      >
        Reload
      </button>
    </div>
  );
};

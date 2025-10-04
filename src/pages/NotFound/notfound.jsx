// /src/pages/NotFound/NotFound.jsx (بدون تصميم)

import React from 'react';
import { useNavigate } from 'react-router-dom';
// تم حذف: import "./notfound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      
      {/* رسالة الخطأ الرئيسية */}
      <h1 style={{ fontSize: '72px', color: '#ff4d4f' }}>
        404
      </h1>

      {/* نص التوضيح */}
      <p style={{ fontSize: '24px', color: '#555' }}>
        Sorry, the page you requested was not found.
      </p>

      {/* زر العودة (باستخدام <button> كما هو موصى به لإمكانية الوصول) */}
      <button
        onClick={() => navigate('/')} 
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#40a9ff', // لون أزرق جذاب
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Go to Home Page
      </button>

    </div>
  );
}

export default NotFound;
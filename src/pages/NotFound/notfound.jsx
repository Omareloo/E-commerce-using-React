import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NotFound() {
  const navigate = useNavigate();
  const {content} = useSelector((state) => state.lang);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      
      <h1 style={{ fontSize: '72px', color: '#ff4d4f' }}>
        404
      </h1>

      <p style={{ fontSize: '24px', color: '#555' }}>
        {content.pageNotFound}
      </p>

      <button
        onClick={() => navigate('/')} 
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#40a9ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        {content.goHome}      </button>

    </div>
  );
}

export default NotFound;
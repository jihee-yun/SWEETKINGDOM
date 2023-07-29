import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const accessToken = localStorage.getItem('accessToken');

  console.log(accessToken);
  // localStorage.removeItem('accessToken');
  // 로그인이 되어 있으면 해당 컴포넌트를 렌더링, 그렇지 않으면 로그인 페이지로 리다이렉트
  if (accessToken === null) {
    alert('접근할 수 없는 페이지입니다.');
    return <Navigate to="/" />;
  }
  return Component;
};

export default PrivateRoute;
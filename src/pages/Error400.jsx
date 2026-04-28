import React from 'react';
import ErrorPage from '../components/ErrorPage';

const Error400 = () => {
  return (
    <ErrorPage 
      errorCode="400" 
      errorDescription="Bad Request - Permintaan tidak dapat diproses oleh server" 
      errorImage="https://http.cat/400"
    />
  );
};

export default Error400;
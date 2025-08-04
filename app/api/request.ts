import axios from 'axios';

const request = axios.create({ 
  timeout: 15000, // 15초로 늘림
  headers: {
    'Content-Type': 'application/json',
  }
});

// 요청 인터셉터 추가
request.interceptors.request.use(
  (config) => {
    console.log(`[REQUEST] ${config.method?.toUpperCase()} ${config.url} 시작: ${new Date().toISOString()}`);
    return config;
  },
  (error) => {
    console.error(`[REQUEST] 요청 에러:`, error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
request.interceptors.response.use(
  (response) => {
    console.log(`[REQUEST] ${response.config.method?.toUpperCase()} ${response.config.url} 성공: ${new Date().toISOString()}`);
    return response;
  },
  (error) => {
    console.error(`[REQUEST] 응답 에러:`, error.response?.data || error.message);
    if (error.code === 'ECONNABORTED') {
      console.error(`[REQUEST] 타임아웃 발생`);
    }
    return Promise.reject(error);
  }
);

export default request;
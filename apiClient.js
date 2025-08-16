// handles all authenticated API calls and emits forceLogout on auth errors
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// throttle repeated forceLogout dispatches when many requests fail together
let logoutDispatched = false;
const resetDispatchFlag = () => {
  setTimeout(() => {
    logoutDispatched = false;
  }, 2000);
};

apiClient.interceptors.response.use(
  response => response,
  async (error) => {
    const status = error.response?.status;
    const message = (error.response?.data?.message || '').toString().toLowerCase();

    const shouldForceLogout =
      status === 401 &&
      (message.includes('expired') || message.includes('refresh token is missing'));

    if (shouldForceLogout && !logoutDispatched) {
      logoutDispatched = true;
      window.dispatchEvent(new Event('forceLogout'));
      resetDispatchFlag();
    }

    return Promise.reject(error);
  }
);

export default apiClient;

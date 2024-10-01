import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://127.0.0.1:9527',
});

httpClient.interceptors.response.use((response) => {
  return delayPromise(response);
});

export default httpClient;

export function delayPromise<T>(data: T): Promise<T> {
  const random = Math.floor(Math.random() * 1000) + 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, random);
  });
}

import { request } from '@@/exports';

const BASE_URL = '/server/api/ims';
// export function  getHeader() {
//   const token = this.getToken();
//   return {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json"
//   }
// }
//
// export function getToken() {
//   const encryptedToken = localStorage.getItem("token");
//   if (!encryptedToken) return null;
//   return this.decrypt(encryptedToken);
// }

export async function registerUser(options?: { [key: string]: any }) {
  return request<API.sysCurrent>(`${BASE_URL}/api/users/current`, {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMUBxcS5jb20iLCJpYXQiOjE3MzMxMTA5ODcsImV4cCI6MTc0ODY2Mjk4N30.Sa5Fg6ElMViT6DLTK4mwwTl-TloDMLU_8fjHG3t4PTw',
    },
    ...(options || {}),
  });
}

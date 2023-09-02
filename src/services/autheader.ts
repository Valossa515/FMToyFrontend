export default function authHeader() {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  if (user && user.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}` };
    // Se você estiver usando um back-end Node.js Express, pode usar o seguinte:
    // return { 'x-access-token': user.accessToken };
  } else {
    return { Authorization: '' };
    // Se você estiver usando um back-end Node.js Express, pode usar o seguinte:
    // return { 'x-access-token': null };
  }
}

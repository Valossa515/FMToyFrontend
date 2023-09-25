export const authHeader = (): { Authorization: string } | null => {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return null;
};

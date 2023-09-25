import axios from "axios";
import { EmailDTO } from "models/email";


const API_URL = "http://localhost:8080/";

interface LoginResponse {
  token: string;
  id: number;
}


export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "auth/signup", {
    username,
    email,
    password,
  });
};
export const login = async (username: string, password: string): Promise<LoginResponse | null> => {
  try {
    const response = await axios.post(API_URL + 'auth/signin', {
      username,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.data) {
      throw new Error('Failed to authenticate');
    }

    const { token, id, email, username: user, roles } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('userId', String(id));
    localStorage.setItem('email', String(email));
    localStorage.setItem('user', String(user));
    localStorage.setItem('roles', String(roles));
    return {
      token,
      id,
    };
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};


export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
  localStorage.removeItem("user");
  localStorage.removeItem("roles");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr){
    return JSON.parse(userStr);
  } 
  return null;
};

export const sendNewPassword = async(email: string) => {
  const data: EmailDTO = { email };
  await axios.post(API_URL + 'auth/forgot', data);
};


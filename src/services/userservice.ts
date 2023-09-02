import axios from 'axios';
import { BACKEND_URL } from 'utils/system';
import authHeader from 'services/autheader';


function getPublicContent() {
  return axios.get(BACKEND_URL + 'all');
}

function getUserBoard() {
  return axios.get(BACKEND_URL + 'user', { headers: authHeader() });
}

function getModeratorBoard() {
  return axios.get(BACKEND_URL + 'mod', { headers: authHeader() });
}

function getAdminBoard() {
  return axios.get(BACKEND_URL + 'admin', { headers: authHeader() });
}

export default { getPublicContent, getUserBoard, getModeratorBoard, getAdminBoard };

import axios from 'axios';
import { TeamModel } from '../types/dashboard/teams';

const API_BASE_URL = 'http://localhost:3000/teams';

export const getTeams = async () => {
  try {
    const response = await axios.get<TeamModel[]>(API_BASE_URL);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching teams.');
  }
};

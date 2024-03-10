import axios from 'axios';
import { StaffModel } from '../types/dashboard/staff';

const API_BASE_URL = 'http://localhost:3000/staff';

export const searchStaff = async (searchStr: string) => {
  try {
    const response = await axios.get<StaffModel[]>(
      `${API_BASE_URL}?search=${searchStr}`,
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching staff.');
  }
};

import axios from 'axios';
import { StaffCountGetData, StaffModel } from '../types/dashboard/staff';

const API_BASE_URL = 'http://localhost:3000/staff';

export const searchStaff = async (searchStr: string) => {
  try {
    const response = await axios.get<StaffModel[]>(
      `${API_BASE_URL}?search=${searchStr}`,
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching staff.');
  }
};

export const getStaffCountForTeam = async (teamName: string) => {
  try {
    const response = await axios.get<StaffCountGetData>(
      `${API_BASE_URL}/count?team=${teamName}`,
    );

    return response.data;
  } catch (err) {
    console.error(`Error fetching redemption staff count.`);
  }
};

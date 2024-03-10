import axios from 'axios';
import { TeamModel } from '../types/dashboard/teams';
import { RedeemPutData } from '../types/dashboard/redemption';

const API_BASE_URL = 'http://localhost:3000/teams';

export const getTeams = async () => {
  try {
    const response = await axios.get<TeamModel[]>(API_BASE_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching teams.');
  }
};

export const getTeam = async (teamName: string) => {
  try {
    const response = await axios.get<TeamModel>(`${API_BASE_URL}/${teamName}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(`Error fetching team ${teamName}`);
  }
};

export const getRedemptionHistory = async (count: number, offset: number) => {
  try {
    const response = await axios.get<TeamModel[]>(
      `${API_BASE_URL}/redemption-hist?count=${count}&offset=${offset}`,
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(`Error fetching redemption history.`);
  }
};

export const reedemForTeam = async (teamName: string, collectorId: string) => {
  try {
    const putData: RedeemPutData = {
      collectorId,
    };
    const response = await axios.put<TeamModel>(
      `${API_BASE_URL}/${teamName}/redeem`,
      putData,
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

import axiosClient from "./axiosInstance";


export interface RandevuType {
       id?: string;
       name: string;
       staff: string;
       gsm?: string;
       date: string;
       hour?: string;
     }

export const fetchAppointments = async() => {
       const client = axiosClient();
       const response = await client.get<RandevuType[]>("/appointments") 
       return response.data;
}

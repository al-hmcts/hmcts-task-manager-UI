import { statusEnum } from "models/statusEnum";
export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: statusEnum
  due_date: string
  created_date: string; 
}

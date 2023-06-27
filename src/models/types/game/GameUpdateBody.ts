import { User } from "../../game";

export type GameUpdateBody = {
  id: number;
  code: string;
  user1: User;
  user2: User;
  board: any;
  winner?: string;
};

import { Permission } from './Permission';

export class User {
    _id: string;
    firstName: string;
    lastName: string;
    email:  string;
    password: string;
    phone:  string;
    gender: string;
    country: string;
    city: string;
    postCode: string;
    status: Boolean;
    picture: string;
    homes: string[];
    rooms: Permission[];
  }

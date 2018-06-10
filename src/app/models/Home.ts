import {Room} from './Room';
import { User } from './User';
export class Home {
    _id: string;
    name: string;
    address:  string;
    email: string;
    telephone: string;
    country:  string;
    long: string;
    lat: string;
    picture: string;
    owner: User;
    servers: string[];
    rooms: Room[];
    permission: string;
}

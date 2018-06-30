import {Room} from './Room';
import { User } from './User';
import { Rule } from './Rule';
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
    rules: Rule[];
}

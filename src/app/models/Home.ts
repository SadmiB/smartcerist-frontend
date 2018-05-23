import {Room} from './Room';
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
    owner: string;
    servers: string[];
    rooms: Room[];
    permission: string;
}

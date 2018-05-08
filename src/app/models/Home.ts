import {Room} from './Room';
export class Home{
    _id: String;
    name: String;
    address:  String;
    email: String;
    telephone: String;
    country:  String;
    long: String;
    lat: String;
    picture: String;
    owner: String;
    servers: String[];
    rooms: Room[];
}
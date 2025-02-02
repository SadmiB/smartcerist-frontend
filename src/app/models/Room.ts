import {Permission} from './Permission';
import { EventObj } from './EventObj';
export class Room {
    _id: string;
    name: string;
    type:  string;
    objects: string[];
    users: string[];
    cameras: string[];
    events: EventObj[];
}

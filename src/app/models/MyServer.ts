import { Beacon } from './Beacon';
import { Camera } from './Camera';

export class MyServer {
    _id: string;
    name: string;
    ipv6: string;
    lipv6: string;
    ipv4: string;
    lipv4: string;
    beacons: [Beacon];
    cameras: [Camera];
}

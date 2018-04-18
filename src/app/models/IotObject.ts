import { ObjectsTypes } from './ObjectsTypes';

export class IotObject {
    id: string;
    name: string;
    path: string;
    type: ObjectsTypes;
    ipv6: string;
    server_ipv6: string;
    server_lipv6: string;
    server_ipv4: string;
    server_lipv4: string;
    status: string;
    mesure: string;
}

import { CameraHistory } from './CameraHistory';

export class Camera {
    _id: string;
    name: string;
    ipv4: string;
    ipv6: string;
    port: Number;
    username: string;
    password: string;
    server_ip4: string;
    server_ip6: string;
    canvas: any;
    client: any;
    player: any;
    mainStream: string;
    subStream: string;
    ddns: string;
    history: [CameraHistory];
}

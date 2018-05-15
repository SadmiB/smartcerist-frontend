import { CameraHistory } from './CameraHistory';

export class Camera {
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
    main_stream: string;
    sub_stream: string;
    ddns: string;
    history: [CameraHistory];
}

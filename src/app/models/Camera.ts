import { CameraHistory } from './CameraHistory';

export class Camera {
    name: string;
    ipv4: string;
    ipv6: string;
    port: Number;
    username: string;
    password: string;
    main_stream: string;
    sub_stream: string;
    ddns: string;
    history:[CameraHistory];
}

import * as io from 'socket.io-client';
export class Consts {
    static readonly BASE_URL: string = 'http://localhost:3000';
    static readonly socket = io(Consts.BASE_URL);
}



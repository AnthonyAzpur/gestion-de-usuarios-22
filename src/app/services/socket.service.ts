import { Injectable } from '@angular/core';
import { chatNovaWS } from '../app.module';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: chatNovaWS){}

  connect(user: any){
    this.socket.emptyConfig = {
      url: 'http://localhost:3000',
      options: {
        transports: ['websocket'],
        upgrade: false,
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionDelayMax: 1000,
        autoConnect: false,
        query: {
          p_usr_id: user.usr_id,
          p_usr_ustype: user.usr_ustype,
          p_usr_pimage: user.usr_pimage,
          p_usr_funame: user.usr_funame,
          p_usr_status: user.usr_status,
          p_usr_correo: user.usr_correo,
          p_usr_softfr: user.usr_softfr
        }
      }      
    }

    this.socket.ioSocket.io.opts.query = {
      p_usr_id: user.usr_id,
      p_usr_ustype: user.usr_ustype,
      p_usr_pimage: user.usr_pimage,
      p_usr_funame: user.usr_funame,
      p_usr_status: user.usr_status,
      p_usr_correo: user.usr_correo,
      p_usr_softfr: user.usr_softfr
    }

    return this.socket.connect();
  }

  disconnect(){
    return this.socket.disconnect();
  }
}

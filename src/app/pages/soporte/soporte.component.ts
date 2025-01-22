import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.css']
})
export class SoporteComponent implements OnInit {

  constructor(private appComponent: AppComponent, private socketService: SocketService){
    this.appComponent.login = false;
  }

  ngOnInit(): void {
    this.socketService.connect({
      usr_id: 1,
      usr_ustype: 'Cliente',
      usr_pimage: 'https://i.pinimg.com/originals/3f/8c/6f/3f8c6f8d1f0d5a8b4a0b0d0e0c6b6b2b.jpg',
      usr_funame: 'Harry Arroyo',
      usr_status: 'Active',
      usr_correo: 'harroyop@gmail.com',
      usr_softfr: 'ERP'
    });
  }

}

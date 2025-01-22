import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-perfil-objeto',
  templateUrl: './perfil-objeto.component.html',
  styleUrls: ['./perfil-objeto.component.css']
})
export class PerfilObjetoComponent implements OnInit {

  constructor(private appComponent: AppComponent) {
    this.appComponent.login = false;
  }

  ngOnInit(): void {
  }

}

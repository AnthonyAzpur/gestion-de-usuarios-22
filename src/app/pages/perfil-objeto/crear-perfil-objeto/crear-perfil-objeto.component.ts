import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { isNil, remove, reverse } from 'lodash';
import { CrearPerfilObjetoService } from './crear-perfil-objeto.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-crear-perfil-objeto',
  templateUrl: './crear-perfil-objeto.component.html',
  styleUrls: ['./crear-perfil-objeto.component.css'],
  providers: [
    CrearPerfilObjetoService
  ]
})
export class CrearPerfilObjetoComponent implements OnInit {

  items!: TreeviewItem[];
  p_apf_id: number = 5;
  array: any = [];
  
  //variablesp ara formulario tal
  


  values!: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });

  constructor(private appComponent: AppComponent, private serviceObjetos: CrearPerfilObjetoService, private service: UsersService) {
    this.appComponent.login = false;
  }

  ngOnInit(): void {
    // this.items = this.service.getBooks();
    this.listarObjetos();

  }

  listarObjetos() {
    let post = {
      p_apf_id: this.p_apf_id,
    };
    this.service.listarAplicacionPerfilObjeto(post).subscribe({
      next: (data: any) => {
        console.log(data);
        this.items = this.serviceObjetos.getObjetos(data);
        console.log(this.items);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onFilterChange(value: string): void {
    console.log('filter:', value);
  }

  guardar() {


    this.values.forEach((item: any) => {
      this.array.push({ obj_id: item });
    });
    console.log(JSON.stringify(this.array))
  }

}

import { Injectable } from '@angular/core';
import { UsersService } from '../services/users.service';
import { post } from 'jquery';

@Injectable({
    providedIn: 'root'
})
export class PersonaUtils {

    constructor(private service: UsersService) {
    }

    validarBusquedaPersona(data: any) {
        let per_id = 10;
        let postListar = {
            p_tdi_id: data['p_tdi_id'],
            p_per_numdoi: data['p_per_numdoi']
        }

        this.service.listarPersona(postListar).subscribe({
            next: (data: any) => {
                console.log(data);
                // if (data[0]) {
                  return   per_id = data[0].per_id;
                // } 
            },
            error: (error: any) => {

                console.error(error);
            }
        });
        // return per_id;
    }

    // guardarPersona(data: any): number {
    //     this.service.guardarPersona(data).subscribe({
    //         next: (result: any) => {
    //             let resultService = result[0];
    //             if (resultService.hasOwnProperty('error')) {
    //                 if (resultService.error === 0) {
    //                     return resultService.id;
    //                 }
    //             } else {
    //                 console.log("Ocurrió un error");
    //             }
    //         },
    //         error: (error: any) => {
    //             console.error(error);
    //         }
    //     });
    // }

}
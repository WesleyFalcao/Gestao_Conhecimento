import { Injectable } from "@angular/core";
import { UsuarioParams } from "src/app/models/usuario/usuario.model";
import { UsuarioRepository } from "src/app/repositories/usuario.repository";

import { DataService } from "src/app/services/data.service";

@Injectable({
    providedIn: "root"
})
export class UsuariosService {

    constructor(
        private usuariosRepository : UsuarioRepository
        
    ) {    
    }

    Get_Usuarios(param: UsuarioParams) {
        return this.usuariosRepository.Get_Usuarios(param)
    }
}

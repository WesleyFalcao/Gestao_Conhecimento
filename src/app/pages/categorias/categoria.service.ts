import { Injectable } from "@angular/core";
import { UsuarioParams } from "src/app/models/usuario/usuario.model";
import { CategoriaRepository } from "src/app/repositories/categoria.repository";
import { UsuarioRepository } from "src/app/repositories/usuario.repository";

import { DataService } from "src/app/services/data.service";

@Injectable({
    providedIn: "root"
})
export class CategoriaService {

    constructor(private categoriaRepository: CategoriaRepository) { }
    
    Set_Category(nm_Categoria){

        if(nm_Categoria == null || nm_Categoria == ""){
            return false
        } 
        return this.categoriaRepository.Set_Category(nm_Categoria)
    }
}

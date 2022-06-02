import { Injectable } from "@angular/core";
import { CategoriaRepository } from "src/app/repositories/categoria.repository";

@Injectable({
    providedIn: "root"
})
export class CategoriaService {

    constructor(private categoriaRepository: CategoriaRepository) { }
    
    Get_Categories_List() {
        return this.categoriaRepository.Get_Categories_List()
    }

    Get_Category(param){
        return this.categoriaRepository.Get_Category(param)
    }

    Set_Add_Category(nm_Categoria){

        if(nm_Categoria == null || nm_Categoria == ""){
            return false
        } 
        return this.categoriaRepository.Set_Add_Category(nm_Categoria)
    }

    Set_Edit_Category(nm_Categoria, cd_Id_Param){
        if(nm_Categoria == "" || nm_Categoria == null || nm_Categoria == undefined){
            return false
        }
        return this.categoriaRepository.Set_Edit_Category(nm_Categoria, cd_Id_Param)
    }
}

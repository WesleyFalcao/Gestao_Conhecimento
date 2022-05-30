import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class CategoriaQuery {

  constructor(
  ) {
  }

  Set_Category(){
    return `
    mutation ($nm_categoria: String) {
      insert_categorias(objects: {nm_categoria: $nm_categoria}) {
        returning {
          cd_categoria
          nm_categoria
        }
      }
    }   
    `
  }
}

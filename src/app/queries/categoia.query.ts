import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class CategoriaQuery {

  constructor(
  ) {
  }

  Get_Category(){
    return `
    query ($cd_categoria: Int) {
      categorias(where: {cd_categoria: {_eq: $cd_categoria}}) {
        nm_categoria
        cd_categoria
      }
    }
    `
  }

  Get_Categories_List(){
    return `
    {
      categorias(order_by: {nm_categoria: asc}) {
        id: cd_categoria
        nome: nm_categoria
      }
    }
    `
  }

  Set_Add_Category(){
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

  Set_Edit_Category(){
    return `
    mutation ($nm_categoria: String, $cd_categoria: Int) {
      update_categorias(_set: {nm_categoria: $nm_categoria}, where: {cd_categoria: {_eq: $cd_categoria}}) {
        returning {
          cd_categoria
          nm_categoria
        }
      }
    }
    
    `
  }

}

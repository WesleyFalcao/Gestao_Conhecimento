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

  Get_Categories_Paginator(){
    return `
    query ($limit: Int, $offset: Int) {
      categorias(order_by: {nm_categoria: asc}, limit: $limit, offset: $offset) {
        id: cd_categoria
        nome: nm_categoria
      }
      categorias_aggregate {
        aggregate {
          count
        }
      }
    }    
    `
  }

  Get_Categories_List(){
    return `
    {
      categorias(order_by: {nr_ordem: asc, nm_categoria: asc, }) {
        id: cd_categoria
        nome: nm_categoria
      }
    }    
    `
  }

  Get_Categories_And_Icons(){
    return `
    {
      categorias(order_by: {nr_ordem: asc}) {
        nm_categoria
        cd_categoria
        nr_ordem
        files {
          nm_file
          cd_categoria
        }
      }
    }
    `
  }
  
  Get_Category_And_Icon(){
    return `
    query ($cd_categoria: Int){
      categorias(where: {cd_categoria: {_eq: $cd_categoria}}) {
        nm_categoria
        cd_categoria
        nr_ordem
        files {
          nm_file
          cd_categoria
        }
      }
    }
    `
  }

  Set_Add_Icon() {
    return `
    mutation ($nm_file: String, $cd_categoria: Int) {
      insert_files(objects: {nm_file: $nm_file, cd_categoria: $cd_categoria}) {
        affected_rows
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

  Set_Delete_Icon(){
    return `
    mutation ($cd_categoria: Int) {
      delete_files(where: {cd_categoria: {_eq: $cd_categoria}}) {
        affected_rows
      }
    }
    `
  }
}

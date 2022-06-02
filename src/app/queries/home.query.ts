import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class HomeQuery {

  constructor(
  ) {
  }

  Get_Conteudo() {
    return `
      {
        categorias(order_by: {nm_categoria: asc}) {
          cd_categoria
          nm_categoria
        }
      }     
    `
  }
}

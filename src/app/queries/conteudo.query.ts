import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class ConteudoQuery {

  constructor(
  ) {
  }

  Get_Conteudo_Listagem() {
    return `
    query MyQuery {
      conteudos_aggregate {
        aggregate {
          count
        }
        nodes {
          cd_conteudo
          ds_conteudo
          ds_link
          nm_categoria
          nm_titulo
        }
      }
    }       
    `
  }

  Get_Conteudo(){
    return `
    `
  }

  Set_Add_Conteudo(){
    return `
    mutation ($nm_titulo: String, $ds_conteudo: String, $ds_link: String, $nm_categoria: String) {
      insert_conteudos(objects: {nm_titulo: $nm_titulo, ds_conteudo: $ds_conteudo, ds_link: $ds_link, nm_categoria: $nm_categoria}) {
        returning {
          cd_conteudo
          ds_conteudo
          ds_link
          nm_categoria
          nm_titulo
        }
      }
    }
    `
  }
}

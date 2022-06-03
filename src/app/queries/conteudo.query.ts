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
      conteudos_aggregate(order_by: {nm_titulo: asc}) {
        aggregate {
          count
        }
        nodes {
          cd_conteudo
          ds_conteudo
          ds_link
          nm_titulo
          categoria {
            nm_categoria
          }
        }
      }
    }           
    `
  }

  Get_Conteudo_Edit(){
    return `
    query ($cd_conteudo: Int) {
      conteudos(where: {cd_conteudo: {_eq: $cd_conteudo}}) {
        cd_categoria
        cd_conteudo
        ds_conteudo
        ds_link
        nm_titulo
        categoria {
          id:cd_categoria
          nome:nm_categoria
        }
      }
    }    
    `
  }
  
  Get_Conteudos(){
    return `
    query ($cd_conteudo: Int) {
      conteudos(where: {cd_categoria: {_eq: $cd_conteudo}}) {
        cd_categoria
        cd_conteudo
        ds_conteudo
        ds_link
        nm_titulo
        categoria {
          id:cd_categoria
          nome:nm_categoria
        }
      }
    }    
    `
  }

  Set_Add_Conteudo(){
    return `
    mutation ($nm_titulo: String, $ds_conteudo: String, $ds_link: String, $cd_categoria: Int) {
      insert_conteudos(objects: {nm_titulo: $nm_titulo, ds_conteudo: $ds_conteudo, ds_link: $ds_link, cd_categoria: $cd_categoria}) {
        returning {
          categoria {
            nm_categoria
            cd_categoria
          }
          nm_titulo
          ds_link
          ds_conteudo
          cd_conteudo
          cd_categoria
        }
      }
    }    
    `
  }

  Set_Edit_User(){
    return `
    mutation ($cd_conteudo: Int, $nm_titulo: String, $ds_conteudo: String, $ds_link: String, $cd_categoria: Int) {
      update_conteudos(where: {cd_conteudo: {_eq: $cd_conteudo}}, _set: {nm_titulo: $nm_titulo, ds_conteudo: $ds_conteudo, ds_link: $ds_link, cd_categoria: $cd_categoria}) {
        returning {
          cd_categoria
          cd_conteudo
          ds_conteudo
          ds_link
          nm_titulo
          categoria {
            cd_categoria
            nm_categoria
          }
        }
      }
    }    
    `
  }

  Set_Delete_Conteudo(){
    return `
    mutation ($cd_conteudo: Int) {
      delete_conteudos(where: {cd_conteudo: {_eq: $cd_conteudo}}) {
        returning {
          categoria {
            cd_categoria
            nm_categoria
          }
          cd_categoria
          cd_conteudo
          ds_conteudo
          ds_link
          nm_titulo
        }
      }
    }
    `
  }

  Set_Gravar_Dados(){
    return `
    mutation ($cd_conteudo: Int, $nm_usuario: String) {
      insert_acessos_one(object: {cd_conteudo: $cd_conteudo, nm_usuario: $nm_usuario}) {
        conteudo {
          cd_categoria
          cd_conteudo
          ds_conteudo
          ds_link
          nm_titulo
          categoria {
            cd_categoria
            nm_categoria
          }
        }
      }
    }
    `
  }

  Set_Favorite(){
    return `
    `
  }

  Set_Disfavor(){
    return `
    `
  }
}

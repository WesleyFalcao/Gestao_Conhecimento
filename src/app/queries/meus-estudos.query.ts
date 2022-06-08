import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class MeusEstudosQuery {

  constructor(
  ) {
  }

  Get_My_Studies() {
    return `
    query {
      estudos {
        conteudo {
          cd_conteudo
          ds_conteudo
          ds_link
          nm_titulo
          categoria {
            nm_categoria
            cd_categoria
          }
          cd_categoria
        }
      }
    }
    `
  }

  Get_Cd_Studies(){
    return `
    query MyQuery {
      estudos {
        conteudo {
          cd_conteudo
        }
      }
    }    
    `
  }

  Set_My_Studies() {
    return `
    mutation ($cd_conteudo: Int) {
      insert_estudos(objects: {cd_conteudo: $cd_conteudo}) {
        affected_rows
      }
    }        
    `
  }

  Delete_My_Study(){
    return `
    mutation ($cd_conteudo: Int) {
      delete_estudos(where: {conteudo: {cd_conteudo: {_eq: $cd_conteudo}}}) {
        affected_rows
        returning {
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
    }
    
    `
  }
}

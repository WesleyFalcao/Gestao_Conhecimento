import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class MeusEstudosQuery {

  constructor(
  ) {
  }

  Get_My_Favorites() {
    return `
    query {
      favoritos {
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

  Get_My_Studies() {
    return `
    {
      acessos(where: {dt_exclusao: {_is_null: true}, _and: {conteudo: {dt_exclusao: {_is_null: true}}}}) {
        conteudo {
          cd_categoria
          cd_conteudo
          ds_conteudo
          ds_link
          nm_titulo
          dt_exclusao
          categoria {
            nm_categoria
          }
        }
        dt_acesso
        cd_usuario
        usuario {
          cd_login
        }
      }
      acessos_aggregate {
        aggregate {
          count
        }
      }
    }
    
    `
  }

  Get_My_Studies_Pagination() {
    return `
    query ($limit: Int, $offset: Int) {
      acessos(limit: $limit, offset: $offset, where: {conteudo: {dt_exclusao: {_is_null: true}}}) {
        conteudo {
          cd_categoria
          cd_conteudo
          ds_conteudo
          ds_link
          nm_titulo
          dt_exclusao
          categoria {
            nm_categoria
          }
        }
        dt_acesso
        cd_conteudo_acesso
        cd_usuario
        usuario {
          cd_login
        }
      }
      acessos_aggregate {
        aggregate {
          count
        }
      }
    }       
    `
  }

  Get_All_Access(){
    return `
    query {
      acessos(where: {conteudo: {dt_exclusao: {_is_null: true}}}) {
        conteudo {
          cd_categoria
          cd_conteudo
          ds_conteudo
          ds_link
          nm_titulo
          dt_exclusao
          categoria {
            nm_categoria
          }
        }
        dt_acesso
        cd_conteudo_acesso
        cd_usuario
        usuario {
          cd_login
        }
      }
      acessos_aggregate {
        aggregate {
          count
        }
      }
    }
    ` 
  }

  Set_Clear_My_Studies() {
    return `
    mutation ($data: date, $cd_usuario: Int) {
      update_acessos(where: {cd_usuario: {_eq: $cd_usuario}}, _set: {dt_exclusao: $data}) {
        affected_rows
      }
    }    
    `
  }

  Set_My_Studies() {
    return `
    mutation ($cd_conteudo: Int) {
      insert_favoritos(objects: {cd_conteudo: $cd_conteudo}) {
        affected_rows
      }
    }        
    `
  }

  Delete_My_Study() {
    return `
    mutation ($cd_conteudo: Int) {
      delete_favoritos(where: {conteudo: {cd_conteudo: {_eq: $cd_conteudo}}}) {
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

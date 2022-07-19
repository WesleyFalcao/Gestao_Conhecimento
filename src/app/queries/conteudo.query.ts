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
    query ($limit: Int, $offset: Int) {
      conteudos(order_by: {nm_titulo: asc}, offset: $offset, limit: $limit) {
        nm_titulo
        ds_link
        ds_conteudo
        cd_conteudo
        cd_categoria
        categoria {
          cd_categoria
          nm_categoria
        }
      }
      conteudos_aggregate {
        aggregate {
          count
        }
      }
    }           
    `
  }

  Get_Conteudo_Meus_Estudos() {
    return `
    query ($cd_conteudo: Int) {
      conteudos(where: {cd_conteudo: {_eq: $cd_conteudo}, _and: {dt_exclusao: {_is_null: true}}}) {
        cd_categoria
        cd_conteudo
        ds_conteudo
        ds_link
        nm_titulo
        dt_exclusao
        categoria {
          id: cd_categoria
          nome: nm_categoria
        }
      }
    }
    `
  }

  Get_Conteudos_Filter() {
    return `
    query ($where: conteudos_bool_exp, $limit: Int, $offset: Int) {
      conteudos(where: $where, limit: $limit, offset: $offset, order_by: {nm_titulo: asc}) {
        categoria {
          nm_categoria
        }
        cd_conteudo
        ds_conteudo
        ds_link
        nm_titulo
      }
      conteudos_aggregate(where: $where) {
        aggregate {
          count
        }
      }
    }                 
    `
  }

  Get_Conteudos_Filter_Report() {
    return `
    query ($where: acessos_bool_exp, $limit: Int, $offset: Int) {
      acessos(where: $where, limit: $limit, offset: $offset) {
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
      acessos_aggregate(where: $where) {
        aggregate {
          count
        }
      }
    }
    `
  }

  Get_Conteudos_Report_Pagination() {
    return `
    query ($limit: Int, $offset: Int) {
      acessos(limit: $limit, offset: $offset) {
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
      acessos_aggregate{
        aggregate {
          count
        }
      }
    }
    `
  }

  Get_Conteudo_Edit() {
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

  Get_Conteudos() {
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

  Get_Sumary() {
    return `
    {
      sumario(order_by: {nm_titulo: asc}) {
        nm_titulo
        ds_conteudo:ds_descricao
      }
    }    
    `
  }

  Set_Sumary() {
    return `
    mutation ($ds_descricao: String, $nm_titulo: String ) {
      insert_sumario(objects: {ds_descricao: $ds_descricao, nm_titulo: $nm_titulo}) {
        affected_rows
      }
    }    
    `
  }

  Set_Add_Conteudo() {
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

  Set_Edit_User() {
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

  Set_Update_Conteudo() {
    return `
    mutation ($cd_conteudo: Int, $dt_exclusao: date) {
      update_conteudos(where: {cd_conteudo: {_eq: $cd_conteudo}}, _set: {dt_exclusao:  $dt_exclusao}) {
        affected_rows
      }
    }
    `
  }

  Set_Gravar_Dados() {
    return `
    mutation ($cd_conteudo: Int, $cd_usuario: Int) {
      insert_acessos(objects: {cd_conteudo: $cd_conteudo, cd_usuario: $cd_usuario}) {
        returning {
          cd_usuario
        }
      }
    }    
    `
  }
}

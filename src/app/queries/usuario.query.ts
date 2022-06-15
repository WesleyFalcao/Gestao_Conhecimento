import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class UsuarioQuery {

  constructor(
  ) {
  }

  Get_Usuarios_Listagem() {
    return `
    query {
      usuarios_aggregate(order_by: {nm_usuario: asc}) {
        aggregate {
          count
        }
        nodes {
          nm_usuario
          dt_bloqueio
          cd_usuario
          cd_perfil
          cd_login
          b_login_ad
          perfil {
            role
            nm_perfil
            cd_perfil
          }
        }
      }
    }
    `
  }

  Get_Usuario(){
    return `
    query ($cd_usuario: Int) {
      usuarios(where: {cd_usuario: {_eq: $cd_usuario}}) {
        b_login_ad
        cd_login
        cd_perfil
        cd_usuario
        dt_bloqueio
        nm_usuario
        perfil {
          cd_perfil
          nm_perfil
          role
        }
      }
    }
       
    `
  }

  Get_Perfil_Usuario() {
    return `
    query MyQuery {
      perfis {
        nome:nm_perfil
        id:cd_perfil
      }
    }    
    `
  }

  Get_Usuarios_Listagem_Paginacao() {
    return `
    query ($limit: Int, $offset: Int) {
      usuarios(order_by: {nm_usuario: asc}, limit: $limit, offset: $offset) {
        nm_usuario
        dt_bloqueio
        cd_usuario
        cd_perfil
        cd_login
        b_login_ad
        perfil {
          role
          nm_perfil
          cd_perfil
        }
      }
      usuarios_aggregate {
        aggregate {
          count
        }
      }
    }              
    `
  }

  Get_Usuarios_Filter(){
    return `
    query ($where: usuarios_bool_exp, $limit: Int, $offset: Int) {
      usuarios(where: $where, limit: $limit, offset: $offset) {
        perfil {
          role
          nm_perfil
          cd_perfil
        }
        nm_usuario
        dt_bloqueio
        cd_usuario
        cd_perfil
        cd_login
        b_login_ad
      }
      usuarios_aggregate {
        aggregate {
          count
        }
      }
    }
    `
  }

  Set_Add_Usuario() {
    return `
    mutation ($nm_usuario: String,  $b_login_ad: Boolean, $cd_login: String, $cd_perfil: Int, $ds_senha: String ) {
      insert_usuarios(objects: {nm_usuario: $nm_usuario, ds_senha: $ds_senha, b_login_ad: $b_login_ad, cd_login: $cd_login, cd_perfil: $cd_perfil}) {
        returning {
          perfil {
            cd_perfil
            nm_perfil
            role
          }
          nm_usuario
          dt_bloqueio
          cd_usuario
          cd_perfil
          cd_login
          b_login_ad
        }
      }
    }    
    `
  }

  Set_Edit_Usuario(){
    return `
    mutation ($cd_usuario: Int, $b_login_ad: Boolean, $cd_login: String, $cd_perfil: Int, $ds_senha: String, $dt_bloqueio: date) {
      update_usuarios(where: {cd_usuario: {_eq: $cd_usuario}}, _set: {b_login_ad: $b_login_ad, cd_login: $cd_login, cd_perfil: $cd_perfil, ds_senha: $ds_senha, dt_bloqueio: $dt_bloqueio}) {
        returning {
          perfil {
            role
            nm_perfil
            cd_perfil
          }
          cd_usuario
          cd_perfil
          dt_bloqueio
          cd_login
          b_login_ad
        }
      }
    }    
    `
  }
}

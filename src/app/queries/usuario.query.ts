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
}

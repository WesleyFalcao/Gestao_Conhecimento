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
    query MyQuery {
      usuarios{
        b_login_ad
        cd_login
        cd_perfil
        cd_usuario
        ds_senha
        dt_bloqueio
        nm_usuario
      }
    }
    `
  }
}

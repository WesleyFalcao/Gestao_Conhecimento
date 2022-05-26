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
    {
      usuarios {
        b_login_ad
        cd_login
        cd_perfil
        cd_usuario
        dt_bloqueio
        nm_usuario
        perfil {
          role
        }
      }
    }
    `
  }
}

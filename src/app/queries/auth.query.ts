import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthQuery {

  constructor(
  ) {
  }

  Set_Login() {
    return {
      header: [{
        field: '$params',
        type: 'LoginInput!'
      },],
      query: `login(params: $params) {
                data {
                  subcontratos {
                    cd_Grupo_Empresa
                    cd_Subcontrato
                    nm_Razao
                    nm_Fantasia
                    nm_Plano
                    sn_Administradora
                    sn_Protocolo_RN
                    sn_Bloqueado
                    cd_Cliente
                    dt_Limite_Exclusao
                    cd_Perfil
                  }
                  ds_Access_Token
                }
                motivos_Critica {
                  criticas
                  propriedade
                }
                status
                statusCode
              }`
    }
  }
}

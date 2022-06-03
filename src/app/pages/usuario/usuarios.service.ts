import { Injectable } from "@angular/core";
import { UsuarioRepository } from "src/app/repositories/usuario.repository";
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
    providedIn: "root"
})
export class UsuariosService {

    constructor(
        private usuariosRepository : UsuarioRepository    
    ) {    
    }

    Get_Usuarios(param) {
        return this.usuariosRepository.Get_Usuarios(param)
    }

    Get_Usuario(param){
        return this.usuariosRepository.Get_Usuario(param)
    }

    Get_Perfil_Usuario(){
        return this.usuariosRepository.Get_Perfil_Usuario()
    }

    Set_Add_Usuario(param){
        if(param.b_login_ad == true && param.cd_login == null ){
            return false
        }
        if(param.b_login_ad == true && param.cd_login == undefined ){
            return false
        }
        if(param.b_login_ad == false && param.nm_usuario == "" ){
            return false
        }

        const md5 = new Md5();
        param.ds_senha = md5.appendStr(param.ds_senha).end()
       
        return this.usuariosRepository.Set_Add_Usuario(param)
    }

    Set_Edit_Usuario(objparam){
        if(objparam.b_login_ad == false && objparam.ds_senha == null){
            return false
        }
        if(objparam.b_login_ad == false && objparam.ds_senha == ""){
            return false
        }
        return this.usuariosRepository.Set_Edit_Usuario(objparam)
    }
}

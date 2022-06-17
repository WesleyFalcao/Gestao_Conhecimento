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

    Get_Usuarios_Filter(param, inputfilter){
        return this.usuariosRepository.Get_Usuarios_Filter(param, inputfilter)
    }

    Get_Usuario(param){
        return this.usuariosRepository.Get_Usuario(param)
    }

    Get_Perfil_Usuario(){
        return this.usuariosRepository.Get_Perfil_Usuario()
    }

    Set_Add_Usuario(param){
        
        if(param.b_login_ad == null || param.cd_login == null){
            return false
        }

        if(param.b_login_ad == false && param.cd_login == null){
            return false
        }

        if(param.b_login_ad == false && param.cd_login == ''){
            return false
        }

        if(param.ds_senha != null){
            const md5 = new Md5();
            param.ds_senha = md5.appendStr(param.ds_senha).end()
        }

        if(param.ds_senha == "" && param.cd_login == ""){
            return false
        }

        if(param.b_login_ad == true){
            param.ds_senha = null
        }
      
        return this.usuariosRepository.Set_Add_Usuario(param)
    }

    Set_Edit_Usuario(objparam){
        if(objparam.b_login_ad == false && objparam.ds_senha == null){
            delete objparam.ds_senha
        }
        if(objparam.nm_usuario == null || objparam.nm_usuario == ""){
            return false
        }
        if(objparam.b_login_ad == false && objparam.ds_senha == ""){
            return false
        }
        if(objparam.b_login_ad == true){
            objparam.ds_senha = undefined
        }
        if(objparam.ds_senha != null){
            const md5 = new Md5();
            objparam.ds_senha = md5.appendStr(objparam.ds_senha).end()
        }
        return this.usuariosRepository.Set_Edit_Usuario(objparam)
    }
}

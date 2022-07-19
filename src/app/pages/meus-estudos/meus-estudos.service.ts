import { Injectable } from "@angular/core";
import { MeusEstudosRepository } from "src/app/repositories/meus-estudos.repository";

@Injectable({
    providedIn: "root"
})
export class MeusEstudosService {

    constructor( private meuestudosRepository: MeusEstudosRepository ) {    
    }

    Get_My_Studies(){
        return this.meuestudosRepository.Get_My_Studies()
    }

    Get_My_Studies_Pagination(param){
        return this.meuestudosRepository.Get_My_Studies_Pagination(param)
    }

    Get_My_Favorites(){
        return this.meuestudosRepository.Get_My_Favorites()
    }

    Set_My_Study(estudo){
        return this.meuestudosRepository.Set_My_Study(estudo)
    }

    Set_Clear_My_Studies(user){
        return this.meuestudosRepository.Set_Clear_My_Studies(user)
    }

    Delete_My_Study(estudo){
        return this.meuestudosRepository.Delete_My_Study(estudo)
    }
}   

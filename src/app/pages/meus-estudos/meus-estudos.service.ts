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

    Get_Cd_Studies(){
        return this.meuestudosRepository.Get_Cd_Studies()
    }

    Set_My_Study(estudo){
        return this.meuestudosRepository.Set_My_Study(estudo)
    }

    Delete_My_Study(estudo){
        return this.meuestudosRepository.Delete_My_Study(estudo)
    }
}   

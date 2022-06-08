import { Injectable } from "@angular/core";
import { SugestoesRepository } from "src/app/repositories/sugestoes.repository";


@Injectable({
    providedIn: "root"
})
export class SugestoesService {

    constructor(
        private sugestoesRepository : SugestoesRepository  
    ) {    
    }

    Get_Suggestions_Admin() {
        return this.sugestoesRepository.Get_Suggestions_Admin()
    }

    Set_File_Suggestion(sugestao){
        return this.sugestoesRepository.Set_File_Suggestion(sugestao)
    }

    Get_Files_Suggestion(param){
        return this.sugestoesRepository.Get_Files_Suggestion(param)
    }

    Get_Filter_Suggestion(filtersugestao){
        return this.sugestoesRepository.Get_Filter_Suggestion(filtersugestao)
    }

    Set_Add_Suggestion(addsugestion){
        if(addsugestion.nm_Descricao == "" || addsugestion.nm_Descricao == null || addsugestion.nm_Titulo == "" || addsugestion.nm_Titulo == null){
            return false
        }
        return this.sugestoesRepository.Set_Add_Suggestion(addsugestion)
    }

    Set_Unarchive_Suggestion(cd_Sugestao){
        return this.sugestoesRepository.Set_Unarchive_Suggestion(cd_Sugestao)
    }
}

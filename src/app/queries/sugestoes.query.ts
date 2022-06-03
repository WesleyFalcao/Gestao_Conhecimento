import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class SugestoesQuery {

  constructor(
  ) {
  }

  Get_Suggestions_Admin() {
    return `
    {
      sugestoes_aggregate(where: {dt_arquivamento: {_is_null: true}}) {
        aggregate {
          count
        }
        nodes {
          nm_titulo
          dt_sugestao
          dt_arquivamento
          ds_sugestao
          cd_sugestao
        }
      }
    }    
    `
  }

  Get_Files_Suggestion(){
    return `
    query {
      sugestoes(where: {dt_arquivamento: {_is_null: false}}) {
        cd_sugestao
        cd_usuario
        dt_arquivamento
        dt_sugestao
        nm_titulo
        ds_sugestao
      }
    }    
    `
  }

  Set_File_Suggestion(){
    return `
    mutation ($data: date, $cd_sugestao: Int) {
      update_sugestoes(where: {cd_sugestao: {_eq: $cd_sugestao}}, _set: {dt_arquivamento: $data}) {
        returning {
          dt_arquivamento
          cd_sugestao
        }
      }
    }
    `
  }

  Filter_Suggestion(){
    return `
    
    `
  }

  Set_Add_Suggestion(){
    return `
    mutation ($titulo: String, $descricao: String, $cd_usuario: String ) {
      insert_sugestoes(objects: {nm_titulo: $titulo, ds_sugestao: $descricao, cd_usuario: $cd_usuario}) {
        returning {
          ds_sugestao
          nm_titulo
          cd_sugestao
          cd_usuario
        }
      }
    }    
    `
  }

  

  Set_Unarchive_Suggestion(){
    return `
    mutation ($cd_sugestao: Int) {
      update_sugestoes(where: {cd_sugestao: {_eq: $cd_sugestao}}, _set: {dt_arquivamento: null}) {
        returning {
          dt_arquivamento
          cd_sugestao
          cd_usuario
          nm_titulo
          dt_sugestao
          ds_sugestao
        }
      }
    }    
    `
  }
}

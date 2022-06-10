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
    query ($limit: Int, $offset: Int) {
      sugestoes(limit: $limit, offset: $offset, order_by: {cd_sugestao: asc}, where: {dt_arquivamento: {_is_null: false}}) {
        nm_titulo
        dt_sugestao
        dt_arquivamento
        cd_sugestao
        ds_sugestao
      }
      sugestoes_aggregate {
        aggregate {
          count
        }
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
    query ($where:sugestoes_bool_exp) {
      sugestoes(where: $where) {
        cd_sugestao
        ds_sugestao
        dt_arquivamento
        dt_sugestao
        nm_titulo
      }
    }     
    `
  }

  Set_Add_Suggestion(){
    return `
    mutation ($titulo: String, $descricao: String) {
      insert_sugestoes(objects: {nm_titulo: $titulo, ds_sugestao: $descricao}) {
        affected_rows
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
          nm_titulo
          dt_sugestao
          ds_sugestao
        }
      }
    }    
    `
  }
}

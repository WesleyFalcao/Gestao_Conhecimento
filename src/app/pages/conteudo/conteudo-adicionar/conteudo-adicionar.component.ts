import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListModel } from 'src/app/models/arraylist/array-list';
import { SubjectService } from 'src/app/services/subject.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { ConteudoService } from '../conteudo.service';

@Component({
  selector: 'app-conteudo-adicionar',
  templateUrl: './conteudo-adicionar.component.html',
  styleUrls: ['./conteudo-adicionar.component.scss']
})
export class ConteudoAdicionarComponent implements OnInit {

  /** @description Array de grupos */
  obj_Array_Categorias: Array<ListModel>

  /**@description Boolean para controlar a animação */
  Send_Sugestion_Animacao: boolean = false

  /**@description Boolean mostra o modal de alerta */
  b_Alert_Modal: boolean = false

  /**@description String que contém a mensagem do modal de alerta */
  ds_Alert_Descricao: string = "Os campos não podem estar vazios!"

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  /**@description Objeto que recebe o conteudo dos inputs */
  obj_Add_Content: any = {nm_Titulo: null, nm_Descricao: null, ds_Link: null, cd_Categoria: null, nome: ""}

  /**@description Título da páginas */
  ds_Titulo: string = "Adicionar conteúdo"

  nm_Label_Selection_Input: string = "Categoria"

  constructor(
    private location: Location,
    private conteudoService: ConteudoService,
    private categoriaService: CategoriaService,
    private subjectService: SubjectService
    ) { }

  Back(){
    this.location.back();
  }

  async ngOnInit() {
    const responsecategories = await this.categoriaService.Get_Categories_List()
    this.obj_Array_Categorias = responsecategories.data.categorias
  }

  Closed_Alert_Modal() {
    this.b_Alert_Modal = false
  }

  Value_Select(event){
    this.obj_Add_Content.cd_Categoria = event.id
  }

  async Add_Content(){
    const responsecontent = await this.conteudoService.Set_Add_Conteudo(this.obj_Add_Content)
    if(responsecontent == false){
      this.b_Alert_Modal = true
      this.ds_Alert_Descricao = "Todos os campos devem ser preenchidos!"  
      
    }else{
      this.Send_Sugestion_Animacao = true
      setTimeout(() => {
        this.Send_Sugestion_Animacao = !this.Send_Sugestion_Animacao
      }, 3000);  
    }

    if(responsecontent.errors){
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível adicionar' })
    }
  }
}

import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-adicionar',
  templateUrl: './categoria-adicionar.component.html',
  styleUrls: ['./categoria-adicionar.component.scss']
})
export class CategoriaAdicionarComponent implements OnInit {

  /**@description Boolean para controlar a animação */
  Send_Sugestion_Animacao: boolean = false

  /**@description Boolean mostra o modal de alerta */
  b_Alert_Modal: boolean = false

  /**@description string que passa o título da página */
  ds_Titulo: string = "Adicionar categoria"

  /**@description String que contém a mensagem do modal de alerta */
  ds_Alert_Descricao: string = "Os campos não podem estar vazios!"

  /**@description Recebe o nome da nova categoria*/
  nm_Categoria: string

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  /**@description Objeto que recebe o parametro para armazer os icones */
  obj_Param: any = { nm_iconBase64: "", cd_categoria: null }

  /** @description src com o preview do icone da categoria */
  img_Preview: String

  /** @description Recebe o base64 que vem do banco, caso estiver "", não precisa deletar o ícone */
  nm_Contain_Icon: String = ""

  /** @description usado para inserir o nome e o comprimento do arquivo no HTML */
  @ViewChild('filename') filename: ElementRef

  constructor(
    private location: Location,
    private categoriaService: CategoriaService,
    private subjectService: SubjectService
  ) { }

  Back() {
    this.location.back();
  }

  ngOnInit(): void {
  }

  Closed_Alert_Modal() {
    this.b_Alert_Modal = false
  }

  onClick_Delete_Icon() {
    this.img_Preview = ""
    this.obj_Param.nm_iconBase64 = ""
    this.filename.nativeElement.innerHTML = ""
  }

  async Get_Icon(event) {
    
    if (event.target.files) {
      var reader = new FileReader()

      const file_size_convert = (event.target.files[0].size / 1000).toFixed(2)
      const name_file = event.target.files[0].name

      if (event.target.files[0].size > 40000) {
        window.alert("Seu ícone é muito grande")
        return;
      }

      const nm_Name_File = `${name_file} - ${file_size_convert} kb`
      this.filename.nativeElement.innerHTML = nm_Name_File
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.img_Preview = event.target.result
        this.obj_Param.nm_iconBase64 = event.target.result
      }
    }
  }

  async Send_Category() {

    const responsesetcategory = await this.categoriaService.Set_Add_Category(this.nm_Categoria)
    if (responsesetcategory == false) {
      this.b_Alert_Modal = true
      this.ds_Alert_Descricao = "O campo tem que ser preenchido!"
    }
    
    if (responsesetcategory.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível adicionar' })
      
    }else{
      this.Send_Sugestion_Animacao = true
      setTimeout(() => {
        this.Send_Sugestion_Animacao = !this.Send_Sugestion_Animacao
        this.Back()
      }, 3000);
    }
    
    if(this.obj_Param.nm_iconBase64 != ""){
      this.obj_Param.cd_categoria = responsesetcategory.data.insert_categorias.returning[0].cd_categoria
      this.Set_Icon()    
    }
  }

  async Set_Delete_Icon(){
    this.obj_Param.nm_iconBase64 = ""
    this.filename.nativeElement.innerHTML = ""
  }

  async Set_Icon() {
    const responseaddicon = await this.categoriaService.Set_Add_Icon(this.obj_Param)

    if (responseaddicon.errors){

      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Erro ao efetuar ação ícone' })
    }else{

      this.Send_Sugestion_Animacao = true
      setTimeout(() => {
        this.Send_Sugestion_Animacao = !this.Send_Sugestion_Animacao
        this.Back()
      }, 3000);
    }
  }
}

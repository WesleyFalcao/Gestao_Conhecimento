import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';
import { ConteudoService } from '../../conteudo/conteudo.service';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoriaeditar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.scss']
})
export class CategoriaEditarComponent implements OnInit, OnDestroy {

  /**@description string que passa o noe do label do input */
  nm_Label_Input: string = "Nome da categoria"

  /**@description string que passa o título da página */
  ds_Titulo: string = "Editar categoria"

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  /**@description Recebe o nome da nova categoria*/
  nm_Categoria: string = ""

  /**@description Recebe o parâmetro da rota */
  cd_Id_Param: number

  /**@description Recebe o parâmetro da rota */
  subject_unsub: Subscription

  /**@description Recebe o parâmetro da rota */
  b_Button_Disable: boolean = false

  /**@description String que contém a mensagem do modal de alerta */
  ds_Alert_Descricao: string = "Os campos não podem estar vazios!"

  /**@description Boolean para controlar a animação */
  Send_Sugestion_Animacao: boolean = false

  /**@description Boolean mostra o modal de alerta */
  b_Alert_Modal: boolean = false

  /** @description recebe o icone selecionado pelo usuário */
  obj_Icon_Select: File

  /**@description Objeto que recebe o parametro para armazer os icones */
  obj_Param: any = { nm_iconBase64: "", cd_categoria: null }

  /** @description Recebe o base64 que vem do banco, caso estiver "", não precisa deletar o ícone */
  nm_Contain_Icon: String = ""

  /** @description usado para inserir o nome e o comprimento do arquivo no HTML */
  @ViewChild('filename') filename: ElementRef

  constructor(
    private location: Location,
    private routerParam: ActivatedRoute,
    private categoriaService: CategoriaService,
    private subjectService: SubjectService,
  ) { }

  Back() {
    this.location.back();
  }

  async ngOnInit() {
    this.subject_unsub = this.routerParam.params.subscribe((params: any) => {
      this.cd_Id_Param = params['id']
      this.obj_Param.cd_categoria = params['id']
    })

    const responsecategoria = await this.categoriaService.Get_Category(this.cd_Id_Param)
    this.nm_Categoria = responsecategoria.data.categorias[0].nm_categoria

    this.Load_Categories_And_Icons()
  }

  Closed_Alert_Modal() {
    this.b_Alert_Modal = false
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
        this.obj_Param.nm_iconBase64 = event.target.result
      }
    }
  }

  async Load_Categories_And_Icons() {

    const responsecategoria = await this.categoriaService.Get_Category_And_Icon(this.cd_Id_Param)
    if (responsecategoria.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Erro ao buscar o ícone' })
    }

    if (responsecategoria.data.categorias[0].files.length > 0) {
      const base64 = responsecategoria.data.categorias[0].files[0].nm_file
      this.obj_Param.nm_iconBase64 = base64
      this.nm_Contain_Icon = base64
    }
  }

  async onClick_Delete_Icon() {
    if (this.nm_Contain_Icon != "") {
      this.b_Alert_Modal = true
      this.ds_Alert_Descricao = "Tem certeza que deseja salvar sem nenhum ícone selecionado?"

    } else {
      this.obj_Param.nm_iconBase64 = ""
      this.filename.nativeElement.innerHTML = ""
    }
  }

  async Set_Salve_All() {

    const responseedit = await this.categoriaService.Set_Edit_Category(this.nm_Categoria, this.cd_Id_Param)

    if (responseedit == false) {
      this.b_Alert_Modal = true
      this.ds_Alert_Descricao = "O campo tem que ser preenchido!"
    }
    if (responseedit.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível adicionar' })

    }else{
      this.Send_Sugestion_Animacao = true
      setTimeout(() => {
        this.Send_Sugestion_Animacao = !this.Send_Sugestion_Animacao
        this.Back()
      }, 3000);
    }

    if (this.obj_Param.nm_iconBase64 != "" && this.nm_Contain_Icon == "") {
      this.Set_Add_Icon()
    }
  }

  async Set_Delete_Icon() {

    const deleteicon = await this.categoriaService.Set_Delete_Icon(this.cd_Id_Param)

    if (deleteicon.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Erro ao excluir ícone' })

    } else {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Ícone deletado com sucesso!' })
      this.b_Alert_Modal = false
      this.Back()
    }
  }

  async Set_Add_Icon() {
    const responseaddicon = await this.categoriaService.Set_Add_Icon(this.obj_Param)

    if (responseaddicon.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Erro ao efetuar ação ícone' })
    } else {
      this.b_Alert_Modal = false
      this.Send_Sugestion_Animacao = true
      setTimeout(() => {
        this.Send_Sugestion_Animacao = !this.Send_Sugestion_Animacao
        this.Back()
      }, 3000);
    }
  }

  async onClick_Salve() {
    if (this.obj_Param.nm_iconBase64 == "") {
      this.b_Alert_Modal = true
      this.ds_Alert_Descricao = "Tem certeza que deseja salvar sem nenhum ícone selecionado?"
    } else {
      this.Set_Salve_All()
    }
  }

  ngOnDestroy() {
    this.subject_unsub.unsubscribe()
  }
}

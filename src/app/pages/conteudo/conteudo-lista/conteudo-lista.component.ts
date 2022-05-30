import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ConteudoService } from '../conteudo.service';

@Component({
  selector: 'app-conteudo-lista',
  templateUrl: './conteudo-lista.component.html',
  styleUrls: ['./conteudo-lista.component.scss']
})
export class ConteudoEditarListaComponent implements OnInit {

  /**@description Título da página */
  ds_Titulo: string = "Conteúdos"

  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { nm_Nome: "", nm_Usuario: "", nm_Status:"", nm_Grupo:"" }

  constructor(
    private conteudoService: ConteudoService
    ) { }

  async ngOnInit() {
    const responseconteudo = await this.conteudoService.Get_Conteudos()
    this.obj_Array_Conteudos = responseconteudo.data.conteudos_aggregate.nodes
    this.onResize()
  }

  obj_Array_Conteudos: any[]

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
    if (this.nr_Width >= 1023) {
      this.b_Width = true
    } else {
      this.b_Width = false
    }
  }

  Show_Item(conteudo){
    conteudo.show = !conteudo.show
    if(conteudo.show){
      this.obj_Array_Conteudos.forEach(fe => {
        if(conteudo.cd_conteudo != fe.cd_conteudo){
          fe.show = false
        }
      })
    }
  }

  onFilter_Search(iten){
    this.Input_Value = iten
  }

  Close_Modal(){
    this.b_Show_Filter = false
  }

  Filtrar(){
    console.log(this.objFilter)
    this.b_Show_Filter = false
  } 

  Show_Modal(event){
    this.b_Show_Filter = event
  }
}

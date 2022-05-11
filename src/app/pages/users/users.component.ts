import { Component, HostListener, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  nm_Svg_Top: string = "assets/icons/filter.svg"

  nm_Svg_Bottom: string = "assets/icons/lixeira.svg"

  nm_Opcao_top: string = "Filtrar"

  nm_Opcao_bottom: string = "Limpar filtros"

  b_Show_Popover: boolean = false

  subject_unsub = new Subject()

  nr_Width: number

  b_Width: boolean

  b_Show_Itens: boolean = false
  
  b_Show_Modal: boolean = false

  onClick_Top: boolean

  b_User_Page_Popover: boolean = true

  nm_Label_Input: string = "Nome"

  constructor() { }

  ngOnInit(): void {
    this.onResize()
  }

  objArrayTeste = [
    {
      nome: "Wesley",
      id: 1,
      usuario: "wesleyfa",
      perfil: "wesleyfa",
      status: "ativo",
      b_iten: true
    },
    {
      nome: "Bruno",
      id: 2,
      usuario: "brunop",
      perfil: "brunop",
      status: "ativo",
      b_iten: true
    },
  ]

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
    if (this.nr_Width >= 1023) {
      this.b_Width = true
    } else{
      this.b_Width = false
    }
  }

  Show_Itens(){
    this.b_Show_Itens = !this.b_Show_Itens
  }

  onFilter_Popover(event){
    this.onClick_Top = event
    if(this.onClick_Top){
      this.b_Show_Modal = true
    }else{
      this.b_Show_Modal = false
    }
  }
}

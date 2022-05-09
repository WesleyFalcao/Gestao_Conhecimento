import { Component, HostListener, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  subject_unsub = new Subject()

  nr_Width: number

  b_Width: boolean

  b_Show_Itens: boolean = false
  
  b_Show_Modal: boolean = false

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
}

import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

   /** @description String que armazena o caminho do SVG */
   nm_Src_Icon: string = "assets/icons/search-glass-black.svg"

   /** @description Boolean para exibit ou não a barra de input */
   b_Show_Input: boolean

   /** @description Recebe a largura atual da tela */
   nr_Width: number
   
  /** @description Subject para destruir os subscribers */
  subject_unsub = new Subject()

  /** @description Subject para destruir os subscribers */
  b_Show_Modal: boolean = false

  constructor(
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.subjectService.subject_Modal.pipe(takeUntil(this.subject_unsub)).subscribe(
      (b_Show_Modal) => this.b_Show_Modal = b_Show_Modal
    )
  }

  // @HostListener('window:resize')
  // onResize() {
  //     this.nr_Width = window.innerWidth
  //     this.subjectService.subject_Width.next(this.nr_Width)
  //     if(this.nr_Width >= 768){
  //         this.b_Show_Input = true
  //     }else{
  //         this.b_Show_Input = false
  //     }
  // }

  ngOnDestroy() {
    this.subject_unsub.next(true)
    this.subject_unsub.complete()
  }
}

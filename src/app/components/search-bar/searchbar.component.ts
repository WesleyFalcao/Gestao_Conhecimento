import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
    selector: 'uni-search-bar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss']
})

export class SearchBarComponent implements OnInit {

    /** @description String que armazena o caminho do SVG */
    nm_Src_Icon: string = "assets/icons/search-glass-black.svg"

    /** @description Boolean para exibit ou não a barra de input */
    b_Show_Input: boolean

    /** @description Recebe a largura atual da tela */
    nr_Width: number

    @ViewChild('search') searchElement: ElementRef
    @Input() control = new FormControl()

    constructor(
        private subjectService: SubjectService
    ) { }
    
    ngOnInit() {
        
    }

    Show_Search() {
        if(this.nr_Width <= 768){
            this.b_Show_Input = !this.b_Show_Input
            this.subjectService.subject_Click_Search.next(this.b_Show_Input)
            if (this.b_Show_Input == true) {
                this.nm_Src_Icon = "assets/icons/arrow-left.svg"
            } else {
                this.nm_Src_Icon = "assets/icons/search-glass-black.svg"
            }
        }else{
            this.b_Show_Input = true
        }
    }
}

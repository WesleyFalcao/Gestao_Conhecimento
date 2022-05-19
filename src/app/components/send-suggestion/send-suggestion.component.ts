import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Subject, takeUntil } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-send-suggestion',
  templateUrl: './send-suggestion.component.html',
  styleUrls: ['./send-suggestion.component.scss']
})
export class SendSuggestionComponent implements OnInit {

  subject_unsub = new Subject()

  Show_Anime: boolean = false

  Show_Animation: boolean

  options: AnimationOptions = {
    path: '/assets/animations/sugestao-enviada.json',
  };

  animationCreated( animationItem: AnimationItem ): void { }

  constructor(
    private subject_service: SubjectService
    ) { }

  ngOnInit(): void {
    this.subject_service.subject_Exibindo_Animation_Send.pipe(takeUntil(this.subject_unsub)).subscribe(
      (Show_Animation) => this.Show_Animation = Show_Animation
    )

    if(this.Show_Animation){
      setTimeout(() => {
        this.Show_Anime = !this.Show_Anime
      }, 3000);
    }
  }

  ngOnDestroy(){
    this.subject_unsub.next(true)
    this.subject_unsub.complete()
  }
}

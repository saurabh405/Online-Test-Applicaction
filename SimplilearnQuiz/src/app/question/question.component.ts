import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
public name:string="";
public questionList: any =[];
public currentQuestion:number=0;
public points: number=0;
counter=60;
correctAnswer: number=0;
incorrectAnswer: number=0;
interval$:any;
progress:string="0";
isQuizCompleted:boolean=false;
  constructor(public questionService :QuestionService) { }

  ngOnInit(): void {
    this.name=localStorage.getItem("name")!;
    this.getAllQuestion();
    this.startCounter();

  }
  getAllQuestion(){
    this.questionService.getQuestionjson().subscribe(res=>{this.questionList= res.questions})
  }
nextQuestion(){
this.currentQuestion++;
}
preQuestion(){
this.currentQuestion--;
}
answer(currentQuestion:number,option:any){
  if(currentQuestion===this.questionList.length){
this.isQuizCompleted=true;
this.startCounter();
  }
  if(option.correct){
    this.points+= 10;
    this.correctAnswer++;
    setTimeout(()=>{ 
      this.currentQuestion++;
      this.getProgresspersent();},1000)
   
    
  }else{
    setTimeout(()=>{
      this.points-= 10;
      this.incorrectAnswer++;
      this.currentQuestion++;
    this.getProgresspersent()
    },1000)
   
  }
}
startCounter(){
this.interval$= interval(1000).subscribe(value=>{this.counter--;
if(this.counter===0){
  this.currentQuestion++;
  this.counter=60;
  this.points-=10;
}
})
setTimeout(()=>{this.interval$.unsubscribe()},6000000)}

stopCounter(){
this.interval$.unsubscribe();
this.counter=0;
}
resetCounter(){
  this.stopCounter()
  this.counter=0;
  this.startCounter()
}
getProgresspersent(){
  this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
  return this.progress;
}
}

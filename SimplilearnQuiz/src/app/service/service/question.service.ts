import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http: HttpClient) { }

  getQuestionjson(){
    return this.http.get<any>("assets/question.json")
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private env: String;

  constructor(private http: HttpClient) {
    this.env = environment.APP_URL;
  }

  saveTask(board: any) {
    return this.http.post<any>(this.env + 'board/createTask', board);
  }
  listTasks() {
    return this.http.get<any>(this.env + 'board/getTasks');
  }
  updateTask(board: any){
    return this.http.put<any>(this.env + 'board/editTask', board);
  }
  deleteTask(board: any){
    return this.http.delete<any>(this.env + 'board/deleteTask' + board._id);
  }

}

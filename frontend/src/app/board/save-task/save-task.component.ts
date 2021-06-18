import { Component, OnInit } from '@angular/core';
import { BoardService } from "../../services/board.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {
  public taskData: any;
  public errorMessage: String;

  constructor(private board: BoardService, private router: Router) {
    this.taskData = {};
    this.errorMessage = '';
   }

  ngOnInit(): void {
  }

  saveTask() {
    if (!this.taskData.name || !this.taskData.description) {
      console.log('Incomplete Data');
      this.errorMessage = 'Incomplete data';
      this.closeAlert(3000);
    } else {
      this.board.saveTask(this.taskData).subscribe(
        (res: any) => {
          console.log(res);
          // localStorage.setItem('token', '');
          this.router.navigate(['/listTasks']);
          this.taskData = {};
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert(3000);
        }
      )
      
    }
  }

  closeAlert(time: number) {
    setTimeout(() => {
      this.errorMessage = '';
    }, time)
  }

}

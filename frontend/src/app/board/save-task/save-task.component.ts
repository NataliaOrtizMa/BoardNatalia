import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {
  public taskData: any;
  public errorMessage: String;

  constructor() {
    this.taskData = {};
    this.errorMessage = '';
   }

  ngOnInit(): void {
  }

  saveTask() {}

  closeAlert(time: number) {
    setTimeout(() => {
      this.errorMessage = '';
    }, time)
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerData: any;
  public successMessage: String;
  public errorMessage: String;

  constructor(private auth: AuthService, private router: Router) {
    this.registerData = {};
    this.successMessage = '';
    this.errorMessage = '';
   }

  ngOnInit(): void {
  }

  registerUser() {
    if (!this.registerData.name ||
        !this.registerData.email ||
        !this.registerData.password) {
          console.log("Incomplete data");
          this.errorMessage = "Incomplete data";
          this.closeAlert(3000);
          this.registerData = {};
    } else {
      this.auth.registerUser(this.registerData).subscribe(
        (res) => {
          console.log(res);
          this.successMessage = "User registered successfully";
          this.closeAlert(3000);
          this.registerData = {}
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
      this.successMessage = '';
      this.errorMessage = '';
    }, time)
  }

}

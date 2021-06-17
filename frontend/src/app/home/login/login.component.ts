import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData: any;
  public successMessage: String;
  public errorMessage: String;

  constructor(private auth: AuthService, private router: Router) {
    this.loginData = {};
    this.successMessage = '';
    this.errorMessage = '';
   }

  ngOnInit(): void {
  }

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      console.log("Incomplete data");
      this.errorMessage = "Incomplete data";
      this.closeAlert(3000);
      this.loginData = {};
    } else {
      this.auth.login(this.loginData).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.jwtToken);
          this.router.navigate(['/listTasks']);
        },
        (err) => {
          this.errorMessage = err.error;
          this.closeAlert(3000);
          this.loginData = {};
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

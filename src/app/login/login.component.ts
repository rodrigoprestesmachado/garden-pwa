import { Component, OnInit } from "@angular/core";

@Component({
  selector: "rpm-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  static autenticated: boolean = false;

  constructor() {}

  ngOnInit() {}

  login() {
    if (this.email !== "" && this.password !== "") {
      LoginComponent.autenticated = true;
    }
  }
}

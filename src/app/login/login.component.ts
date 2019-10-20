import { Component, OnInit } from "@angular/core";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
@Component({
  selector: "rpm-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  static isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  btnLogin() {
    if (this.email !== "" && this.password !== "") {
      this.getAutenticated();
    }
  }

  getAutenticated() {
    this.http
      .get<MessageModel>("http://localhost:8080/Garden/ws/api/open")
      .subscribe(objMessage => {
        LoginComponent.isAuthenticated = Boolean(objMessage.result);
        this.router.navigate(["dashboard"]);
      });
  }
}

export class MessageModel {
  result: boolean;
  constructor(public value: boolean) {
    this.result = value;
  }
}

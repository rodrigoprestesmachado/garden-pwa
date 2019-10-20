import { Component, OnInit } from "@angular/core";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  btnLogin() {
    if (this.email !== "" && this.password !== "") {
      this.search("A");
    }
  }

  getAutenticated() {
    this.http
      .get<MessageModel>("http://localhost:8080/Garden/ws/api/open")
      .subscribe(objMessage => {
        LoginComponent.isAuthenticated = Boolean(objMessage.result);
      });
  }

  search(term: string) {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get<MessageModel>("http://localhost:8080/Garden/ws/api/open")
        .toPromise()
        .then(
          objMessage => {
            // Success
            LoginComponent.isAuthenticated = Boolean(objMessage.result);
            resolve();
          },
          msg => {
            // Error
            reject(msg);
          }
        );
    });
    return promise;
  }
}

export class MessageModel {
  result: boolean;
  constructor(public value: boolean) {
    this.result = value;
  }
}

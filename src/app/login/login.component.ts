/**
 * @license
 *
 * Copyright 2019 Rodrigo Prestes Machado
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

/**
 * Login Component
 *
 * @author Rodrigo Prestes Machado
 */
@Injectable()
@Component({
  selector: "garden-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  static isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  /**
   * Implements the onclick of sign-in button
   */
  btnLogin() {
    if (this.email !== "" && this.password !== "") {
      this.signIn();
    }
  }

  /**
   * Authenticate the user in the server
   */
  signIn() {
    this.http
      .get<AuthenticationModel>("http://localhost:8080/Garden/ws/api/auth")
      .subscribe(returnMessage => {
        // indicates that the user is authenticated or not
        LoginComponent.isAuthenticated = Boolean(returnMessage.auth);
        // Navigates to the /dashboard URL
        this.router.navigate(["dashboard"]);
      });
  }
}

/**
 * Convert the JSON String to a JS object
 */
export class AuthenticationModel {
  auth: boolean;
  constructor(public value: boolean) {
    this.auth = value;
  }
}

import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { LoginComponent } from "../login/login.component";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor() {}

  canActivate() {
    return LoginComponent.autenticated;
  }
}

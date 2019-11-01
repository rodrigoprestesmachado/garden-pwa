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
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

/**
 * Dashboard Component
 * @author Rodrigo Prestes Machado
 */
@Component({
  selector: "garden-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  /** The situation of the tap according the slide button */
  situation: boolean;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  /**
   * Implements the change event of the slide button
   */
  onChange() {
    this.changeTapStatus();
  }

  /**
   * Open or close the tap
   */
  changeTapStatus() {
    // note: red is the defaul/main tap the data base
    this.http
      .get<TapModel>(
        "http://localhost:8080/Garden/api/v1/open/red/" + this.situation
      )
      .subscribe(returnMessage => {
        if (returnMessage.open !== "none") {
          var tapMsg =
            Boolean(returnMessage.open) === true ? "aberta" : "fechada";
          this.openSnackBar("Torneira " + tapMsg, "");
        }
      });
  }

  /**
   * Open a snack-bar message
   *
   * @param message String : the message
   * @param action String : some action link
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}

/**
 * Convert the JSON String to a JS object
 */
export class TapModel {
  open: string;
  constructor(public value: string) {
    this.open = value;
  }
}

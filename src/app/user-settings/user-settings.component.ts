import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  originalUserSettings: UserSettings = {
    firstName: 'Jacob Chademwiri',
    email: 'jchademwiri@gmail.com',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Anual',
    notes: 'Here are some notes'
  };

  userSettings: UserSettings = { ...this.originalUserSettings };
  postError = false;
  postErrorMessege = '';
  errorResponse = '';
  subscriptionTypes: Observable<string[]>;

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    this.dataservice.getSubscriptionTypes();
  }

  onHttpError(error: any) {
    console.log(`error: , ${this.errorResponse}`)
    this.postError = true;
    this.postErrorMessege = this.errorResponse;
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);
    // error => this.onHttpError(error)
    if (form.valid) {
      this.dataservice.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log(`success: , ${result}`),
        error => console.log(`error , ${error}`)
      )
    } else {
      this.postError = true;
      this.postErrorMessege = `'Please fix the above errors'`
    }
  }

  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid);
  }

}

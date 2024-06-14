import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

interface Industry {
  value: string;
  viewValue: string;
}

/**
 * @title Registration
 */
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    RouterModule
  ],
})

export class RegistrationComponent {
  registrationService = inject(RegistrationService);
  router = inject(Router);
  selectedIndustry = '';
  hidePassword = true;
  emailValidationError = '';
  registrationSucceeded = false;
  errors: string[] = [];

  industries: Industry[] = [
    { value: '0', viewValue: 'IT' },
    { value: '1', viewValue: 'Automotive' },
    { value: '2', viewValue: 'Healthcare' },
  ];

  companyDataFormGroup = this._formBuilder.group({
    companyName: ['', Validators.required],
  });

  userDataFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
    passwordRepetition: ['', Validators.required],
    email: ['', Validators.email],
  });

  summaryFormGroup = this._formBuilder.group({
  });

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
  }

  togglePasswordVisibility(event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }

  updateEmailValidationError() {
    if (this.userDataFormGroup.get('email')?.hasError('email')) {
      this.emailValidationError = 'Not a valid email';
    } else {
      this.emailValidationError = '';
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  registerUser() {
    if (this.companyDataFormGroup.valid && this.userDataFormGroup.valid) {
      this.registrationService.register(this.userDataFormGroup.value)
        .forEach(
          response => {
            if (response) {
              this.registrationSucceeded = true;
              this.openSnackBar("Registration succeeded", "Ok");
            }
          }).catch(
            error => {
              this.registrationSucceeded = false;
              this.errors = [];
              if (error.error) {
                const errorObj = JSON.parse(error.error);
                if (errorObj && errorObj.errors) {
                  const errorList = errorObj.errors;
                  for (let err in errorList) {
                    if (Object.hasOwn(errorList, err)) {
                      let errList: string[] = errorList[err];
                      for (let i = 0; i < errList.length; i++) {
                        this.errors.push(errList[i]);
                      }
                      this.openSnackBar(this.errors.join(" "), "Ok");
                    }
                  }
                }
              }
            });
    }
  }
}

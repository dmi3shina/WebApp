import { Component, OnInit, inject, viewChild, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { User, RegistrationService } from '../../services/registration.service';
import { Industry } from '../../models/industry';

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
    MatStepper,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
})
export class RegistrationComponent implements OnInit {
  registrationService = inject(RegistrationService);
  accordion = viewChild.required(MatAccordion);
  @ViewChild('stepper') stepper!: MatStepper;
  router = inject(Router);
  hidePassword: boolean = true;
  errors: string[] = [];
  industries: Industry[] = [];
  selectedIndustry: string = '';
  waitingForServerResponse: boolean = false;
  registrationSucceeded: boolean = false;
  registrationResult: string = '';
  passwordValidationError: string = '';
  emailValidationError: string = '';
  requiredError: string = 'Required';

  companyDataFormGroup = this._formBuilder.group({
    companyName: ['', Validators.required],
    industryId: [0, [Validators.required, Validators.min(1)]],
  });

  userDataFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{6,}')]],
    passwordRepetition: ['', Validators.required],
    email: ['', Validators.email],
  }, {
    validators: this.requiredIdentical('passwordRepetition', 'password')
  }
  );

  summaryAndAgreementsGroup = this._formBuilder.group({
    agreedToTOS: [false, Validators.requiredTrue],
    agreedToPrivacyPolicy: [false, Validators.requiredTrue],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getIndustries();
    this.accordion().openAll();
  }

  getIndustries() {
    this.registrationService.getIndustries()
      .subscribe({
        next: industries => {
          this.industries = industries;
        },
        error: error => {
          console.error(error);
        }
    });
  }

  onIndustrySelectionChanged(value: any) {
    this.selectedIndustry = this.industries
      .find(i => i.id === value)?.industryName || '';
  }

  togglePasswordVisibility(event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }

  updatePasswordValidationError() {
    if (this.userDataFormGroup.get('password')?.hasError('pattern')) {
      this.passwordValidationError = 'Password must be at least 6 characters and have at least one non alphanumeric character, one digit, one lowercase and one uppercase character';
    } else {
      this.passwordValidationError = '';
    }
  }

  requiredIdentical(passwordRepetition: string, password: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const passwordRepetitionControl = abstractControl.get(passwordRepetition);
      const passwordControl = abstractControl.get(password);

      if (passwordRepetitionControl!.errors &&
        !passwordRepetitionControl!.errors['requiredIdentical']) {
        return null;
      }
      if (passwordControl!.value !== passwordRepetitionControl!.value) {
        const error = { requiredIdentical: 'true' };
        passwordRepetitionControl!.setErrors(error);
        return error;
      } else {
        passwordRepetitionControl!.setErrors(null);
        return null;
      }
    };
  }  

  updateEmailValidationError() {
    if (this.userDataFormGroup.get('email')?.hasError('email')) {
      this.emailValidationError = 'Not a valid email';
    } else {
      this.emailValidationError = '';
    }
  }

  showNotification(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  showErrorList(error: any): any {    
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
            this.showNotification(this.errors.join(" "), "Ok");
          }
        }
      }
    }
  }

  registerUser() {
    if (this.companyDataFormGroup.valid && this.userDataFormGroup.valid) {
      const newUser: User = {
        ...this.companyDataFormGroup.value,
        ...this.userDataFormGroup.value
      } as User;
      this.stepper.next();
      this.waitingForServerResponse = true;
      this.registrationService.register(newUser)
        .forEach(
          response => {
            if (response) {
              this.registrationSucceeded = true;
              this.registrationResult = "Your registration has been successful";
            }
          }).catch(
            error => {
              this.registrationSucceeded = false;
              this.registrationResult = "Registration failed";
              this.showErrorList(error);
            }).then(() => {
              this.waitingForServerResponse = false;
            });          
    }
  }    
}

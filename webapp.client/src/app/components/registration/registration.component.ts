import { Component, inject } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
    username: ['', Validators.required],
    password: ['', Validators.required],
    passwordRepetition: ['', Validators.required],
  });

  email = new FormControl('', [Validators.email]);

  errorMessage = '';

  summaryFormGroup = this._formBuilder.group({
  });

  togglePasswordVisibility(event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }

  constructor(private _formBuilder: FormBuilder) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  registerUser() {
    if (this.companyDataFormGroup.valid && this.userDataFormGroup.valid) {
      console.log(this.companyDataFormGroup.value);
      console.log(this.userDataFormGroup.value);
      this.registrationService.register(this.userDataFormGroup.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['.']);
          },
          error: (err) => console.log(err)
        });
    }
  }
}

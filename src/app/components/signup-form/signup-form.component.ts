import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/directives/forbidden-validator.directive';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'fx-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  user = new User();

  firstnameFormControl = new FormControl('', [
    Validators.required
  ]);
  lastnameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])/)
  ]);

  signupForm: FormGroup = new FormGroup({
    firstname: this.firstnameFormControl,
    lastname: this.lastnameFormControl,
    email: this.emailFormControl,
    password: this.passwordFormControl
  });
  postSuccess: boolean = false;

  constructor(private registerService:RegisterService) { }

  ngOnInit(): void {

  }
  checkPassword = () => {
    console.log(this.signupForm);
    if (this.user.password?.toLowerCase().indexOf(this.user.firstName?.toLowerCase()) > -1 || this.user.password?.toLowerCase().indexOf(this.user.lastName?.toLowerCase()) > -1){
      this.signupForm.controls['password'].setErrors({'incorrect': true});
    }   
  }

  onSubmit = () => {
    this.registerService.registerUser(this.user).subscribe(response => {
      this.postSuccess = true;
    });
  }
}

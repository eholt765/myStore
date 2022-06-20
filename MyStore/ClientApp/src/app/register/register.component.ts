import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  //isRegistered = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.registerForm = this.fb.group({
      'FirstName' : [''],
      'LastName' : [''],
      'UserName' : [''],
      'Email' : [''],
      'Password' :  ['']
    })
  }

  ngOnInit(): void {

  }

  register(){
    this.authService.register(this.registerForm.value).subscribe(
      data => {console.log(data),this.router.navigate(['/login'])},
      error => {console.log(error)}
    );

  }
}

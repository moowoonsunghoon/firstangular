import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @ViewChild(FormGroupDirective) myForm!: FormGroupDirective;
  data: FormGroup;
  name = new FormControl(null, [Validators.required]);
  phoneNumber = new FormControl(null, [Validators.required]);
  school = new FormControl(null, [Validators.required]);
  part = new FormControl(null, [Validators.required]);
  gender = new FormControl(1, [Validators.required]);
  submit = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.data = formBuilder.group({
      name: this.name,
      phoneNumber: this.phoneNumber,
      school: this.school,
      part: this.part,
      gender: this.gender,
    });
  }

  ngOnInit(): void {}

  onSubmit(data: FormGroup) {
    if (!data.invalid) {
      this.userService.addUser(data.value);
      this.myForm.resetForm();
      this.submit = true;
    } else {
      this.submit = false;
    }
  }
}

// employee-modal.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {
  @Input() employee: Employee = {} as Employee;
  isNewEmployee = false;
  newEmployee: Employee = {} as Employee;

  constructor(public modalService: NgbActiveModal) {}

  ngOnInit() {
    this.isNewEmployee = !this.employee.id;
    this.newEmployee = this.isNewEmployee ? {} as Employee : { ...this.employee };
  }

  save() {
    this.modalService.close(this.newEmployee);
    console.log(this.newEmployee)
  }

  reset() {
    this.newEmployee = {} as Employee;
  }
}

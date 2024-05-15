import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';


@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit {

  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  } 

  addEmployee(employee: Omit<Employee, "id">): void {
    this.employeeService.addEmployee(employee)
      .subscribe((newEmployee) => {
        console.log(newEmployee)
        this.employees.push(newEmployee);
      });
  }

  editEmployee(employee: Employee): void {
    const modalRef = this.modalService.open(EmployeeModalComponent);
    modalRef.componentInstance.employee = employee;
    modalRef.result.then((result: Employee) => {
      this.employeeService.editEmployee(result).subscribe(() => {
        const index = this.employees.findIndex(e => e.id === employee.id);
        if (index !== -1) {
          this.employees[index] = result;
        }
      });
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter((e) => e.id !== id);
    });
  }

  openModal(): void {
    const modalRef = this.modalService.open(EmployeeModalComponent);	
    modalRef.result.then((result: Employee) => {
      this.addEmployee(result);
      //modalRef.componentInstance.reset();
    });
  }
}


// import { Component, inject, OnInit } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { Employee } from '../employee';
// import { EmployeeService } from '../employee.service';

// import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';


// @Component({
//   selector: 'app-contact-table',
//   templateUrl: './contact-table.component.html',
//   styleUrl: './contact-table.component.css'
// })

// export class ContactTableComponent implements OnInit {

//   public employees: Employee[] = [];

//   private modalService = inject(NgbModal);

//   constructor(private employeeService: EmployeeService) {}

//   ngOnInit(): void {
//     this.getEmployees()
//   }

//   getEmployees(): void {
//     this.employeeService.getEmployees()
//     .subscribe(employees => this.employees = employees)
//   } 

//   addEmployee(employee: Omit<Employee, "id">): void {
//     this.employeeService.addEmployee(employee)
//     .subscribe((employee) => {
//       this.employees.push(employee)
//     })
//   }

//   editEmployee(employee: Employee): void {
//     const modalRef = this.modalService.open(EmployeeModalComponent)
//     modalRef.componentInstance.employee = employee
//     modalRef.result.then((result: Employee) => {
//       this.employeeService.editEmployee(result).subscribe(() => {
//         this.employees = this.employees.map((e) => e.id === employee.id ? employee : e)
//       })
//     })
//   }

//   deleteEmployee(id: number) {
//     this.employeeService.deleteEmployee(id).subscribe(() => {
//       this.employees = this.employees.filter((e) => e.id !== id)
//     })
//   }

//   openModal(): void {
//     const modalRef = this.modalService.open(EmployeeModalComponent);	
//     modalRef.result.then((result: Employee) => {
//       this.addEmployee(result)
//       modalRef.componentInstance.reset()
//     })
//   }

// }

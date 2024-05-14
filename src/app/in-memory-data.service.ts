import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees: Employee[] = [
      {
        id: 1,
        name: 'Mr.A',
        email: 'a@gmail.com',
        phone: '0909090909',
        jobtitle: 'assosiate software engineer',
      },
      {
        id: 2,
        name: 'Mr.B',
        email: 'b@gmail.com',
        phone: '0808080808',
        jobtitle: 'assosiate software engineer',
      },
      {
        id: 3,
        name: 'Mr.C',
        email: 'c@gmail.com',
        phone: '0707070707',
        jobtitle: 'assosiate software engineer',
      },
      {
        id: 4,
        name: 'Mr.D',
        email: 'd@gmail.com',
        phone: '0606060606',
        jobtitle: 'assosiate software engineer',
      },
    ];
    return {employees};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 1;
  }
}

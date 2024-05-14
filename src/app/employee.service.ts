import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  private employeesUrl = 'api/employees';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        tap(_ => console.log('fetched employees')),
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url)
      .pipe(
        tap(_ => console.log(`fetched employee id=${id}`)),
        catchError(this.handleError<Employee>(`getEmployee id=${id}`))
      );
  }
 
  addEmployee(employee: Omit<Employee, "id">): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions)
      .pipe(
        tap((newEmployee: Employee) => console.log(`added employee with id=${newEmployee.id}`)),
        catchError(this.handleError<Employee>('addEmployee'))
      );
  }
  
  editEmployee(employee: Employee): Observable<any> {
    const url = `${this.employeesUrl}/${employee.id}`;
    return this.http.put(url, employee, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated employee id=${employee.id}`)),
        catchError(this.handleError<any>('updateEmployee'))
      );
  }
  
  deleteEmployee(id: number): Observable<any> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted employee id=${id}`)),
        catchError(this.handleError<any>('deleteEmployee'))
      );
  }
}


// import { Injectable } from '@angular/core';
// import { Employee } from './employee';
// import { Observable, of } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError, map, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {

//   employees: Employee[] = []

//   constructor(private http: HttpClient) {}

//   private employeesUrl = 'api/employees';

//   httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };

//   private handleError<T>(operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {

//       // TODO: send the error to remote logging infrastructure
//       console.error(error); // log to console instead

//       // TODO: better job of transforming error for user consumption
//       console.log(`${operation} failed: ${error.message}`);

//       // Let the app keep running by returning an empty result.
//       return of(result as T);
//     };
//   }

//   getEmployees(): Observable<Employee[]> {
//     return this.http.get<Employee[]>(this.employeesUrl)
//       .pipe(
//         tap(_ => console.log('fetched heroes')),
//         catchError(this.handleError<Employee[]>('getEmployees', []))
//       );
//   }

//   getEmployee(id: number): Observable<Employee> {
//     const url = `${this.employeesUrl}/${id}`
//     return this.http.get<Employee>(url)
//     .pipe(
//       tap(_ => console.log(`fetch hero id=${id}`)),
//       catchError(this.handleError<Employee>(`getEmployee id=${id}`))
//     )
//   }
 
//   // addEmployee(employee: Omit<Employee, "id">): Observable<Employee> {
//   //   return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions)
//   //   .pipe(
//   //     tap((newEmployee: Employee) => console.log(`add hero w/id=${newEmployee.id}`)),
//   //     catchError(this.handleError<Employee>('addEmployee'))
//   //   )
//   // }
//   addEmployee(employee: Omit<Employee, "id">): Observable<Employee> {
//     return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions).pipe(
//       tap((newEmployee: Employee) => {
//         console.log(`added employee with id=${newEmployee.id}`);
//         this.employees.push(newEmployee); // Add the new employee to the local array
//       }),
//       catchError(this.handleError<Employee>('addEmployee'))
//     );
//   }
  

//   editEmployee(employee: Employee): Observable<any> {
//     const url = `${this.employeesUrl}/${employee.id}`;
//     return this.http.put(url, employee, this.httpOptions).pipe(
//       tap(_ => console.log(`updated employee id=${employee.id}`)),
//       catchError(this.handleError<any>('updateEmployee'))
//     );
//   }
  
//   deleteEmployee(id: number): Observable<any> {
//     const url = `${this.employeesUrl}/${id}`;
//     return this.http.delete(url, this.httpOptions).pipe(
//       tap(_ => console.log(`deleted employee id=${id}`)),
//       catchError(this.handleError<any>('deleteEmployee'))
//     );
//   }
  
// }

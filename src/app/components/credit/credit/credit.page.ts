import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ClientsService } from '../../../services/clients/clients.service';


@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {

  creditForm: FormGroup;
  dt1: any;
  dt2: any;
  time: any;


  constructor(
    public formBuilder: FormBuilder,
    private router: Router
  ) {

    this.creditForm = this.formBuilder.group({
      nameCompany: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      nit: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      salary: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      dateCompany: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  ngOnInit() {
  }

  timeCompany() {
    this.dt1 = new Date(); // .toISOString().slice(0, 10);
    this.dt2 = new Date(this.creditForm.value.dateCompany); // .toISOString().slice(0, 10);

    this.time = Math.floor((Date.UTC(this.dt1.getFullYear(), this.dt1.getMonth(), this.dt1.getDate()) - Date.UTC(this.dt2.getFullYear(),
      this.dt2.getMonth(), this.dt2.getDate()) ) / (1000 * 60 * 60 * 24));

    if (this.time > 0) {
      if (this.time >= 547) {
        return true;
      } else {
        alert('Una vez cumplido el año y medio de ingreso a la empresa, su crédito será aprobado');
      }
    } else {
      alert('La fecha de ingreso debe ser menor al día de hoy');
    }
  }

  approveCredit() {
    if (this.timeCompany()) {
      if (this.creditForm.value.salary > 800000) {
        if (this.creditForm.value.salary <= 1000000) {
          alert('Credito aprobado por $5.000.000');
        } else {
          if (this.creditForm.value.salary <= 4000000) {
            alert('Credito aprobado por $20.000.000');
          } else {
            if (this.creditForm.value.salary > 4000000) {
              alert('Credito aprobado por $50.000.000');
            }
          }
        }
      } else {
        alert('Para obtener un credito aprobado su salario debe ser mayor a $800.000');
      }
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ClientsService } from '../../../services/clients/clients.service';


@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
})
export class RegistryPage implements OnInit {

  registryForm: FormGroup;
  clients: any;
  dt1: any;
  dt2: any;
  age: any;

  constructor(
    public formBuilder: FormBuilder,
    private clientsSvc: ClientsService,
    private router: Router
  ) {

    this.registryForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ])),
      identification: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      birthdate: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  ngOnInit() {
    this.clientsSvc.getClients()
      .then(res => {
        this.clients = Object.keys(res).map(key => {
          return res[key];
        });
      });
  }

  ageValidate() {
    this.dt1 = new Date(); // .toISOString().slice(0, 10);
    this.dt2 = new Date(this.registryForm.value.birthdate); // .toISOString().slice(0, 10);

    this.age = Math.floor((Date.UTC(this.dt1.getFullYear(), this.dt1.getMonth(), this.dt1.getDate()) - Date.UTC(this.dt2.getFullYear(),
      this.dt2.getMonth(), this.dt2.getDate()) ) / (1000 * 60 * 60 * 24));

    if (this.age >= 6574) {
      return true;
    } else {
      return false;
    }
  }

  registry() {
    if (this.ageValidate()) {
      if (this.clients.findIndex(obj => obj.identification === this.registryForm.value.identification) < 0) {
        this.clientsSvc.postClients(this.registryForm.value)
          .then(resRegistry => {
            if (resRegistry.name) {
              alert('REGISTRO EXITOSO');
              this.router.navigate(['/login']);
            }
          });
      } else {
        alert('USUARIO YA REGISTRADO');
      }

    } else {
      alert('MENOR DE EDAD');
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerManagerService } from '../services/customer-manager.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export default class CustomerFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private customerService = inject(CustomerManagerService);

  form?: FormGroup;
  customer?: Customer;


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.customerService.getCustomerById(parseInt(id))
        .subscribe(customer => {
          this.customer = customer;
          this.form = this.fb.group({
            name: [customer.name, [Validators.required]],
            cpf: [customer.cpf, [Validators.required, Validators.pattern(/^\d{11}$/)]], // Adicionada validação de CPF com 11 dígitos
            dateOfBirth: [customer.dateOfBirth, Validators.required],
            email: [customer.email, [Validators.required, Validators.email]]
          });
        })
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], // Adicionada validação de CPF com 11 dígitos
        dateOfBirth: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      });
    }
  }

  saveCustomer() {
    if (this.form!.valid) {
      const customerData: Customer = this.form!.value as Customer;

      if (this.customer) {
        // Atualizar cliente existente
        this.customerService.updateCustomer(this.customer.id!, customerData).subscribe({
          next: (response) => {
            console.log('Cliente atualizado com sucesso:', response);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Erro ao atualizar cliente:', err);
          }
        });
      } else {
        // Criar novo cliente
        this.customerService.createCustomer(customerData).subscribe({
          next: (response) => {
            console.log('Cliente criado com sucesso:', response);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Erro ao criar cliente:', err);
          }
        });
      }
    } else {
      console.log('Formulário inválido');
    }
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomerManagerService } from '../services/customer-manager.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export default class CustomerFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private customerService = inject(CustomerManagerService);


  form = this.fb.group({
    name: ['', [Validators.required]],
    cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], // Adicionada validação de CPF com 11 dígitos
    dateOfBirth: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  createCustomer() {
    if (this.form.valid) {
      const newCustomer: Customer = this.form.value as Customer;

      this.customerService.createCustomer(newCustomer).subscribe({
        next: (response) => {
          console.log('Cliente criado com sucesso:', response);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro ao criar cliente:', err);
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}

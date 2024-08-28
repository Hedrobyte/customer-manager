import { Component, inject, OnInit } from '@angular/core';
import { CustomerManagerService } from '../services/customer-manager.service';
import { Customer } from '../models/customer.model';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-manager',
  standalone: true,
  imports: [DatePipe, RouterModule, ReactiveFormsModule],
  templateUrl: './customer-manager.component.html',
  styleUrl: './customer-manager.component.css'
})
export default class CustomerManagerComponent implements OnInit{
  customers: Customer[] = [];

  private customerService = inject(CustomerManagerService);
  private fb = inject(FormBuilder);

  searchForm = this.fb.group({
    searchTerm: [''],
    searchType: ['name']  // 'name' or 'cpf'
  });

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  searchCustomers(): void {
    const { searchTerm, searchType } = this.searchForm.value;

    if (searchType === 'name') {
      this.customerService.searchCustomersByName(searchTerm!).subscribe((customers) => {
        this.customers = customers;
      });
    } else if (searchType === 'cpf') {
      this.customerService.searchCustomersByCPF(searchTerm!).subscribe((customers) => {
        this.customers = customers;
      });
    }
  }

  deleteCustomer(id: number): void {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          console.log('Cliente deletado com sucesso');
          this.loadCustomers(); // Recarrega a lista de clientes após deletar
        },
        error: (err) => {
          console.error('Erro ao deletar cliente:', err);
        }
      });
    }
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { CustomerManagerService } from '../services/customer-manager.service';
import { Customer } from '../models/customer.model';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-manager',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './customer-manager.component.html',
  styleUrl: './customer-manager.component.css'
})
export default class CustomerManagerComponent implements OnInit{
  customers: Customer[] = [];

  private customerService = inject(CustomerManagerService);

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
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

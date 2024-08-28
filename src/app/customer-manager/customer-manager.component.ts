import { Component, OnInit } from '@angular/core';
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

  constructor(private customerService: CustomerManagerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers()
    .subscribe((customer => {
      this.customers = customer;
    }))
  }

}

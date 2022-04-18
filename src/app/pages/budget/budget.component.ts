import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  orderObj = {};
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
    };
  newBudget(): void{

  }

}

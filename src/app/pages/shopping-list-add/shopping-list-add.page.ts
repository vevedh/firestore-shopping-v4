import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '../../models/grocery';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.page.html',
  styleUrls: ['./shopping-list-add.page.scss'],
})
export class ShoppingListAddPage implements OnInit {
  public groceryList: Observable<Grocery[]>;
  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getTeamId().then(teamId => {
      this.groceryList = this.inventoryService
        .getGroceryListForShoppingList(teamId, false)
        .valueChanges();
      console.log(this.groceryList);
    });
  }

  addGrocery(groceryId: string, teamId: string): void {
    this.inventoryService.addGroceryToShoppingList(groceryId, teamId);
  }
}

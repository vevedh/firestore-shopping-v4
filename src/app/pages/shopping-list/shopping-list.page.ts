import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';
import { Observable } from 'rxjs';
import { Grocery } from '../../models/grocery';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  groceryList: Observable<Grocery[]>;
  pickedGroceryList: Observable<Grocery[]>;
  constructor(
    public alertCtrl: AlertController,
    public inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.inventoryService.getTeamId().then(teamId => {
      this.groceryList = this.inventoryService
        .getGroceryListForShoppingList(teamId, true)
        .valueChanges();

      this.pickedGroceryList = this.inventoryService
        .getPickedGroceryListForShoppingList(teamId, true)
        .valueChanges();
    });
  }

  async pickQuantity(
    groceryId: string,
    name: string,
    units: string,
    teamId: string
  ): Promise<void> {
    const prompt = await this.alertCtrl.create({
      message: `How many ${units} of ${name} are you picking up?`,
      inputs: [{ name: 'quantity', placeholder: `1`, type: 'number' }],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Add',
          handler: data => {
            const quantityShopping: number = parseFloat(data.quantity);
            this.inventoryService.pickUpGroceryFromShoppingList(
              groceryId,
              quantityShopping,
              teamId
            );
          },
        },
      ],
    });
    prompt.present();
  }

  async addGrocery(groceryId: string, teamId: string): Promise<void> {
    const prompt = await this.alertCtrl.create({
      message: 'How many are you adding?',
      inputs: [
        {
          name: 'quantity',
          placeholder: '0',
          type: 'number',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Add',
          handler: data => {
            const quantityShopping: number = parseFloat(data.quantity);
            this.inventoryService.addQuantityGroceryFromShoppingList(
              groceryId,
              quantityShopping,
              teamId
            );
          },
        },
      ],
    });
    prompt.present();
  }

  async removeGrocery(groceryId: string, teamId: string): Promise<void> {
    const prompt = await this.alertCtrl.create({
      message: 'How many are you taking out?',
      inputs: [
        {
          name: 'quantity',
          placeholder: '0',
          type: 'number',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Take Out',
          handler: data => {
            const quantityShopping: number = parseFloat(data.quantity);
            this.inventoryService.removeQuantityGroceryFromShoppingList(
              groceryId,
              quantityShopping,
              teamId
            );
          },
        },
      ],
    });
    prompt.present();
  }
}

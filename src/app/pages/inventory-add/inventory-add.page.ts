import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.page.html',
  styleUrls: ['./inventory-add.page.scss'],
})
export class InventoryAddPage implements OnInit {
  public inShoppingList = false;
  public addGroceryForm: FormGroup;
  public teamId: string;

  constructor(
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder
  ) {
    this.inShoppingList = JSON.parse(this.route.snapshot.paramMap.get('inShoppingList'));
    this.addGroceryForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      quantity: [0, Validators.compose([Validators.required])],
      units: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.inventoryService.getTeamId().then(teamId => {
      this.teamId = teamId;
    });
  }

  async addGrocery(addGroceryForm): Promise<any> {
    const loading = await this.loadingCtrl.create();
    try {
      loading.present();

      const name: string = this.addGroceryForm.value.name;
      const quantity: number = parseFloat(this.addGroceryForm.value.quantity);
      const units: string = this.addGroceryForm.value.units;

      await this.inventoryService.createGrocery(
        name,
        quantity,
        units,
        this.teamId,
        this.inShoppingList
      );
      await loading.dismiss();
      this.router.navigate(['/tabs/(inventory:inventory)']);
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        message: error.message,
        buttons: [{ text: 'Ok', role: 'cancel' }],
      });
      alert.present();
    }
  }
}

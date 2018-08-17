import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { InventoryPageModule } from '../pages/inventory/inventory.module';
import { ShoppingListPageModule } from '../pages/shopping-list/shopping-list.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    InventoryPageModule,
    ShoppingListPageModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}

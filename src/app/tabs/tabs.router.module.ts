import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list.page';
import { InventoryPage } from '../pages/inventory/inventory.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'shopping-list',
        outlet: 'shopping-list',
        component: ShoppingListPage
      },
      {
        path: 'inventory',
        outlet: 'inventory',
        component: InventoryPage
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list.page';
import { InventoryPage } from '../pages/inventory/inventory.page';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'shopping-list',
        outlet: 'shopping-list',
        component: ShoppingListPage,
        canActivate: [AuthGuard],
      },
      {
        path: 'inventory',
        outlet: 'inventory',
        component: InventoryPage,
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/tabs/(inventory:inventory)',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

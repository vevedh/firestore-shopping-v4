import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  {
    path: 'signup',
    loadChildren: './pages/signup/signup.module#SignupPageModule',
  },
  {
    path: 'shopping-list-add',
    loadChildren:
      './pages/shopping-list-add/shopping-list-add.module#ShoppingListAddPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'password-reset',
    loadChildren: './pages/password-reset/password-reset.module#PasswordResetPageModule',
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'inventory-add',
    loadChildren: './pages/inventory-add/inventory-add.module#InventoryAddPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'inventory-add/:inShoppingList',
    loadChildren: './pages/inventory-add/inventory-add.module#InventoryAddPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'add-user',
    loadChildren: './pages/add-user/add-user.module#AddUserPageModule',
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

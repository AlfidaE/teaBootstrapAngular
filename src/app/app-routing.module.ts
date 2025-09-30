import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/pages/main/main.component";
import {OrderComponent} from "./components/pages/order/order.component";
import {CatalogComponent} from "./components/pages/catalog/catalog.component";
import {CardComponent} from "./components/pages/card/card.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'card/:id', component: CardComponent },
  { path: 'order', component: OrderComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

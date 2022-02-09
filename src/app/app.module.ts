import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PartialContainerComponent } from './components/partial-container/partial-container.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardContent, MatCardModule} from '@angular/material/card';
import { CardComponent } from './components/card/card.component';
import { produtosService } from './../services/produtos/produtos.service';
import { ProductsComponent } from './pages/products/products.component';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import {MatMenuModule} from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table'  
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { ConfirmBuyComponent } from './pages/confirm-buy/confirm-buy.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { ListProductsComponent } from './pages/list-products';





const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'add-products', component: AddProductsComponent },
  { path: 'list-products', component: ListProductsComponent },
  { path: 'confirm-buy', component: ConfirmBuyComponent },
  { path: 'relatorio', component: RelatorioComponent },
  {path: '', component: LoginComponent,},
  // {path: '**', component: PaginaNaoEncontradaComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    PartialContainerComponent,
    CardComponent,
    ProductsComponent,
    AddProductsComponent,
    ConfirmBuyComponent,
    RelatorioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    FlexLayoutModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule,
    CoreModule,
    [RouterModule.forRoot(routes,
      {enableTracing: true}
      )],
  ],
  exports: [RouterModule],
  providers: [
    produtosService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

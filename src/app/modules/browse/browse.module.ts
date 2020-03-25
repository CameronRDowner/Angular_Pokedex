import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowsePageComponent } from './pages/browse-page/browse-page.component';
import { SearchControlsComponent } from '../browse/components/search-controls/search-controls.component';
import { CarouselButtonComponent } from '../../shared/components/carousel-button/carousel-button.component';
import { PageIndicatorComponent } from '../../shared/components/page-indicator/page-indicator.component';
import { SelectBoxComponent } from '../../shared/components/select-box/select-box.component';

import { PokemonModule } from '../pokemon/pokemon.module';

@NgModule({
  declarations: [
    BrowsePageComponent,
    SearchControlsComponent,
    CarouselButtonComponent,
    PageIndicatorComponent,
    SelectBoxComponent
  ],
  imports: [
    CommonModule,
    PokemonModule,
    FormsModule
  ],
  exports: [
    SearchControlsComponent
  ]
})
export class BrowseModule { }

import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon/pokemon';
import { PokemonService } from '../../pokemon.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { RadioCluster } from 'src/app/shared/models/radio-cluster/radio-cluster';

@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemon-page.component.html',
  styleUrls: ['./pokemon-page.component.scss']
})
export class PokemonPageComponent implements OnInit {
  pokemon:Pokemon;
  pokemonSubscription:Subscription;
  orientationRadioCluster:RadioCluster;
  colorRadioCluster:RadioCluster;
  gameSelectOptions:string[];
  handleOrientationButtonClick(clickedButton: string){
    if (clickedButton === "Front"){
      
    }
    else if(clickedButton === "Back"){

    }
  }
  setPokemon(){
  this.pokemonSubscription = this.pokemonService.getPokemon(parseInt(this.router.url.substring(9))).pipe(take(1)).subscribe(_pokemon=>{ this.pokemon = _pokemon });
    console.log(this.pokemon);
  }
  constructor(private pokemonService:PokemonService, private router: Router) {
    this.setPokemon();
    this.gameSelectOptions = ["Pokemon Shield", "Pokemon Sword"];
   }

  ngOnInit(): void {
  }
  ngOnDestroy(): void{
    this.pokemonSubscription.unsubscribe
  }
}

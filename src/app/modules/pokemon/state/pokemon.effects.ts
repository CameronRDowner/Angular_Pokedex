import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { Action, Store, select } from '@ngrx/store';
import * as pokemonActions from './pokemon.actions';
import { State } from '../../../app.state'
import { switchMap, map, catchError, withLatestFrom, concatMap, mapTo } from 'rxjs/operators';
import * as pokemonSelectors from '../state'
import { MoveLists } from '../models/move-lists';
import { Move } from '../models/move';

@Injectable()
export class PokemonEffects {

constructor(private pokemonService: PokemonService, private actions$: Actions, private store$: Store<State>) { }
    
@Effect()
  loadPokemon$: Observable<Action> = this.actions$.pipe(
    ofType<pokemonActions.LoadPokemon>(pokemonActions.PokemonActionTypes.LoadPokemon),
    switchMap( action =>
      this.pokemonService.getPokemon(action.payload).pipe(
        map(result => (new pokemonActions.LoadPokemonSuccess(result))),
        catchError(error=> of(new pokemonActions.LoadPokemonFailure(error)))
        )
  )
  );    
@Effect()
loadMoves$ = this.actions$.pipe(
  ofType<pokemonActions.LoadMoveLists>(pokemonActions.PokemonActionTypes.LoadMoveLists),
  concatMap(action =>
    of(action).pipe(
      withLatestFrom(this.store$.pipe(select(pokemonSelectors.getPokemon))))),
  map(([action, pokemon]) => {
    let moveLists = new MoveLists();
    pokemon.moves.map(pokemonMove=>{ pokemonMove.version_group_details.map(game =>{
      if(game.move_learn_method.name === "level-up" && game.version_group.name in moveLists){
        const move = {levelLearnedAt: game.level_learned_at, moveInfo: this.pokemonService.getMove(pokemonMove.move.url) } as Move
        moveLists[game.version_group.name].push(move);
      }
    })

  })
  return  (new pokemonActions.SetMoveLists(moveLists));

  })
)
@Effect()
  buildGamesFeatured$: Observable<Action> = this.actions$.pipe(
    ofType<pokemonActions.SetMoveLists>(pokemonActions.PokemonActionTypes.SetMoveLists),
    withLatestFrom(this.store$.pipe(select(pokemonSelectors.getMoveLists))),
    map(([action, moveLists])=> new pokemonActions.SetGamesFeatured(Object.keys(moveLists).filter(key=> moveLists[key].length !== 0)))
  )
@Effect()
  initializeSelectedGame$: Observable<Action> = this.actions$.pipe(
    ofType<pokemonActions.SetMoveLists>(pokemonActions.PokemonActionTypes.SetMoveLists),
    map(action => new pokemonActions.SetSelectedGame(action.payload[0]))
  )
}

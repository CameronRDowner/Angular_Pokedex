import { PokemonActionTypes, PokemonActions } from './pokemon.actions';
import { Pokemon } from '../models/pokemon';
import { MoveLists } from '../models/move-lists';

export interface PokemonState {
    selectedGame: string,
    pokemon:Pokemon,
    moveLists:MoveLists,
}

const initialState: PokemonState = {
    selectedGame: "",
    pokemon: {} as Pokemon,
    moveLists: {} as MoveLists
}

export function reducer(state = initialState, action: PokemonActions): PokemonState {
    switch(action.type) {
       case PokemonActionTypes.SetSelectedGame:{
            return {
                ...state,
                selectedGame: action.payload
            };
       }
        case PokemonActionTypes.LoadPokemonSuccess:{
            return {
                ...state,
                pokemon: action.payload
            };
        }
        case PokemonActionTypes.LoadPokemonFailure:{
            console.log(action.payload);
            return {
                ...state
            }
        }
        case PokemonActionTypes.SetMoveLists: {
            return {
                ...state,
                moveLists: action.payload
            }
        }
        default:
            return state;
    }
}
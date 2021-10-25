
import { computed } from "vue";
import { GetterTree, Module, MutationTree, Store } from "vuex";
import { StateModuleFactory } from "../models";



export interface WithSearchState {
    search?: string;    
}



export function createSearchModule<R>() {
    const m : Module<WithSearchState,R> = {
        state() {
            const s : WithSearchState = { };
            return s;
        },
        getters: {
            search: (state: WithSearchState)=> state.search,
            isSearching: (state: WithSearchState)=> !!state.search,            
        },
        mutations: {
            setSearch: (state: WithSearchState, payload?: string)=> state.search = payload,            
        }
    }

    return m;
}

export function withSearch(): StateModuleFactory<WithSearchState> {
    return <R>()=> {
        return createSearchModule<R>();
    }
}
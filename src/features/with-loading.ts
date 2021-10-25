
import { GetterTree, Module, MutationTree, Store } from "vuex";
import { StateModuleFactory } from "../models";


export interface WithLoadingState {
    isLoading: boolean;
    isLoaded: boolean;
}


export function createLoadingModule<R>() {
    const m : Module<WithLoadingState,R> = {
        state() {
            const s : WithLoadingState = { isLoading: false, isLoaded: false };
            return s;
        },
        getters: {
            isLoading: (state: WithLoadingState, payload: boolean)=> state.isLoading,
            isLoaded: (state: WithLoadingState, payload: boolean)=> state.isLoaded,
        },
        mutations: {
            setIsLoading: (state: WithLoadingState, payload: boolean)=> state.isLoading = payload,
            setIsLoaded: (state: WithLoadingState, payload: boolean)=> state.isLoaded = payload,
        }
    }

    return m;
}

export function withLoading(): StateModuleFactory<WithLoadingState> {
    return <R>()=> {
        return createLoadingModule<R>();
    }
}
import { Module } from "vuex";
import { StateModuleFactory } from "../models";



export interface WithItemState<T> {
    item: T | null;
}


 function createItemModule<T,R>() {    
    type M = Module<WithItemState<T>, R>;
    const m: M = {
        state() {
            return { item: null } // undefined
        },
        getters: {
            item: (state: WithItemState<T>) => state.item,
            hasItem: (state: WithItemState<T>)=> state.item !== null,
        },
        mutations: {
            setItem: (state: WithItemState<T>, payload: T) => state.item = payload,
            clearItem: (state: WithItemState<T>) => state.item = null,
        },
    }

    return m;
 }

export function withItem<T>(): StateModuleFactory<WithItemState<T>> {
    const factory : StateModuleFactory<WithItemState<T>> = <R>() => {
        return createItemModule<T,R>();        
    }
    return factory;
}
import { Module } from 'vuex';
import { StateModuleFactory } from "../models";

export interface EmptyState {}

 function createEmptyModule<R>() {    
    type M = Module<EmptyState, R>;
    const m: M = {
        namespaced: true,
        state() {
            return { } // undefined
        },        
    }

    return m;
 }

export function emptyModule(): StateModuleFactory<EmptyState> {
    const factory : StateModuleFactory<EmptyState> = <R>() => {
        return createEmptyModule<R>();        
    }
    return factory;
}
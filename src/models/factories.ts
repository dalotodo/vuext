import { Module } from 'vuex';

// export interface RecipeFactory<U> {
//     <S,R>(module: Module<S,R>): Module<S & U, R>;
// }


export interface ModuleFactory<S,R> {
    (): Module<S,R>;
}


export interface StateModuleFactory<S> {
    <R>(): Module<S, R>;
}


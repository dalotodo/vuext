import { Module } from "vuex";
import { StateModuleFactory } from "../models";



export interface WithItemsState<T> {
    items: T[];
}

function createItemsModule<T, R>() {
    type M = Module<WithItemsState<T>, R>;
    const m: M = {
        state() {
            return { items: [] }
        },
        getters: {
            items: (state: WithItemsState<T>) => state.items,
            hasItems: (state: WithItemsState<T>) => state.items.length != 0,
        },
        mutations: {
            setItems: (state: WithItemsState<T>, payload: T[]) => state.items = payload,
            clearItems: (state: WithItemsState<T>) => state.items.length = 0,
        },
    }

    return m;
}

export function withItems<T>(): StateModuleFactory<WithItemsState<T>> {
    const factory: StateModuleFactory<WithItemsState<T>> = <R>() => {
        return createItemsModule<T, R>();
    }
    return factory;
}
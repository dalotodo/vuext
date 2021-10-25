import { Module } from "vuex";
import { StateModuleFactory } from "../models";



export interface WithSelectedItemState<T> {
    selected?: T;
}

function createSelectedItemModule<T, R>() {
    type M = Module<WithSelectedItemState<T>, R>;
    const m: M = {
        state() {
            return { selected: undefined }
        },
        getters: {
            selected: (state: WithSelectedItemState<T>) => state.selected,
            isSelected: (state: WithSelectedItemState<T>) => (typeof state.selected !== 'undefined'),
        },
        mutations: {
            setSelected: (state: WithSelectedItemState<T>, payload: T) => state.selected = payload,
            clearSelected: (state: WithSelectedItemState<T>) => state.selected = undefined,
        },
    }

    return m;
}

export function withSelectedItem<T>(): StateModuleFactory<WithSelectedItemState<T>> {
    const factory: StateModuleFactory<WithSelectedItemState<T>> = <R>() => {
        return createSelectedItemModule<T, R>();
    }
    return factory;
}
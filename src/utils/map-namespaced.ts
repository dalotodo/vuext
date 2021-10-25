import { computed, ComputedRef, WritableComputedRef } from "vue";
import { Store } from "vuex";
import { ModuleRef } from "../models";

type MapNamespacedArg = string | string[] | ModuleRef;

interface MapNamespacedUtilityHelper {
    getter<T>(name: string): T;
    computed<T>(name: string): ComputedRef<T>;
    readonly<T>(name: string): ComputedRef<T>;
    readwrite<T>(getter: string, mutation: string): WritableComputedRef<T>;

    commit<P=unknown>(name: string, payload?: P): void;

    action<T,P=unknown>(name:string, payload?: P): Promise<T>;
}

export function mapNamespaced<R>(store: Store<R>, arg: string): MapNamespacedUtilityHelper;
export function mapNamespaced<R>(store: Store<R>, arg: string[]): MapNamespacedUtilityHelper;
export function mapNamespaced<R>(store: Store<R>, arg: ModuleRef): MapNamespacedUtilityHelper;
export function mapNamespaced<R>(store: Store<R>, arg: MapNamespacedArg): MapNamespacedUtilityHelper {
    let namespace: string = (() => {
        const filters = [
            { match: (x: MapNamespacedArg) => Array.isArray(x), result: (x: MapNamespacedArg) => (x as string[]).join('/') },
            { match: (x: MapNamespacedArg) => typeof (x) === 'object' && x !== null, result: (x: MapNamespacedArg) => (x as ModuleRef).namespace },
            { match: (x: MapNamespacedArg) => typeof (x) === 'string' && x !== null, result: (x: MapNamespacedArg) => (x as string) },
            { match: (x: MapNamespacedArg) => true, result: (x: MapNamespacedArg) => '' },
        ];

        const f = filters.find(f => f.match(arg));
        if (!f) throw new Error('Argument does not match mapNamespaced signature');

        return f.result(arg);
    })();

    const helper: MapNamespacedUtilityHelper = {
        getter<T = any>(name: string) { return <T>store.getters[`${namespace}/${name}`]; },
        computed<T = any>(name: string) { return computed(() => <T>store.getters[`${namespace}/${name}`]); },
        readonly<T = any>(name: string) { return computed(() => <T>store.getters[`${namespace}/${name}`]); },
        readwrite<T = any>(getter: string, mutation: string) {
            return computed({
                get: () => <T>store.getters[`${namespace}/${getter}`],
                set: (value: T) => store.commit(`${namespace}/${mutation}`, value)
            });
        },

        commit<P=any>(name: string, payload?: P) { store.commit(`${namespace}/${name}`, payload) },

        async action<T=any,P=any>(name: string, payload?: P) { return <T>(await store.dispatch(`${namespace}/${name}`, payload )); },

    }
    return helper;
}
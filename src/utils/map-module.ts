import { Module, Store } from "vuex";
import { ModuleFactory, ModuleRef } from "../models";
import { requireModule } from "./require-module";
import { mapNamespaced, MapNamespacedUtilityHelper } from './map-namespaced'

type RequireModuleArg = string | string[] | ModuleRef;


export function mapModule<S, R>(store: Store<R>, arg: string, factory?: ModuleFactory<S, R>): MapNamespacedUtilityHelper<R>;
export function mapModule<S, R>(store: Store<R>, arg: string[], factory?: ModuleFactory<S, R>): MapNamespacedUtilityHelper<R>;
export function mapModule<S, R>(store: Store<R>, arg: ModuleRef, factory?: ModuleFactory<S, R>): MapNamespacedUtilityHelper<R>;
export function mapModule<S, R>(store: Store<R>, arg: RequireModuleArg, factory?: ModuleFactory<S, R>): MapNamespacedUtilityHelper<R> {        
    const filters = [
        { match: (x: RequireModuleArg) => Array.isArray(x), result: (x: RequireModuleArg) => (x as string[]) },
        { match: (x: RequireModuleArg) => typeof (x) === 'object' && x !== null, result: (x: RequireModuleArg) => (x as ModuleRef).path },
        { match: (x: RequireModuleArg) => typeof (x) === 'string' && x !== null, result: (x: RequireModuleArg) => (x as string).split('/') },
        // { match: (x: RequireModuleArg) => true, result: (x: RequireModuleArg) => [] },
    ];

    const f = filters.find(f => f.match(arg));
    if (!f) throw new Error('Argument does not match useModule signature');
    const modulePath = f.result(arg);
    const moduleRef = requireModule<S,R>(store, modulePath, factory);
    
    return mapNamespaced<R>(store, moduleRef);
}
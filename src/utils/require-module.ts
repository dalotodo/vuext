import { Module, Store } from "vuex";
import { ModuleFactory, ModuleRef } from "../models";
import { createModuleRef } from "./create-module-ref";

type RequireModuleArg = string | string[] | ModuleRef;


export function requireModule<S, R>(store: Store<R>, arg: string, factory?: ModuleFactory<S, R>): ModuleRef;
export function requireModule<S, R>(store: Store<R>, arg: string[], factory?: ModuleFactory<S, R>): ModuleRef;
export function requireModule<S, R>(store: Store<R>, arg: ModuleRef, factory?: ModuleFactory<S, R>): ModuleRef;
export function requireModule<S, R>(store: Store<R>, arg: RequireModuleArg, factory?: ModuleFactory<S, R>): ModuleRef {
    const filters = [
        { match: (x: RequireModuleArg) => Array.isArray(x), result: (x: RequireModuleArg) => (x as string[]) },
        { match: (x: RequireModuleArg) => typeof (x) === 'object' && x !== null, result: (x: RequireModuleArg) => (x as ModuleRef).path },
        { match: (x: RequireModuleArg) => typeof (x) === 'string' && x !== null, result: (x: RequireModuleArg) => (x as string).split('/') },
        // { match: (x: RequireModuleArg) => true, result: (x: RequireModuleArg) => [] },
    ];

    const f = filters.find(f => f.match(arg));
    if (!f) throw new Error('Argument does not match requireModule signature');
    const modulePath = f.result(arg);
    const moduleRef = createModuleRef(modulePath)

    
    if (!store.hasModule(modulePath)) {   
        if (!factory) throw new Error(`Missing module factory for namespace '${moduleRef.namespace}'. This module should have been created at boot time.`)
        const module = factory();        
        store.registerModule(moduleRef.path, module);
    }

    return moduleRef;
}
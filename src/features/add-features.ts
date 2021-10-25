import { Module } from "vuex";
import { StateModuleFactory } from "../models";



function IS_FUNCTION(functionToCheck: any) { return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'; }

function GET_STATE<S,R>(module: Module<S,R>): S {
    let s : S;

    if (IS_FUNCTION(module.state)) {
        s = (module.state as ()=>S )();
    } else {
        s = (module.state as S);
    }

    return s;
}

function mergeModules<S,R,U>( m1: Module<S,R>, m2: Module<U,R> ): Module<S & U, R> {
    type TargetModuleType = Module<S & U, R>;
    const m : TargetModuleType = {
        // namespaced: m1.namespaced || m2.namespaced,
        namespaced: true, // By design featured modules are namespaced
        state() {
            const s1 = GET_STATE(m1);
            const s2 = GET_STATE(m2);
            return { ...s1, ...s2 };
        },        
        modules: { ...m1.modules, ...m2.modules },
        getters: { ...m1.getters, ...m2.getters },
        mutations: { ...m1.mutations, ...m2.mutations },
        actions: { ...m1.actions, ...m2.actions },        
    }

    return m;
}


export function addFeatures<S,R,U>(module: Module<S,R>, recipe: StateModuleFactory<U>): Module<S & U,R>;
export function addFeatures<S,R,U1,U2>(module: Module<S,R>, recipe1: StateModuleFactory<U1>, recipe2: StateModuleFactory<U2>): Module<S & U1 & U2,R>;
export function addFeatures<S,R,U1,U2,U3>(module: Module<S,R>, recipe1: StateModuleFactory<U1>, recipe2: StateModuleFactory<U2>, recipe3: StateModuleFactory<U3>): Module<S & U1 & U2 & U3,R>;
export function addFeatures<S,R,U1,U2,U3,U4>(module: Module<S,R>, recipe1: StateModuleFactory<U1>, recipe2: StateModuleFactory<U2>, recipe3: StateModuleFactory<U3>, recipe4: StateModuleFactory<U4>): Module<S & U1 & U2 & U3 & U4,R>;
export function addFeatures<S,R,U1,U2,U3,U4,U5>(module: Module<S,R>, recipe1: StateModuleFactory<U1>, recipe2: StateModuleFactory<U2>, recipe3: StateModuleFactory<U3>, recipe4: StateModuleFactory<U4>, recipe5: StateModuleFactory<U5>,): Module<S & U1 & U2 & U3 & U4 & U5,R>;
export function addFeatures<S,R,X=unknown>( module: Module<S,R>, ...recipes: StateModuleFactory<X>[] ) {
    let m : any = module;

    for (const recipe of recipes ) {
        const feature = recipe();
        m = mergeModules(m,feature);
    }
    return m;
}
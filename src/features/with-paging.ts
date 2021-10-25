
import { computed } from "vue";
import { GetterTree, Module, MutationTree, Store } from "vuex";
import { StateModuleFactory } from "../models";


const DEFAULT_TAKE = 25;

export interface WithPagingState {
    count: number;
    size: number;
    skip: number;
    take: number;
}



export function createPagingModule<R>() {
    const m : Module<WithPagingState,R> = {
        state() {
            const s : WithPagingState = { count: 0, size: 0, skip: 0, take: DEFAULT_TAKE };
            return s;
        },
        getters: {
            size: (state: WithPagingState)=> state.size,
            count: (state: WithPagingState)=> state.count,
            skip: (state: WithPagingState)=> state.skip,
            take: (state: WithPagingState)=> state.take,
            page: (state: WithPagingState)=> Math.floor(state.skip/state.take)+1,
            pages: (state: WithPagingState)=> Math.floor(state.size/state.take)+1,
        },
        mutations: {
            setSize: (state: WithPagingState, payload: number)=> state.size = payload,
            setCount: (state: WithPagingState, payload: number)=> state.count = payload,
            setSkip: (state: WithPagingState, payload: number)=> state.skip = payload,
            setTake: (state: WithPagingState, payload: number)=> {
                const take = (payload<=0)?DEFAULT_TAKE:payload;
                state.take = payload;
            },
            setPage: (state: WithPagingState, payload: number)=> {
                let page = Math.floor(payload) - 1;
                page = page<0?0:page;
                let skip = page*state.take;
                skip = skip>state.size?state.size:skip;
                state.skip = skip;
            }
        }
    }

    return m;
}

export function withPaging(): StateModuleFactory<WithPagingState> {
    return <R>()=> {
        return createPagingModule<R>();
    }
}
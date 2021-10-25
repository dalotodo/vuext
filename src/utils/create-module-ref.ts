import { ModuleRef } from "../models";

export function createModuleRef(path: string[]) {
    if (!path || (path.length<1)) throw new Error('Invalid path');    
    const moduleRef: ModuleRef = {
        path,
        namespace: path.join('/')
    }

    return moduleRef;
}
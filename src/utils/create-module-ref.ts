import { ModuleRef } from "../models";

export function createModuleRef(path: string[]) {
    const moduleRef: ModuleRef = {
        path,
        namespace: path.join('/')
    }

    return moduleRef;
}
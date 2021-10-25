import { createModuleRef } from '@/index'


describe( 'Create module', ()=> {
    it('should throw an error if no path is given', ()=> {
        const t = ()=> createModuleRef([])        
        expect(t).toThrow(Error);
    })
})
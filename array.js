import * as memory from './memory.js';

class Array {
    constructor(){
        this.length = 0;
        this.ptr = memory.allocate(this.length);  
    }

    _resize(size){
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        memory.copy(this.ptr,oldPtr,size);
        memory.free(oldPtr);
    }
}


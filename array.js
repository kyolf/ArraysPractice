import * as memory from './memory.js';

class Array {
    //everytime we create a new array object, the initial values are defined here
    constructor(){
        this.length = 0;
        this.ptr = memory.allocate(this.length);  
        this.sizeOfArray = this.length;
      }

    //_ is a naming convention that makes this resize function only usuable within this array class
    //in short, makes it private
    _resize(size){
        //assigning a variable oldPtr to our current pointer
        const oldPtr = this.ptr;
        //creating the memory with a certain size and pointing this.ptr to the start of the array
        this.ptr = memory.allocate(size);
        //copying the values in the previous array to the new array
        memory.copy(this.ptr,oldPtr,size);
        //freeing old pointer (old array)
        memory.free(oldPtr);
        //size of new array
        this.sizeOfArray = size;
    }

    push(value){
      //checking if length of the array >= memory size of array
      //if it is, resize the array so you don't go out of memory
      if(this.length >= sizeOfArray){
        _resize((this.length+1)*10);
      }
      //set value to be at the end of the array length
      memory.set(this.ptr+this.length, value);
      //increment the length of the current array
      this.length++;
    }


}


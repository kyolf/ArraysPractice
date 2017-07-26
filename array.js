// import * as memory from './memory.js';
const memory = (() => {
  var memory = new Float64Array(1024);
  var head = 0;

  var allocate = function(size) {
    if (head + size > memory.length) {
      return null;
    }
    var start = head;
    head += size;
    return start;
  };

  var free = function(ptr) {
  };

  var copy = function(to, from, size) {
    if (from === to) {
      return;
    }
    else if (from > to) {
          // Iterate forwards
      for (var i=0; i<size; i++) {
        set(to + i, get(from + i));
      }
    }
    else {
          // Iterate backwards
      for (var i=size - 1; i>=0; i--) {
        set(to + i, get(from + i));
      }
    }
  };

  var get = function(ptr) {
    return memory[ptr];
  };

  var set = function(ptr, value) {
    memory[ptr] = value;
  };
  
  return {allocate, set, get, free, copy};
})();

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
      if(this.length >= this.sizeOfArray){
        this._resize((this.length+1)*10);
      }
      //set value to be at the end of the array length
      memory.set(this.ptr+this.length, value);
      //increment the length of the current array
      this.length++;
    }

    pop(){
        if(this.length === 0) {
            throw new Error('Can not pop an empty array!');
        }
        const value = memory.get(this.ptr + this.length -1);
        this.length --;

        return value;
    }

    get(index){
        if (index < 0 || index >= this.length){
            throw new Error ('Index error');
        }
        return memory.get(this.ptr + index);
       
    }
}

const array = new Array();

array.push(5);

console.log(array);
console.log(array.get(0));
console.log(array.pop());
console.log(array);


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
      //cant pop empty array
        if(this.length === 0) {
            throw new Error('Can not pop an empty array!');
        }
      //get the value of the last index of the array
        const value = memory.get(this.ptr + this.length -1);
      //subtract length by 1
        this.length --;
      //return the popped element
        return value;
    }

    get(index){
      //checking if index is not negative or greater than array size
        if (index < 0 || index >= this.length){
            throw new Error ('Index error');
        }
      //returning the value in the array at a specified index
        return memory.get(this.ptr + index);
       
    }
    
    insert(index, value){
      //checking if index is not negative
      if (index < 0 ){
          throw new Error ('Index error');
      }
      //checking if length of the array >= memory size of array
      //if it is, resize the array so you don't go out of memory
      if(this.length >= this.sizeOfArray){
        this._resize((this.length+1)*10);
      }
      //shifting all the values to the right of the index
      memory.copy(this.ptr+index+1,this.ptr+index,this.length-index);
      //setting the value at that index
      memory.set(this.ptr+index,value);
      //incrementing the length
      this.length++;
    }

    remove(index){
      //cant remove an element from empty array
        if(this.length === 0) {
            throw new Error('Can not remove from an empty array!');
        }
      //checking if index is not negative or greater than array size
        if (index < 0 || index >= this.length){
            throw new Error ('Index error');
        }
        //shifting all the values to the left
        memory.copy(this.ptr+index,this.ptr+index+1,this.length-index-1);
        //subtracting the length
        this.length--;
    }
}

const array = new Array();

array.push(5);
array.push(10);
array.push(11);

console.log(array);
console.log(array.get(1));
console.log(array.insert(1,4));
console.log(array.get(1));



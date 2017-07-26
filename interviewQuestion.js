function lessNumber(arr,number){
    let newArr= [];
    for (let i =0; i<arr.length; i++){
        if(i >= number){
           newArr.push(i);
           // arr.splice(i,1);
        }
    }   
    return newArr;
   
}
// console.log(lessNumber([1,2,3,4,5,6,7,8],5));

// function mergeArrays(arr1, arr2){
//   let arr = [...arr1,...arr2];
//   // let sortedArr = [];
//   for(let i = 0; i< arr.length;i++){
//     for(let j = i+1; j<arr.length;j++){
//       if(arr[i]>arr[j]){
//         const temp = arr[j];
//         arr[j] = arr[i];
//         arr[i] = temp;
//       }
//     }
//   }
//   return arr;
// }

// function mergeArrays(arr1,arr2){
//   let arr = [...arr1,...arr2];
//   return arr.sort((a,b)=>a-b);
// }

function mergeArrays(arr1,arr2){
  let newArr = [];
  let d1 = 0,d2 = 0;
  while(d1< arr1.length){
    if(d2<arr2.length){
      if(arr1[d1]<arr2[d2]){
        newArr.push(arr1[d1]);
        d1++;
      }else if(arr1[d1]>arr2[d2]){
        newArr.push(arr2[d2]);
        d2++;
      }else{
        newArr.push(arr1[d1]);
        newArr.push(arr2[d2]);
        d1++;
        d2++;
      }
    }else{
      newArr.push(arr1[d1]);
      d1++;
    }
  }
  while(d2<arr2.length){
    newArr.push(arr2[d2]);
    d2++;
  }
  console.log('d1: ',d1,arr1.length);
  console.log('d2:',d2,arr2.length);
  return newArr;
}
console.log(mergeArrays([1,3,5,7,8,9],[2,4,6,8,10]));

function removeCharacters (string,char){
    //let remove =false;
    let newString='';
    for (let i = 0; i <= string.length; i++) {
       let remove=false;
        for (let j = 0; j< char.length; j++){
            if (string.charAt(i) === char.charAt(j)){
                remove =true;
            } 
            
        }
        if(remove === false){
            //remove=false;
            newString += string.charAt(i);
        }
    }
    return newString;
}
console.log(removeCharacters('amojdfj','ajf'));

function product(arr){
  let newArr = [];
  for(let i = 0; i < arr.length; i++){
    let slicedArr = [...arr.slice(0,i),...arr.slice(i+1)];
    newArr[i] = 1;
    for(let j = 0; j< slicedArr.length; j++){
      newArr[i] = newArr[i] * slicedArr[j];
    }  
  }
  return newArr;
}

console.log(product([1, 3, 9, 4]));

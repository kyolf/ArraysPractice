//     let newArr= [];
//     for (let i =0; i<arr.length; i++){
//         if(i >= number){
//            newArr.push(i);
//            // arr.splice(i,1);
//         }
//     }   
//     return newArr;
   
// }
// console.log(lessNumber([1,2,3,4,5,6,7,8],5));

function mergeArrays(arr1, arr2){
  let arr = [...arr1,...arr2];
  // let sortedArr = [];
  for(let i = 0; i< arr.length;i++){
    for(let j = i+1; j<arr.length;j++){
      if(arr[i]>arr[j]){
        const temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }
  return arr;
}

function mergeArrays(arr1,arr2){
    let arr = [...arr1,...arr2];
    return arr.sort((a,b)=>a-b);
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
 
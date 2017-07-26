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
console.log(lessNumber([1,2,3,4,5,6,7,8],5));

/* 
    题目：https://github.com/zhangxinxu/quiz/issues/11
    equalObject()比较对象是否相等，原生相等
    equalArray()比较数组是否相等，原生相等
    equal()比较对象或者数组是否相等，结构值相等
*/

function equalObject(obj1, obj2){
    if(isArray(obj1) || isArray(obj2))return false;
    if(Object.keys(obj1).length !== Object.keys(obj2).length)return false;
    for (let key in obj1) {
        if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}

function equalArray(arr1, arr2){
    if(!isArray(obj1) || !isArray(obj2))return false;
    if(arr1.length !== arr2.length)return false;
    let i = -1,
        length = arr1.length;
    while(++i < length){
        if(arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true;
}

function equal(o1, o2){
    //return JSON.stringify(o1) === JSON.stringify(o2);
    if(typeof o1 !== typeof o2)return false;
    if(isArray(o1)){
        if(isArray(o2)){
            return _equalObjOrArr(o1, o2);
        }else{
            return false;
        }
    }
    if(typeof o1 === 'object'){
        return _equalObjOrArr(o1, o2);
    }else{
        return o1 === o2;
    }
}

function _equalObjOrArr(arr1, arr2){
    if(isArray(arr1)){
        if(arr1.length !== arr2.length)return false;
    }else{
        if(Object.keys(arr1).length !== Object.keys(arr2).length)return false;
    }
    for (let i in arr1) {
        if(typeof arr1[i] === 'object'){
            if(!equal(arr1[i], arr2[i]))return false;
        }else{
            if(arr1[i] !== arr2[i])return false;
        }
    }
    return true;
}

function isArray(obj){
    return obj instanceof Array;
}
/* function compose(...funcs){
    if(funcs.length===0){
        return arg=>arg
    }
    if(funcs.length===1){
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
} */







const compose=(...args)=>x=>args.reduceRight((acc,fn)=>fn(acc),x);

export const omit = (obj, keys) => {
  const { ...rest } = obj
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (rest.hasOwnProperty(key)) {
      delete rest[key]
    }
  }
  return rest
}

const pick = (obj, keys) => {
  const result = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
  }
  return result
}

function quickSort(list){
    if(list.length<2){
        return list;
    }
    // const pivot=random(list);
    const pivot=list[0];
    const less =list.filter(i=>i<pivot);
    const greater=list.filter(i=>i>pivot);
    return [
        ...quickSort(less),
        pivot,
        ...quickSort(greater)
    ];
}
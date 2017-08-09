import {Map,List} from 'immutable';
 const initialState={
    merchants:{
        entity:{
            'mer00':{
                sellerMerId:'mer00',
                sellerName:'sellerName0',
                goodsPerMer:['goods00','goods01',],
                isMergePay:'G1',
                merBussinessType:'00',
                typeOfProducts:2,
                totalCashPerMer:44050,
                totalPointPerMer:0,
            },
            'mer01' :{
                sellerMerId:'mer01',
                sellerName:'sellerName1',
                goodsPerMer:['goods02'],
                isMergePay:'Gnull',
                merBussinessType:'12',
                typeOfProducts:1,
                totalCashPerMer:20000,
                totalPointPerMer:0,
            },
        },
        byId:['mer00','mer01'],
    },
    vouchersByMer:{
        'mer00':{
            voucherPerMer:['v0','v1',]
        }
    },
    vouchers:{
        entity:{
            'v0':{
                id:'v0',
                name:'voucher0',
                discountAmount:20,
                type:'jianjia',
                startTime:'20170609',
                endTime:'20170807',
            },
            'v1':{
                id:'v1',
                name:'voucher1',
                discountAmount:0.8,
                type:'dazhe',
                startTime:'20170615',
                endTime:'201708014',
            }
        }
    }
} 
/* const initialState=Map({
    merchant:{
        entity:{

        },
        byId:[],
    },
    voucherByMer:{},
}); */

function dataFormater(dataArray,id){
    let hash={};
    for(let i=0;i<dataArray.length;i++){
        hash[dataArray[i][id]]=dataArray[i];
    }
    return hash;
}
/* function schemaForImmutable(list,idStr){
    let hashMap=Map();
    list.map((i)=>);
} */
function merchantProcessor(object,keys){
    let newObject={},idArray=[];
    for(let key in object){
        object[key].goodsPerMer=object[key].carItemList.map((good)=>good.goodsId)
        newObject[key]=object[key];
    }
    // console.log('newObject ',newObject);
    // idArray=Object.keys(newObject);
    return newObject;
}
function pick(obj,keys){
    const result={};
    for(let i=0;i>keys.length;i++){
        const key=keys[i];
        if(obj.hasOwnProperty(key)){
            result[key]=obj[key];
        }
    }
    return result; 
    /* return ()=>{
        keys.map((key)=>{

        });
    } */
}
function compose(...funcs){
    if(funcs.length===0){
        return arg=>arg
    }
    if(funcs.length===1){
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
// let test=compose(merchantProcessor,dataFormater('sellerMerId'),pick(action.payload));

export default function merchant(state=initialState,action){
    switch(action.type){
        case 'FETCH_CART_INFO':
            return Object.assign({},state,{
                merchants:{
                    entity:{
                        ...merchantProcessor(dataFormater(action.payload.validItems,'sellerMerId')),
                        ...state.merchants.entity
                    },
                    
                    // byId:[...state.merchants.byId,...action.payload.map(o=>o.sellerMerId)],
                    // byId:Object.keys(state.merchants.entity),
                    // byId:state.merchants.byId.concat(Object.keys(state.merchants.entity)),
                    byId:state.merchants.byId.concat(action.merIdArray),
                    
                }
            });

        default :
            return state;
    }
}
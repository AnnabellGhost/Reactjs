import {Map,List} from 'immutable';
const initialState={
    goods:{
        entity:{
            'goods00':{
                goodsId:'goods00',
                goodsName:'goodsName00',
                salePrice:32000,
                cnt:2
            },
            'goods01':{
                goodsId:'goods01',
                goodsName:'goodsName01',
                salePrice:12050,
                cnt:2
            },
            'goods02':{
                goodsId:'goods02',
                goodsName:'goodsName02',
                salePrice:10000,
                cnt:2
            }
        },
        byId:['goods00','goods01','goods02'],
    },
}
function schemaTest(object,id){
    let hash={};
    console.log(object);
    hash[object[id]]=object;
    return hash;
    
    /* for (key in object){
    } */
}
function dataFormater(dataArray,id){
    let hash={};
    for(let i=0;i<dataArray.length;i++){
        // array.push(schemaFunc(dataArray[i]),'goodsId');
        // hash[id]=schemaFunc(dataArray[i],id)
        hash[dataArray[i][id]]=dataArray[i];
    }
    console.log('dataFormater return value:',hash);
    return hash;
}
function goodsProcessor(merHash,state){/* Two layer */
    /* return data.validItems.map((merchant)=>{
        return [...merchant.carItemList]
    }) */
    let hash={};
    for(let key in merHash){
        hash={...hash,...dataFormater(merHash[key].carItemList,'goodsId')};
    }
    console.log(hash);
    return {
        entity:{...state.goods.entity,...hash},
        // byId:[...Object.keys(hash)]
        byId:state.goods.byId.concat(Object.keys(hash)),
    };
}

export default function goods(state=initialState,action){
    switch(action.type){
        case 'FETCH_CART_INFO':
            return Object.assign({},state,{goods:{...goodsProcessor(dataFormater(action.payload.validItems,'sellerMerId'),state)}}
                /* {
                    goods:{
                        entity:{
                            ...goodsProcessor(dataFormater(action.payload.validItems,'goodsId')),
                            // ...dataFormater(goodsProcessor(action.payload),'goodsId'),
                            ...state.goods.entity
                        },
                        byId:state.goods.byId,
                    }
                },
                {
                    goods:{
                        entity:{
                            ...state.goods.entity
                        },
                        byId:[...Object.keys(state.goods.entity)],
                    }
                } */

            )
            case 'SELECT_GOODS':
                return Object.assign({},state,{
                    goods:{

                    }
                });
            case 'INCREASE_GOODS_NUM':
                return Object.assign({},state,{
                    
                    goods:{
                        entity:{
                            ...state.goods.entity,
                            [action.goodsId]:
                                {
                                    ...state.goods.entity[action.goodsId],
                                    cnt:state.goods.entity[action.goodsId].cnt+1
                                },
                        },
                        byId:state.goods.byId,
                        
                    }
                });
        default :
            return state;
    }
}
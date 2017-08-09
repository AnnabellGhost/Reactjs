/* export function overView(initialState={},action){

} */
import {combineReducers} from 'redux';
import merchant from './merchant.js';
import goods from './goods.js';
import overView from './overView.js';
console.log(goods);
const initialState={
    merchants:{
        entity:{
            'mer00':{
                id:'mer00',
                name:'sellerName0',
                goodsPerMer:['goods00','goods01',],
                isMergePay:'G1',
                merBussinessType:'00',
                typeOfProducts:2,
                totalCashPerMer:44050,
                totalPointPerMer:0,
            },
            'mer01' :{
                id:'mer01',
                name:'sellerName1',
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
    goods:{
        entity:{
            'goods00':{
                id:'goods00',
                name:'goodsName00',
                price:32000,
            },
            'goods01':{
                id:'goods01',
                name:'goodsName01',
                price:12050,
            },
            'goods02':{
                id:'goods02',
                name:'goodsName02',
                price:10000,
                cnt:2
            }
        },
        byId:['goods00','goods01','goods02'],
    },
    orderInfo:{
        selectedCash:0,
        selectedPoint:0,
        countOfProducts:0,
        countOfType:0,
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

let cart=combineReducers({merchant,goods,overView});
export default cart;
import {fromJS,i} from 'immutable';
const MOCK_DATA=
{
    validItems: [
        {
        sellerMerId: 'P1000492',
        isMergePayGroup: 'G1',
        count: 2,
        isExistCoupon: 'false',
        merBusinessType: '00',
        sellerName: '万里通',
        carItemList: [
            {
            purePoints: 1000000,
            sellerMerId: 'P1000492',
            goodsId: 5165,
            cnt: 1,
            status: '03',
            stableCashPrice: 9999.99,
            limitNum: 999993,
            cartId: 837,
            sellerName: '万里通',
            repositoryId: 12503,
            isActivity: 'false',
            stock: 45,
            cartItemId: 59207,
            goodsImg: '//lpms-jf-p1-stg.wanlitong.com/goodsimg/cms/file/2016_8_31/H5_1472610496774_160_160.jpg',
            stablePointsPrice: 100,
            specification: '香辣鸡腿堡',
            merBusinessType: '00',
            payType: '02',
            salePrice: 11,
            rebateMultiple: 2,
            goodsProperty: '002001',
            isMultiFlag: 0,
            goodsName: '香辣鸡腿堡',
            checked: false,
            subTotalPoints: 0,
            subTotalPrice: 11,
            chsType: 2,
            isActiviting: false,
            limitBuyNum: 5,
            ifOverLimit: false,
            isStock: false
            },
            {
            purePoints: 1000,
            sellerMerId: 'P1000492',
            goodsId: 57187,
            cnt: 1,
            status: '03',
            stableCashPrice: 10,
            limitNum: 999996,
            cartId: 837,
            sellerName: '万里通',
            repositoryId: 12503,
            isActivity: 'false',
            stock: 9994,
            cartItemId: 59203,
            goodsImg: '//lpms-jf-p1-stg.wanlitong.com/goodsimg/cms/file/2017_1_22/APP_1485078218158_160_160.png',
            stablePointsPrice: 100,
            specification: '张剑锋',
            merBusinessType: '00',
            payType: '02',
            salePrice: 0,
            rebateMultiple: 3,
            goodsProperty: '002003',
            isMultiFlag: 0,
            goodsName: '允指原味鸡RRRR',
            checked: false,
            subTotalPoints: 0,
            subTotalPrice: 0,
            chsType: 2,
            isActiviting: false,
            limitBuyNum: 5,
            ifOverLimit: false,
            isStock: false
            }
        ],
        checked: false,
        chsType: 2
        },
        {
        sellerMerId: 'P1000045',
        isMergePayGroup: 'G1',
        count: 1,
        isExistCoupon: 'false',
        merBusinessType: '00',
        sellerName: 'zhengyong',
        carItemList: [
            {
            sellerMerId: 'P1000045',
            goodsId: 60129,
            cnt: 2,
            status: '03',
            limitNum: 999999,
            cartId: 837,
            sellerName: 'zhengyong',
            repositoryId: 12503,
            isActivity: 'false',
            stock: 55,
            cartItemId: 61579,
            goodsImg: '//lpms-jf-p1-stg.wanlitong.com/goodsimg/cms/file/2017_7_14/APP_1499997060210_160_160.png',
            specification: '',
            payType: '02',
            merBusinessType: '00',
            rebateMultiple: 0,
            salePrice: 5,
            goodsProperty: '001001',
            isMultiFlag: '0',
            goodsName: '44',
            checked: false,
            subTotalPoints: 0,
            subTotalPrice: 10,
            chsType: 1,
            isActiviting: false,
            limitBuyNum: 55,
            ifOverLimit: false,
            isStock: false
            }
        ],
        checked: false,
        chsType: 1
        },
    ]
}


export function fetchCartInfo(){
    return {
        type:'FETCH_CART_INFO',
        payload:MOCK_DATA,
        merIdArray:MOCK_DATA.validItems.map((mer)=>mer.sellerMerId),
    }
}
export function getMerchantsList(){
    return {
        type:'GET_MERCHANT_LIST',
        payload:MOCK_DATA.validItems,
    }
}
export function onGoodsSelectedCal(){
    return {
        type:'ON_GOODS_SELECTED_CALCULATION',
        payload:5165,
    }
}
export function increaseGoodsNum(goodsId){
    return {
        type:'INCREASE_GOODS_NUM',
        goodsId,
    }
}
const initialState={
    orderInfo:{
        selectedCash:0,
        selectedPoint:0,
        countOfProducts:0,
        countOfType:0,
    },
    selectedGoods:{

    }
}
function calculateTotal(productsIdArray){

}
export default function overView(state=initialState,action){
    switch(action.type){
        case 'ON_GOODS_SELECTED_CALCULATION':/* param :array of selected goods with all the info in cart.goods */
            return Object.assign({},state,{

            });
        case 'CALCULATION_TOTAL':
            return Object.assign({},state,{
                orderInfo:calculateTotal(action.payload),
            });
        
        default :
            return state;
    }
}
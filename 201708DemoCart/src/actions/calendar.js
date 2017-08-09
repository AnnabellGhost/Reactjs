// schema



const FLATTEN_MOCK_DATA={
    plansPerMonth:{
        byId:{
           '20177':{
               monthID:'20177',
               plansPerMonth:['2017712','2017723'],
           },
            '20176':{
               monthID:'20176',
               plansPerMonth:['2017610'],
           },
        },
        allIds:['20177','20176'],
    },
    plansPerDay:{
        byId:{
            '2017712':['plan02133','plan02130','plan02131'],
            '2017723':['plan02137'],
            '2017610':['plan03333'],
        },
        allIds:[],
    },
    plans:{
        byId:{
            'plan02133':{planName:'deposite1',amount:1200},
            'plan02130':{planName:'deposite2',amount:200},
        }
    }
}


const MOCK_DATA=[
            {   
                monthID:'20177',
                plansPerMonth:[
                    {
                        dateOfMonth:23,
                        plansPerDay:[
                            {
                                id:'02133',
                                planName:'Deposite',
                                amount:'200',
                            },
                            {
                                id:'02131',
                                planName:'Deposite',
                                amount:'1200', 
                            },
                            {
                                id:'02130',
                                planName:'TransOut',
                                amount:'600',
                            },
                        ]
                    },
                    {
                        dateOfMonth:12,
                        plansPerDay:[
                            {
                                planName:'Deposite',
                                amount:'200',
                            },
                            {
                                planName:'Deposite',
                                amount:'1200', 
                            },
                            {
                                planName:'TransOut',
                                amount:'600',
                            },
                        ]
                    },
                    
                ],
            },
            {
                monthID:'20179',
                plansPerMonth:[
                    {
                        dateOfMonth:3,
                        plansPerDay:[
                            {
                                planName:'Deposite',
                                amount:'200',
                            },
                            {
                                planName:'Deposite',
                                amount:'1200', 
                            },
                            {
                                planName:'TransOut',
                                amount:'600',
                            },
                        ]
                    },
                    
                ], 
            },
        ]


    
// filter((item)=>{item.monthID==monthID})
export function fetchPlansMonthly(monthID){
    return {
        type:'FETCH_CALENDAR_MONTH',
        payload:{ID:monthID,...MOCK_DATA[0]}
    }
}
export function getPlansMonthlyCache(monthID){
    return {
        type:'GET_CALENDAR_PLANS',
        payload:MOCK_DATA[monthID],
    }
}

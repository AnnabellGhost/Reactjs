const MOCK_DATA=[
            {   
                monthID:'201706',
                plans:[
                    {
                        dateOfMonth:23,
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
                monthID:'201707',
                plans:[
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

export function fetchPlansMonthly(monthID){
    return {
        type:'FETCH_CALENDAR_PLANS',
        monthID:monthID,
        payload:MOCK_DATA.filter((item)=>{item.monthID==monthID}),
    }
}
export function getPlansMonthlyCache(monthID){
    return {
        type:'GET_CALENDAR_PLANS',
        payload:MOCK_DATA[monthID],
    }
}

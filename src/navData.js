export const navData = [
    {
        id: 1,
        name:"Home",
        path:"/"
    },
    {
        id:2,
        name:"Services",
        children:[

            {
              id:"service1",
              name:"Top",
              path: "/top"
            },
             {
                id:"service2",
                name:"Best",
                path:"/best"
            },

            {
                id:"service3",
                name:"Good",
                path:"/good"
            },
        ]
        
    },
    {
        id:3,
        name:"Contact",
        path:"/contact"
    }
]
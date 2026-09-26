
const MARKET_DATA = {

    timeLabels: [
        "9:15","9:30","9:45","10:00","10:15","10:30","10:45",
        "11:00","11:15","11:30","11:45","12:00","12:15","12:30",
        "12:45","13:00","13:15","13:30","13:45","14:00","14:15",
        "14:30","14:45","15:00","15:15","15:30"
    ],

    sensex: {
        prices: [
            79521.40, 79618.75, 79542.10, 79710.55, 79834.20, 79902.60, 79988.30,
            80105.45, 80240.10, 80318.85, 80197.50, 80070.20, 80143.60, 80062.30,
            80011.75, 80090.40, 80204.15, 80289.70, 80354.20, 80412.85, 80476.50,
            80389.10, 80302.40, 80440.65, 80521.90, 80485.30
        ],
        high52w: 85978.25,
        low52w:  71896.50,
        prevClose: 79387.20
    },

    nifty: {
        prices: [
            24108.30, 24154.75, 24122.40, 24198.60, 24261.85, 24295.40, 24338.10,
            24402.55, 24475.20, 24511.80, 24448.30, 24381.60, 24420.90, 24378.45,
            24349.70, 24398.25, 24452.10, 24488.60, 24531.40, 24568.85, 24601.30,
            24557.90, 24504.20, 24572.45, 24619.80, 24598.10
        ],
        high52w: 26277.35,
        low52w:  21964.60,
        prevClose: 24055.60
    },

    breadth: {
        advancers: 1842,
        decliners: 897,
        unchanged: 124,
        volume: 4218.6,       
        turnover: 87432.5     
    },

    topMovers: [
        { name: "RELIANCE",  sector: "Energy",       price: 2847.55, change: +62.30,  pct: +2.24, volume: "28.4L" },
        { name: "HDFC BANK", sector: "Banking",      price: 1724.90, change: +34.15,  pct: +2.02, volume: "19.1L" },
        { name: "INFOSYS",   sector: "IT",           price: 1638.45, change: -18.60,  pct: -1.12, volume: "14.7L" },
        { name: "TCS",       sector: "IT",           price: 3892.10, change: -42.50,  pct: -1.08, volume: "9.8L"  },
        { name: "ICICI BANK",sector: "Banking",      price: 1245.30, change: +21.80,  pct: +1.78, volume: "22.3L" },
        { name: "BAJFINANCE",sector: "NBFC",         price: 7214.60, change: +189.40, pct: +2.70, volume: "7.2L"  },
        { name: "WIPRO",     sector: "IT",           price: 468.75,  change: -6.45,   pct: -1.36, volume: "31.5L" },
        { name: "TITAN",     sector: "Consumer",     price: 3421.50, change: +98.25,  pct: +2.96, volume: "5.9L"  },
        { name: "LT",        sector: "Infra",        price: 3687.40, change: +54.70,  pct: +1.51, volume: "6.1L"  },
        { name: "NESTLEIND", sector: "FMCG",         price: 2318.85, change: -29.35,  pct: -1.25, volume: "3.4L"  }
    ]
};
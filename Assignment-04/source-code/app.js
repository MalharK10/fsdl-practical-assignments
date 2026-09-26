
(function () {
    "use strict";


    function fmt(num) {
        return num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calcChange(prices, prevClose) {
        const current = prices[prices.length - 1];
        const change  = current - prevClose;
        const pct     = (change / prevClose) * 100;
        return { current, change, pct };
    }

    function arrHigh(arr) { return Math.max(...arr); }
    function arrLow(arr)  { return Math.min(...arr); }

    function setEl(id, html) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }

    function addClass(id, cls) {
        const el = document.getElementById(id);
        if (el) el.classList.add(cls);
    }


    function renderStats() {
        const s = MARKET_DATA.sensex;
        const n = MARKET_DATA.nifty;
        const b = MARKET_DATA.breadth;

        const sensex = calcChange(s.prices, s.prevClose);
        const nifty  = calcChange(n.prices,  n.prevClose);

        setEl("sensexValue", `₹${fmt(sensex.current)}`);
        const sDir = sensex.change >= 0 ? "▲" : "▼";
        const sClass = sensex.change >= 0 ? "positive" : "negative";
        setEl("sensexChange",
            `<span class="${sClass}">${sDir} ${fmt(Math.abs(sensex.change))} (${sensex.pct.toFixed(2)}%)</span>`
        );
        setEl("sensexHigh", `₹${fmt(arrHigh(s.prices))}`);
        setEl("sensexLow",  `₹${fmt(arrLow(s.prices))}`);

        setEl("niftyValue", `₹${fmt(nifty.current)}`);
        const nDir   = nifty.change >= 0 ? "▲" : "▼";
        const nClass = nifty.change >= 0 ? "positive" : "negative";
        setEl("niftyChange",
            `<span class="${nClass}">${nDir} ${fmt(Math.abs(nifty.change))} (${nifty.pct.toFixed(2)}%)</span>`
        );
        setEl("niftyHigh", `₹${fmt(arrHigh(n.prices))}`);
        setEl("niftyLow",  `₹${fmt(arrLow(n.prices))}`);

        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
        setEl("lastUpdated", `Data as of: ${now.toDateString()} · ${timeStr}`);
    }


    function makeGradient(ctx, colorRgb) {
        const grad = ctx.createLinearGradient(0, 0, 0, 300);
        grad.addColorStop(0,   `rgba(${colorRgb}, 0.35)`);
        grad.addColorStop(0.7, `rgba(${colorRgb}, 0.08)`);
        grad.addColorStop(1,   `rgba(${colorRgb}, 0.00)`);
        return grad;
    }

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: "easeOutCubic" },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#0e1420",
                titleColor: "#5a7a9a",
                bodyColor: "#dce8f5",
                borderColor: "#2d4263",
                borderWidth: 1,
                padding: 12,
                callbacks: {
                    label: ctx => `  ₹${ctx.parsed.y.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
                }
            }
        },
        scales: {
            x: {
                grid:  { color: "rgba(30,41,59,0.6)", drawBorder: false },
                ticks: { color: "#5a7a9a", font: { family: "'Space Mono', monospace", size: 10 } }
            },
            y: {
                beginAtZero: false,
                position: "right",
                grid:  { color: "rgba(30,41,59,0.6)", drawBorder: false },
                ticks: {
                    color: "#5a7a9a",
                    font: { family: "'Space Mono', monospace", size: 10 },
                    callback: v => "₹" + v.toLocaleString("en-IN")
                }
            }
        },
        elements: {
            point: { radius: 0, hoverRadius: 5, hoverBorderWidth: 2 }
        }
    };

    function renderCharts() {
        const labels = MARKET_DATA.timeLabels;

        const sensexCtx = document.getElementById("sensexChart").getContext("2d");
        new Chart(sensexCtx, {
            type: "line",
            data: {
                labels,
                datasets: [{
                    label: "SENSEX",
                    data: MARKET_DATA.sensex.prices,
                    borderColor: "#3b82f6",
                    backgroundColor: makeGradient(sensexCtx, "59,130,246"),
                    tension: 0.35,
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: commonOptions
        });

        // NIFTY chart
        const niftyCtx = document.getElementById("niftyChart").getContext("2d");
        new Chart(niftyCtx, {
            type: "line",
            data: {
                labels,
                datasets: [{
                    label: "NIFTY 50",
                    data: MARKET_DATA.nifty.prices,
                    borderColor: "#8b5cf6",
                    backgroundColor: makeGradient(niftyCtx, "139,92,246"),
                    tension: 0.35,
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: commonOptions
        });
    }


    function init() {
        renderStats();
        renderCharts();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
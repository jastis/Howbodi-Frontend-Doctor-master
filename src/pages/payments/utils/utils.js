export const x = {
  grid: {
    display: false,
    lineWidth: 0,
    color: "#f4f4f4",
    drawBorder: false,
  },
  ticks: {
    color: "#000", // not 'fontColor:' anymore
    font: {
      size: 12,
    },
    // stepSize: 1,
    // beginAtZero: true,
  },
};


export const y = {
  grid: {
    // display: false,
    // lineWidth: 0,
    color: "#f4f4f4",
    drawBorder: false,
  },
  ticks: {
    color: "#000",
    font: {
      size: 14,
    },
  },
};

export const backgroundColor = [
        "#2a9d8f",
        "#f2f2f2",
        // "#ff8600"
      ]
    
export const plotData = [300, 150]

export const monthlyInterval = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  export const weeklyInterval = [
    "wk-1",
    "wk-2",
    "wk-3",
    "wk-4",
    "wk-5",
    "wk-6",
    "wk-7",
    "wk-8",
    "wk-9",
    "wk-10",
    "wk-11",
    "wk-12",
  ];

    export const yearlyInterval = [
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
    ];



export const handleChangeChart = (setPlotData, data, setInterval, interval, setChartLabel, duration) => {
  setPlotData(data);
  setInterval(interval);
  setChartLabel(duration)
} 

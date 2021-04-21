export const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
          fontColor: 'rgb(255, 255, 255)',
        },
        stacked: false,
      },
    ],
    xAxes: [
      {
        ticks: {
          fontColor: 'rgb(255, 255, 255)',
          autoSkip: true,
          maxTicksLimit: 15,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
}

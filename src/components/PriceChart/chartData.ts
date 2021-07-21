export const data = (labels, values) => {
  return {
    labels: labels,
    datasets: [
      {
        data: values,
        fill: false,
        borderColor: 'hsl(370, 20%, 40%)',
      },
    ],
  }
}

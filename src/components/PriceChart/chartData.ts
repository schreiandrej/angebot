export const data = (labels: string[], values: string[]) => {
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

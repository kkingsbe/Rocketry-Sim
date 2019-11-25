function graphData(containerID, array, step, yLabel)
{

  /*
  let labels = [];
  let series = [];

  for(let i = 0; i < array.length; i+=step)
  {
    let point = array[i];
    labels.push(point.x);
    series.push(point.y);
  }
  */

  let chart = am4core.create(
    containerID,
    "XYChart"
  )

  let timeAxis = chart.xAxes.push(new am4charts.ValueAxis());
  timeAxis.title.text = "Time (s)";
  timeAxis.title.fill = "#fff";

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = yLabel;
  valueAxis.title.fill = "#fff";

  let series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueX = "x";
  series.dataFields.valueY = "y";
  series.stroke = "#e0c638";
  series.fill = "#fff";

  chart.data = array;
}
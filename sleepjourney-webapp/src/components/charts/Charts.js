import ChartComponent, { Chart } from 'react-chartjs-2';
import ChartJsAnnotation from 'chartjs-plugin-annotation';
import MuiBox from '@mui/material/Box';

import useWidthStyles from 'utils/useWidthStyles';

export default function Charts(props) {
  const { anchor, data, width, height, widthControlExt } = props;

  const chartEl = React.useRef(null);
  const widthStyles = useWidthStyles(widthControlExt);

  if (!data) {
    // No data
    return data;
  }

  Chart.pluginService.register(ChartJsAnnotation);
  const dataJson = eval('(' + data + ')');
  const { options, type } = dataJson;

  function setCustomLegend(chart) {
    const text = [];
    text.push('<ul>');
    if (chart.config.type === 'pie') {
      chart.data.labels.forEach((label, i) => {
        text.push(
          '<li>' +
            label +
            '<span style="background-color:' +
            chart.data.datasets[0].backgroundColor[i] +
            '"></span></li>'
        );
      });
    } else {
      chart.data.datasets.forEach((data) => {
        const bgColour = Array.isArray(data.backgroundColor)
          ? data.backgroundColor[0]
          : data.backgroundColor;

        text.push(
          '<li>' +
            data.label +
            '<span style="background-color:' +
            bgColour +
            '"></span></li>'
        );
      });
    }

    text.push('</ul>');

    return text.join('');
  }

  function setPieChartHeight(chart) {
    if (chart.config.type === 'pie') {
      if (window.innerWidth < 780) {
        chart.canvas.parentNode.style.height = '240px';
      } else {
        chart.canvas.parentNode.style.height = '400px';
      }
    }
  }

  return (
    <MuiBox id={anchor} className={`chart-${type}`} sx={{ ...widthStyles }}>
      <ChartComponent
        ref={chartEl}
        {...dataJson}
        width={width ? parseInt(width, 10) : 100}
        height={height ? parseInt(height, 10) : 300}
        className={`chart-${type}`}
        options={{
          maintainAspectRatio: false,
          tooltips: false,
          hover: false,
          onResize: function (chart) {
            setPieChartHeight(chart);
            chart.update();
          },
          legendCallback: setCustomLegend,
          ...options,
        }}
      />
    </MuiBox>
  );
}

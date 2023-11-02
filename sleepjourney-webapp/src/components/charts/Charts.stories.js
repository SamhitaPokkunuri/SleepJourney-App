import React from 'react';
import Charts from './Charts';

const charts = {
  title: 'Components/Data Display/Charts',
  component: Charts,
  parameters: {
    layout: 'centered',
  },
};

const ChartsTemplate = (args) => <Charts {...args} />;

export const Pie = ChartsTemplate.bind({});

Pie.args = {
  data: "{\ntype: 'pie',\ndata: {\ndatasets: [\n{\ndata: [\n466,\n139,\n106,\n101,\n51,\n17,\n16,\n11,\n9,\n8,\n],\nbackgroundColor: [\n\"#aeb900\",\n\"#d7da91\",\n\"#01AAC2\",\n\"#f49a00\",\n\"#767264\",\n\"#e30612\",\n\"#01aac2\",\n\"#bba1b3\",\n\"#01aac2\",\n\"#2b6bab\",\n]\n}\n],\nlabels: [\n'Health and safety (466)',\n'Working hours (139)',\n'Business ethics (106)',\n'Environment (101)',\n'Payment (51)',\n'Discrimination (17)',\n'Young workers (16)',\n'Freedom of association (11)',\n'Forced labour (9)',\n'Disciplinary practices (8)'\n]\n},\noptions: {\nresponsive: true,\nlegend: {\ndisplay: true,\nposition: 'right',\nlabels: {\nboxWidth: 16,\nfontSize: 16,\nfontFamily: 'VodafoneRegular,Arial,sans-serif'\n}\n},\ntooltips: {\nenabled: false\n},\nelements: {\narc: {\nborderWidth: 0\n}\n}\n}\n}\n",
  label: 'legal-taxes',
  width: '100',
  height: '300',
  widthControlExt: { mobile: 12, tablet: 10, desktop: 8 },
};

export const Horizontal = ChartsTemplate.bind({});

Horizontal.args = {
  ...Pie.args,
  data: "{\ntype: \"horizontalBar\",\ndata: {\nlabels: [\n'2016',\n'2017',\n'2018',\n'2019*'\n],\ndatasets: [\n{\nlabel: 'Number of site assessments conducted by JAC**',\ndata: [\n61,\n69,\n81,\n79,\n],\nbackgroundColor: [\n'#979797',\n'#979797',\n'#979797',\n'#979797'\n],\n},\n{\nlabel: 'Number of supplier site assessments conducted by Vodafone',\ndata: [\n24,\n26,\n17,\n6\n],\nbackgroundColor: [\n'#e53333',\n'#e53333',\n'#e53333',\n'#e53333'\n],\n}\n]\n},\noptions: {\nlayout: {\npadding: {\nleft: 0,\nright: 0,\ntop: 0,\nbottom: 0\n}\n},\nscales: {\nxAxes: [{\nstacked: true,\nticks: {\nfontFamily: 'VodafoneRegular,Arial,sans-serif',\nfontSize: 18,\npadding: 10,\nbeginAtZero: true,\nmax: 120\n},\ngridLines: {\ndrawOnChartArea: false,\ndrawTicks: false\n}\n}],\nyAxes: [{\nstacked: true,\nticks: {\nfontFamily: 'VodafoneRegular,Arial,sans-serif',\nfontSize: 18,\npadding: 10,\n},\ngridLines: {\ndrawOnChartArea: false,\ndrawTicks: false\n}\n}]\n},\nlegend: {\ndisplay: true,\nposition: \"top\",\nalign: \"center\",\nlabels: {\nboxWidth: 16,\nfontSize: 16,\nfontFamily: 'VodafoneRegular,Arial,sans-serif'\n}\n},\nanimation: {\nonComplete: function () {\nvar chartInstance = this.chart;\nvar ctx = chartInstance.ctx;\nctx.font = Chart.helpers.fontString(\n'18', Chart.defaults.global.defaultFontStyle, 'VodafoneRegular,Arial,sans-serif'\n);\nctx.textAlign = 'center';\nctx.fillStyle = '#fff';\n\nthis.data.datasets.forEach(function (dataset, i) {\nvar meta = chartInstance.controller.getDatasetMeta(i);\nmeta.data.forEach(function (bar, index) {\nvar data = dataset.data[index];\nvar barWidth = bar._model.x - bar._model.base;\nvar centerX = bar._model.base + barWidth / 2;\n\nctx.fillText(\ndata,\ncenterX,\nbar._model.y\n);\n});\n});\nthis.data.datasets[0].data.forEach(function (data, index) {\nvar total = data + this.data.datasets[1].data[index];\nvar meta = chartInstance.controller.getDatasetMeta(1);\nvar posX = meta.data[index]._model.x;\nvar posY = meta.data[index]._model.y;\n\nctx.textAlign = \"left\";\nctx.fillStyle = '#000';\n\nctx.fillText(total, posX + 20, posY);\n}, this);\n}\n}\n}\n}",
  label: 'assessments-conducted',
};

export default charts;

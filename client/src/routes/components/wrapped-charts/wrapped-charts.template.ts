import { html } from '@microsoft/fast-element';
import { WrappedCharts } from './wrapped-charts';

export const template = html<WrappedCharts>`
  <zero-g2plot-chart type="column" :config="${(x) => x.chartConfig}">
    <chart-datasource
        resourceName="ALL_POSITIONS"
        server-fields="INSTRUMENT_NAME QUANTITY"
    ></chart-datasource>
  </zero-g2plot-chart>
`;

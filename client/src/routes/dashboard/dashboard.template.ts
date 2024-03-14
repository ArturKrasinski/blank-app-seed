import { html } from '@microsoft/fast-element';
import type { Dashboard } from './dashboard';

export const DashboardTemplate = html<Dashboard>`
  <zero-layout>
    <zero-layout-region>
      <zero-layout-item title="Grid Title">
        <zero-grid-pro>
          <grid-pro-genesis-datasource resource-name="ALL_POSITIONS"></grid-pro-genesis-datasource>
        </zero-grid-pro>
      </zero-layout-item>
      <zero-layout-item title="Charts Title">
        <zero-g2plot-chart type="column" :config="${(x) => x.chartConfig}">
          <chart-datasource
            resourceName="ALL_TRADES"
            server-fields="TRADE_DATETIME PRICE SIDE"
          ></chart-datasource>
        </zero-g2plot-chart>
      </zero-layout-item>
    </zero-layout-region>
  </zero-layout>
`;

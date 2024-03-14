import { html } from '@microsoft/fast-element';
import type { Dashboard } from './dashboard';

export const DashboardTemplate = html<Dashboard>`
  <zero-layout>
    <zero-layout-region type="vertical">
      <zero-layout-region>
        <zero-layout-item title="Grid Title">
          <zero-grid-pro>
            <grid-pro-genesis-datasource
              resource-name="ALL_POSITIONS"
            ></grid-pro-genesis-datasource>
          </zero-grid-pro>
        </zero-layout-item>
        <zero-layout-item title="All Positions tile (line example)">
          <zero-g2plot-chart type="line" :config="${(x) => x.tile1ChartConfig}">
            <chart-datasource
              resourceName="ALL_POSITIONS"
              server-fields="INSTRUMENT_NAME VALUE"
            ></chart-datasource>
          </zero-g2plot-chart>
        </zero-layout-item>
      </zero-layout-region>

      <zero-layout-region>
        <zero-layout-item title="All Trades tile (pie example)">
          <zero-g2plot-chart type="pie" :config="${(x) => x.tile2ChartConfig}">
            <chart-datasource
              resourceName="ALL_POSITIONS"
              server-fields="INSTRUMENT_NAME VALUE"
            ></chart-datasource>
          </zero-g2plot-chart>
        </zero-layout-item>
        <zero-layout-item title="All positions tile (column example)">
          <zero-g2plot-chart type="column" :config="${(x) => x.tile3ChartConfig}">
            <chart-datasource
              resourceName="ALL_POSITIONS"
              server-fields="INSTRUMENT_ID VALUE"
            ></chart-datasource>
          </zero-g2plot-chart>
        </zero-layout-item>
      </zero-layout-region>
    </zero-layout-region>
  </zero-layout>
`;

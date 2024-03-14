import { customElement, FASTElement } from '@microsoft/fast-element';
import { DashboardStyles as styles } from './dashboard.styles';
import { DashboardTemplate as template } from './dashboard.template';
import { CHART_CONFIG } from '../../components';

@customElement({
  name: 'dashboard-route',
  template,
  styles,
})
export class Dashboard extends FASTElement {
  constructor() {
    super();
  }

  tile1ChartConfig = CHART_CONFIG.DEFAULT;
  tile2ChartConfig = CHART_CONFIG.PIE;
  tile3ChartConfig = CHART_CONFIG.DEFAULT;
}

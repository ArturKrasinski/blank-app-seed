import { customElement, FASTElement } from '@microsoft/fast-element';
import { AdminStyles as styles } from './admin.styles';
import { AdminTemplate as template } from './admin.template';

@customElement({
  name: 'admin-route',
  template,
  styles,
})
export class Admin extends FASTElement {
  constructor() {
    super();
  }

}

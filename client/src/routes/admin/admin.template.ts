import { html } from '@microsoft/fast-element';
import type { Home } from './home';

export const AdminTemplate = html<Home>`
  <zero-layout>
    <zero-layout-region>
      <zero-layout-item title="Entity manager tile">
        <entity-management
          resourceName="ALL_TRADES"
          title="Trade Management"
          updateEvent="EVENT_TRADE_MODIFY"
          deleteEvent="EVENT_TRADE_DELETE"
          createEvent="EVENT_TRADE_CREATE"
        ></entity-management>
      </zero-layout-item>
      <zero-layout-item title="Trade form">
        <foundation-form resourceName="EV"></foundation-form>
      </zero-layout-item>
    </zero-layout-region>
  </zero-layout>
`;

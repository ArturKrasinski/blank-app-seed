import { html } from '@microsoft/fast-element';
import type { Home } from './home';

export const HomeTemplate = html<Home>`
  <zero-layout>
    <zero-layout-region>
      <zero-layout-item title="Entity manager tile">
        <entity-management
          resourceName="ALL_COUNTERPARTYS"
          title="Counterparty Management"
          updateEvent="EVENT_COUNTERPARTY_MODIFY"
          deleteEvent="EVENT_COUNTERPARTY_DELETE"
          createEvent="EVENT_COUNTERPARTY_CREATE"
        ></entity-management>
      </zero-layout-item>
      <zero-layout-item title="two">
        <foundation-form resourceName="EVENT_AMEND_USER"></foundation-form>
      </zero-layout-item>
    </zero-layout-region>
  </zero-layout>
`;

import { html } from '@genesislcap/web-core';
import type { Home } from './home';

export const HomeTemplate = html<Home>`
  <entity-management resourceName="ALL_TRADES" createEvent="EVENT_TRADE_INSERT"></entity-management>
`;

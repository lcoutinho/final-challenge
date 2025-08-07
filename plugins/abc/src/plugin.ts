import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const abcPlugin = createPlugin({
  id: 'abc',
  routes: {
    root: rootRouteRef,
  },
});

export const AbcPage = abcPlugin.provide(
  createRoutableExtension({
    name: 'AbcPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

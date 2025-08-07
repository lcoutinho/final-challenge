import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const employeesPlugin = createPlugin({
  id: 'employees',
  routes: {
    root: rootRouteRef,
  },
});

export const EmployeesPage = employeesPlugin.provide(
  createRoutableExtension({
    name: 'EmployeesPage',
    component: () =>
      import('./components/EmployeesComponent').then(m => m.EmployeesComponent),
    mountPoint: rootRouteRef,
  }),
);

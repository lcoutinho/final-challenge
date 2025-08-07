import { createDevApp } from '@backstage/dev-utils';
import { employeesPlugin, EmployeesPage } from '../src/plugin';

createDevApp()
  .registerPlugin(employeesPlugin)
  .addPage({
    element: <EmployeesPage />,
    title: 'Root Page',
    path: '/employees',
  })
  .render();

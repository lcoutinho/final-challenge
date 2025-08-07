import { createDevApp } from '@backstage/dev-utils';
import { abcPlugin, AbcPage } from '../src/plugin';

createDevApp()
  .registerPlugin(abcPlugin)
  .addPage({
    element: <AbcPage />,
    title: 'Root Page',
    path: '/abc',
  })
  .render();

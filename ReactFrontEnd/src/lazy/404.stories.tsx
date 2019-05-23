import * as React from 'react';
import { storiesOf, addParameters } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Component404 from './404';
const componentStory = storiesOf('404', module)
  .add('default display full', () => <Component404></Component404>);

  [200, 300, 400, 500, 600, 800].forEach(resolution => componentStory.add(`default display ${resolution}px`, () => <div style={{ width: resolution }}><Component404></Component404></div>));
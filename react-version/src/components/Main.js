require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Container } from 'semantic-ui-react';
import MenuComponent from './MenuComponent.jsx';
import EchartsComponent from './EchartsComponent.jsx';


class AppComponent extends React.Component {
  render() {
    return (
              <Container>
                  <MenuComponent />
                  <EchartsComponent />
                </Container>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

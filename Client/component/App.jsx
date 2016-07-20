import React from 'react';
import Nav from '../containers/Nav';
import Panel from '../containers/Panel';
import Map from '../containers/Map';

class App extends React.Component {

  render() {
    return (
      <div>
        <Nav/>
        <Map/>
        <Panel/>
      </div>
    );
  }
}

export default App;

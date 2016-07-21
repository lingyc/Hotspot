import React from 'react';
import Nav from '../containers/Nav';
import Panel from '../containers/Panel';
import Map from '../containers/Map';

class App extends React.Component {

  render() {
    return (
      <div>
        <Nav/>
        <Panel />
        <Map />
      </div>
    );
  }
}

export default App;

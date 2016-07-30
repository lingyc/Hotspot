import React from 'react';
import Map from '../containers/Map';
import Nav from '../containers/Nav';
import Panel from '../containers/Panel';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: []
    };
  }

  componentDidMount() {
    var that = this;
    this.getSpots();
    console.log('states during app mount, ', that.state.collection);
  }

  getUpdate(wish) {
    console.log('calling getUpdate');
    let that = this;
    $.post('/api/wishes', wish, function(data, err) {
      // this.state.collection = res;
      // console.log('api/wishes called, ', data)
      // console.log('error: ', err)
    }).then(function(result) {
      that.getSpots();
    })
  }

  getSpots() {
    let that = this;
    $.get('/api/spots', function(data, err) {
      console.log('hi');
    }).then(function(result) {
      that.setState({
        collection: result.data
      })
    })
  }

  postSpots(spotObj) {
    let that = this;
    $.post('/api/spots', spotObj, function(data, err) {
      console.log('hii')
    }).then(function(result) {
      that.getSpots();
    })
  }

  postAcceptWish(spotObj) {
    let that = this;
    $.post('/api/acceptWishes', spotObj, function(data, err) {
      console.log('acceptWishes')
    }).then(function(result) {
      that.getSpots();
    })
  }

  render() {
    return (
      <div>
        <Nav />
        <Map collection={this.state.collection}
        getUpdate={this.getUpdate.bind(this)}
        getSpots={this.getSpots.bind(this)}
        postSpots={this.postSpots.bind(this)}/>
        <Panel />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalCollection: state.CollectionRestaurantsFilters.collection
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

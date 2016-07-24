// Default focus if location access not allowed or available. (Moscone Center)
var defaultCoord = [37.784005, -122.401551];

// Public accessToken. Set up from mapbox.com. Make sure is a public token
L.mapbox.accessToken = 'pk.eyJ1Ijoicm1jY2hlc24iLCJhIjoiY2lxbHkxbXFiMDA5dWZubm5mNWkwdGYwbiJ9.QC1lP-2tNymbJ5tHaMugZw';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

// Globl map
var mainMap;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    renderMap();
    getUserLocation(mainMap);
  }

  render() {
    return (
      <div className='map' id='map-one' filters={this.props.filters} clickHandler={this.props.actions.clickLocationSubmit}></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.CollectionRestaurantsFilters.filterOptions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}
// Generate React Event Listener
var OnSubmit = React.createClass({
  submit: function(e) {
    e.preventDefault();
    alert('it works!');
  },

  render: function() {
    return (
      <form onSubmit={this.submit}>
        <button>Thumbs!</button>
      </form>
    );
  }
});

////////// TESTING DATA - TODO REMOVE /////////
var tastyRestaurants = [
  {
    name: 'The Flying Falafal',
    latitude: 37.7812322,
    longitude: -122.4134787,
    rating: 5
  },
  {
    name: 'Show Dogs',
    latitude: 37.7821228,
    longitude: -122.4130593,
    rating: 5
  },
  {
    name: 'Lemonade',
    latitude: 37.7848661,
    longitude: -122.4057182,
    rating: 5
  },
  {
    name: 'Super Duper Burgers',
    latitude: 37.7862143,
    longitude: -122.4053212,
    rating: 5
  },
  {
    name: 'Réveille Coffee Co.',
    latitude: 37.7735341,
    longitude: -122.3942448,
    rating: 5
  },
  {
    name: 'Denny\'s',
    latitude: 37.7859249,
    longitude: -122.407801,
    rating: 0
  }
];

////////// TEST IMAGES TODO - REMOVE FOR FINAL //////////
var thumbDown = 'http://emojipedia-us.s3.amazonaws.com/cache/8f/32/8f32d2d9cdc00990f5d992396be4ab5a.png';
var thumbUp = 'http://emojipedia-us.s3.amazonaws.com/cache/79/bb/79bb8226054d3b254d3389ff8c9fe534.png';
var fistBump = 'http://emojipedia-us.s3.amazonaws.com/cache/2c/08/2c080d6b97f0416f9d914718b32a2478.png';
var testImage = 'http://img4.wikia.nocookie.net/__cb20140321012355/spiritedaway/images/1/1f/Totoro.gif';

////////// TEMPLATES FOR GEOPOINT and GEOSET in geoJSON FORMAT //////////
var geoJSONPoint = (longitude, latitude, name, thumb, image) => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    properties: {  // for styling
      title: name,
      image: image,
      icon: {
        iconUrl: thumb,
        iconSize: [35, 35],
        iconAnchor: [0, 0],
        popupAnchor: [0, 0]
      }
    }
  };
};

var geoJSONSet = () => {
  return [
    {
      type: 'FeatureCollection',
      features: []
    }
  ];
};

////////// HELPER FUNCTIONS - TODO MODULARIZE //////////
// Helpers for grabbing locations
var getSpots = () => {
  var spotsSet = geoJSONSet();
  var thumb = true;
  var restaurant, lati, long, thumb, name;

  for (var i = 0; i < tastyRestaurants.length; i += 1) {
    restaurant = tastyRestaurants[i];
    lati = restaurant.latitude;
    long = restaurant.longitude;
    name = restaurant.name;
    restaurant.rating === 0 ? thumb = thumbDown : thumb = thumbUp;
    restaurant = geoJSONPoint(long, lati, name, thumb, testImage);
    spotsSet[0].features.push(restaurant);
  }
  return spotsSet;
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

// Helpers for rendering mapping data
var renderMap = () => {
  mainMap = L.mapbox.map('map-one', 'mapbox.streets')
    .setView(defaultCoord, 16);

  var geocoderControl = L.mapbox.geocoderControl('mapbox.places', {
    autocomplete: true,
    keepOpen: true,
    proximity: true,
    container: 'geocoder-container'
  });
  geocoderControl.addTo(mainMap);

  geocoderControl.on('select', function(res, mainMap) {
    foundRestaurant(res, mainMap);
  });

  addPointsLayer(mainMap);

  return mainMap;
};

var addPointsLayer = (map) => {
  var restaurantPoints = L.mapbox.featureLayer().addTo(map);

  restaurantPoints.on('layeradd', function(point) {
    var marker = point.layer;
    var feature = marker.feature;
    marker.setIcon(L.icon(feature.properties.icon));
    var content = '<h2>' + feature.properties.title + '<\/h2>' +
    '<img src="' + feature.properties.image + '" alt="">';
    marker.bindPopup(content);
  });

  restaurantPoints.setGeoJSON(getSpots());
};

// Helpers for interacting with users live location
var getUserLocation = () => {
  navigator.geolocation.getCurrentPosition(function(position) {
    geoSuccess(position);
  }, geoError);
};

var geoError = () => {
  alert('Our apologies, but it appears we are unable to find you');
};

var geoSuccess = (position) => {
  mainMap.setView([position.coords.latitude, position.coords.longitude]);
};

// Helpers to handle search results
var foundRestaurant = (res) => {
  console.log('found a place', res, res.feature.text, res.feature.center); // -122, 33 long / lat
  var pointQuery = L.mapbox.featureLayer().addTo(mainMap);

  pointQuery.on('layeradd', function(point) {
    var marker = point.layer;
    var feature = marker.feature;
    marker.setIcon(L.icon(feature.properties.icon));
    var content = '<h2>' + feature.properties.title + '<\/h2>' +
    '<form>I would<br>' +
    '<input type="radio" name="goBack" required> Definitely and absolutely<br>' +
    '<input type="radio" name="goBack"> Never ever ever<br>' +
    'go back<br>' +
    '<input type="submit" name="fistBump" value="Thumbs!"></form>' +
    '<img src="' + feature.properties.image + '" alt="">';
    marker.bindPopup(content);
  });

  var coordinates = res.feature.center;
  var pickedPlace = geoJSONPoint(coordinates[0], coordinates[1], res.feature.text, fistBump, testImage);

  pointQuery.setGeoJSON(pickedPlace);
  pointQuery.openPopup();
};
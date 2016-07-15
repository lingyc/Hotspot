# Mapping  and Usage #

## Contents ##
### Core Usage ###

* [Gather User Location](#gathering-user-location)
* [Request Map Tilesets - Mapbox](#request-map-tilesets-\--mapbox)
* [Overlay Custom Styling - Mapbox](#overlay-custom-styling-\--mapbox)
* [Gather Photos Data and Other Destination Information - Yelp](#gather-photo-data-and-other-destination-information-\--yelp)
* [Storage of User Mapping Information](*storage-of-user-mapping-information)

### Other Information ###

* [Yelp JSON Request and Response](#yelp-json-request-and-response)
* [GeoJSON](#geojson)
* [Useful Links](#useful-links)

# Core Usage #
## Gathering User Location ##
#### HTML Information ####
Widely supported in most browsers for desktop and mobile devices. Recommended to use some sort of error handling and detection of feature. Could use Modernizr to check ( https://modernizr.com/ )
###### Grab location
Use Javascript navigator.Geolocation object. Will grab current location although attempts to do this as quickly as possible so accuracy may be compromised. On success we will receive an object with `coords.latitude` and `coords.longitude` values.

```javascript
navigator.geolocation.getCurrentPosition(function(position) {
  do_something(position.coords.latitude, position.coords.longitude);
});
```

If we wish to watch the current position the geolocation provides the following.
```javascript
var watchID = navigator.geolocation.watchPosition(function(position) {
  do_something(position.coords.latitude, position.coords.longitude);
});
```
Both the get and watch accept a success and error callback. As geolocation is complicated and there are many areas in which it can fail error handling is especially important.

#### JS Requirements ####

## Request Map Tilesets - Mapbox ##
#### HTML Setup ####
Initialize the mapbox.js library as well as styling. Can use hosted version as following.
```html-5
<script src='https://api.tiles.mapbox.com/mapbox.js/v2.2.4/mapbox.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox.js/v2.2.4/mapbox.css' rel='stylesheet' />

  <body>
  <div id='map-one' class='map'> </div>
  </body>
```

#### JS Setup ####
Create a new mapbox map as follows. Centered on coordinate location included in setView.
* map-one: corresponds to the div id above.
* mapbox.streets: map ID. Create with mapbox editor.
* setView: centered on coordinate location included in setView.
```javascript
L.mapbox.accessToken = 'MYACCESSTOKEN';
  L.mapbox.map('map-one', 'mapbox.streets').setView([38.8929,-77.0252], 14);
```


## Overlay Custom Styling - Mapbox ##
TODO pin
TODO search box
TODO popout box over location
#### HTML Information ####


#### JS Requirements ####


## Gather Photo Data and Other Destination Information - Yelp ##
#### HTML Information ####


#### JS Requirements ####
## Storage of User Mapping Information ##

# Other Information #
## Yelp JSON Request and Response ##
#### AJAX Request for Yelp information ####


#### AJAX Response from Yelp ####


## GeoJSON ##

## License Requirements ##
#### Yelp API Applicable Requirements ####
* Wherever you display information from the API, you’ll also need to display our logo (see below) in a manner that’s obvious to the casual user that the information originates from Yelp.
* Fully attribute your use of our content by linking directly to the applicable Yelp pages.
* You always need to display our aggregate star rating graphics and the number of reviews on which they’re based.

#### Yelp API Applicable Prohibitions ####
* Don’t store any information from the API. Business ID information may be stored for back-end matching purposes only, but if your app otherwise requires caching beyond the duration of a user session it will require specific approval beyond the scope of the Terms of Use. Please email api@yelp.com with questions.
* Don’t make scheduled or batch calls to the Yelp API without written authorization from Yelp. API calls should only be generated at the point of user inquiry.

## Useful Links ##
**Documentation - Mapping**
* Mapbox - https://www.mapbox.com/api-documentation/
* MDN Documentation on User Location - https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation

**JS Libraries**
* Geolocation Fallback (Generally for older browsers) https://github.com/estebanav/javascript-mobile-desktop-geolocation

# External Mapping Providers and Overlays #

## Functionality ##
**Required Functionality**

* Search by name in search box
* Search by address in search box
* Search by pin location / clicked on map
* Additional data desired back from API
  * Name if not searched
  * Picture of location / other identifying photo
  * Map coordinates
* Custom icons for location pins
  * :thumbsup:
  * :thumbsdown:
* Client library in JS
* Sufficient free usage ability prior to scaling

**Optional Functionality**

* Preferences to current geographic location
* Routing features
* Autocomplete searches (provides suggestions)

## External Providers Available ##
**Final Choice**
* Mapbox for mapping information
* Yelp for photos and future social and recommendation features

**Considered but Ultimately Passed On**
* Google Maps - for maps, photos, social features and location data.
  * Passed due to lack of expansion ability on social and recommendation functions.
* Foursquare for photos, social features and location data.
* OpenStreet Maps (Mapbox sources mapping from OpenStreet but provides additional functionality)

## Mapping Overlays ##
**Final Choice**
Can use Leaflet for additional functionality. Initial version will utilize Mapbox only.

## Grabbing a Users Location ##
* Supported by HTML 5 on most browsers, including mobile. Please see below for detail.

## Useful Links ##
**Signups**
* Mapbox: https://www.mapbox.com/studio/signup/
* Foursquare: https://foursquare.com/developers/apps

**Downloads**
* Mapbox - NPM Install: https://www.npmjs.com/package/mapbox
* Leaflet - NPM Install: https://www.npmjs.com/package/leaflet

**Documentation - Mapping**
* Foursquare - https://developer.foursquare.com/
* Mapbox - https://www.mapbox.com/api-documentation/

**Documentation - Overlay**
* Leaflet - Docs: http://leafletjs.com/reference.html
* Leaflet - Quick-start: http://leafletjs.com/examples/quick-start.html
* Leaflet - Alread Designed Overlays: http://leaflet-extras.github.io/leaflet-providers/

**Documentation - HTML 5 User Location**
* Quick overview - http://diveintohtml5.info/geolocation.html
* MDN Documentation - https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation

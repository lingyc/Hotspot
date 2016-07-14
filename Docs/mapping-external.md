# External Mapping Providers and Overlays #

## Functionality ##
**Required Functionality**
1. Search by name in search box
2. Search by address in search box
3. Search by pin location / clicked on map
4. Additional data desired back from API
  * Name if not searched
  * Picture of location / other identifying photo
  * Map coordinates
5. Custom icons for location pins
  * :thumbsup:
  * :thumbsdown:
6. Client library in JS
7. Sufficient free usage ability prior to scaling

**Optional Functionality**
1. Preferences to current geographic location
2. Routing features
3. Autocomplete searches (provides suggestions)

## External Providers Available ##
**Final Choice**
* Mapbox for mapping information
* Foursquare for photos

**Considered but Ultimately Passed On**
* Google Maps
* Yelp
* OpenStreet Maps

## Mapping Overlays ##
**Final Choice**
Can use Leaflet for additional functionality. Initial version will utilize Mapbox only.

## Grabbing a Users Location ##
* Supported by HTML 5 on most browsers, including mobile

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

L.mapbox.accessToken = 'pk.eyJ1Ijoicm1jY2hlc24iLCJhIjoiY2lxbHkxbXFiMDA5dWZubm5mNWkwdGYwbiJ9.QC1lP-2tNymbJ5tHaMugZw';

var Map = (props) => (
    <div id='map-one'>
      {props.mainMap}
    </div>
);

L.mapbox.map('map-two', 'mapbox.streets').setView([38.8929, -77.0252], 14);

window.Map = Map;

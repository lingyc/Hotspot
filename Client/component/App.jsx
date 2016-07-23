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

/* Actions Cheat Sheet

toggleCollectionList(panelMode)
type: NAV_CLICK_COLLECTION
payload: panelMode = ''/null
Takes the current panel mode and updates it

toggleFilterList(panelMode)
type: NAV_CLICK_FILTER
payload: panelMode= ''/null
Takes the current panel mode and updates it

logout()
type: NAV_CLICK_LOGOUT
Ends session, redirects to splash page, shouldn't need a reducer

toggleFilter(filter, selectedFilters, collection)
type: PANEL_CLICK_FILTER_ITEM
payload: {
	selectedFilters: [''],
  filteredrestaurants: [{}]
}
Takes the clicked filter, all filters that are on, and the entire collection
Turns filters on and off and updates the filtered restaurant list

viewCollectionItem(item)
type: PANEL_OPEN_COLLECTION_ITEM
payload: item = {}
Takes the clicked item, returns it for showing detail on the panel

closeCollectionItem(item)
type: PANEL_CLOSE_COLLECTION_ITEM
Takes the clicked item, should turn off the detailed view

clickLocationSubmit(name, lat, lon, rating, filters)
type: MAP_CONFIRM_POINT
payload: {
	newSpot : {}
  filters: filters
}
Takes the location's name, lat, lon, rating, and all filters (mostly from the map [Ryan's end])
Returns the location formated for the collection and updates the list of filters

fetchCollection()
type: FETCH_COLLECTION
payload: {
	collection: [{}]
  filters: ['']
}
Returns the collection from the DB and all the filters from those locations

*/

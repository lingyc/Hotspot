import $ from 'jquery';

export const NAV_CLICK_COLLECTION = 'NAV_CLICK_COLLECTION';
export const NAV_CLICK_FILTER = 'NAV_CLICK_FILTER';
export const NAV_CLICK_LOGOUT = 'NAV_CLICK_LOGOUT';

export const PANEL_CLICK_FILTER_ITEM = 'PANEL_CLICK_FILTER_ITEM';
export const PANEL_OPEN_COLLECTION_ITEM = 'PANEL_OPEN_COLLECTION_ITEM';
export const PANEL_CLOSE_COLLECTION_ITEM = 'PANEL_CLOSE_COLLECTION_ITEM';

export const POPULATE_FILTER_OPTIONS = 'POPULATE_FILTER_OPTIONS';

export const MAP_CONFIRM_POINT = 'MAP_CONFIRM_POINT';
export const FETCH_COLLECTION = 'FETCH_COLLECTION';

// Click Handler for Nav Collection button
export function toggleCollectionList(panelMode) {
  // If panelMode is collection, set it to null.
  if (panelMode === 'collection') {
    panelMode = null;
  } else {
    // Else set panelMode to collection
    panelMode = 'collection';
  }

  return {
    type: NAV_CLICK_COLLECTION,
    payload: panelMode
  }
}

// Click Handler for Nav Filter button
export function toggleFilterList(panelMode) {
  // If panelMode is filter, set it to null.
  if (panelMode === 'filter') {
    panelMode = null;
  } else {
    // Else set panelMode to filter
    panelMode = 'filter';
  }

  return {
    type: NAV_CLICK_FILTER,
    payload: panelMode
  }
}

// Click Handler for Nav Logout button
export function logout() {
  // Make final post request to update user's data
  // End the user's session

  return {
    type: NAV_CLICK_LOGOUT
  }
}

// Click Handler for Panel Filter item
export function toggleFilter(filter, selectedFilters, collection) {
  // Check if given filter is in filter list
  var index = _.findIndex(selectedFilters, filter);
  if (index === -1) { 
    // Add it to the list if not found
    selectedFilters.push(filter);
  } else {  
    // remove it if it is not
    selectedFilters.splice(index, 1);
  }

  return {
    type: PANEL_CLICK_FILTER_ITEM,
    payload: {
      selectedFilters: selectedFilters,
      filteredRestaurants: filteredRestaurants
  }
}

// Click Handler for Panel Collection item
export function viewCollectionItem(item) {
  // change current panel view to the collection item
  return {
    type: PANEL_OPEN_COLLECTION_ITEM,
    payload: item
  }
}

// Click Handler for Panel Collection closeup
export function closeCollectionItem(item) {
  // close the current panel view back to the collection
  return {
    type: PANEL_CLOSE_COLLECTION_ITEM
  }
}

// Click Handler for map's submit
export function clickLocationSubmit(name, lat, lon, rating, filters) {
  // Create object to make DB query
  // Add type and image from returned request

  return {
    type: MAP_CONFIRM_POINT
    payload: {
      newLoc: locToAdd,
      filters: filters
    }
  }
}

export function fetchCollection() {
  // Query database for user's entire collection
  // This function should only be called once on startup

  return {
    type: FETCH_COLLECTION,
    payload: {
      collection: collection,
      filters: filters
    }
  }
}
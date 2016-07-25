import React from 'react';

// The contets will be dependant on the form the information takes
var FilterItem = ({filter, appliedFilters, toggleFilter, collection}) => {
  var cssClasses = 'btn btn-default btn-sm';
  if (_.findIndex(appliedFilters, (o) => { return o === filter }) > -1) {
    cssClasses += ' active';
  }

  console.log('filteritem', appliedFilters, cssClasses);

  return (
    <div className='filter'>
      <div className={cssClasses} onClick={ () => { toggleFilter(filter, appliedFilters, collection); }}>
      {filter}
      </div>
    </div>
  );
};

export default FilterItem;

var Navigation = (props) => (
    <nav className="navbar">
      <div className='collectionPanel'>
        <button onClick={() => props.panel('collection')}> </button>
      </div>
      <div className='filterPanel'>
        <button onClick={() => props.panel('filter')}></button>
      </div>
    </nav>
);

window.Navigation = Navigation;

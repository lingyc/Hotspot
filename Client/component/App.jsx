class App extends React.Component {
  components(props) {
    super(props);
    this.state = {
      panel: null,
      filter: null,
      collection: null
    };
  }

  componentDidMount() {
    // api function call here
  }

  onClickslidePanel(string) {
    // slide panel here
    this.setState({
      panel: this.state[string]
    });
  }



  render() {
    return (
      <div>
        <div className="Navigation">
          <Navigation panel={this.onClickslidePanel.bind(this)}/>
        </div>
        <div className='Panel'>
          <Panel view={this.state.panel}/>
        </div>
        <div className='MapBody'>
          <Map mainMap={this.state}/>
        </div>
      </div>
    );
  }

}

modules.exports(App);

ReactDOM.render(<App/>,
document.getElementById('app'));

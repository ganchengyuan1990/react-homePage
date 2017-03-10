import React from 'react';
import {render} from 'react-dom';
import {Link, IndexLink} from 'react-router'
import RouteConfig from '../Config/route-config'


let styles = {
  pre: {
    listStyle: "none",
    float: 'left',
    width: '150px',
    textAlign: "center",
  }
}

let nav = ()=> {

  /*if(location.hash.indexOf('?') >= 0) {
    return false;
  }*/
  return (

    <nav className="bar bar-tab">
      <IndexLink to="/indexList" className="tab-item" activeClassName="active">
        <span className="icon icon-home"></span>
        <span className="tab-label">主页</span>
      </IndexLink>
      <Link className="tab-item open-panel" activeClassName="active" to="me">
        <span className="icon icon-me"></span>
        <span className="tab-label">我</span>
      </Link>
    </nav>

  )
}
class App extends React.Component {
  componentDidMount(){
    console.log('Redux版本');
  }
  render() {
    return (
      <div data-log="one">
        <div data-log="two">
          {this.props.children}
        </div>
        <div style={{position: "absolute", height: "50px", width: "100%", bottom: "0px", zIndex: '2001'}}>{nav()}</div>
      </div>

    )
  }
}

export default App;

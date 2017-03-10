import React, {Component} from 'react';
import {connect} from 'react-redux';
import IndexList from '../Component/IndexList';
import {bindActionCreators} from 'redux';
//以下是错误的方式
// import {IndexList} from '../Component/IndexList';
import * as actions from '../Actions/index';


class IndexListCase extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
 // this.props.actions.fetchList();
   this.props.actions.fetchWeatherInfo();
    var token = localStorage.getItem('userToken')
    //this.props.actions.me({token: token});
  }

  render() {
    debugger
    const list = this.props.indexList;
    const weatherInfo = this.props.fetchWeatherInfo;
    return (
      <IndexList
        data={list}
        weatherInfo={weatherInfo}/>
    )
  }
}

function mapStateToProps(state) {
  debugger
  const {indexList, me, giveStar, uploadAvatarEnd} = state;
  return {
    indexList: indexList.list,
    me: me,
    giveStar: giveStar,
    uploadAvatarEnd: uploadAvatarEnd
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

const indexList = connect(mapStateToProps, mapDispatchToProps)(IndexListCase)

module.exports = indexList
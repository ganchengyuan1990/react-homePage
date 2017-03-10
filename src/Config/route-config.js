import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, Link, IndexRoute, Redirect, browserHistory} from 'react-router';



const IndexList = {
  path: 'indexlist',
  getComponent(nextState, cb){
    require.ensure([], (require)=> {
      return cb(null, require('../Containers/indexList'))
    }, 'indexList')
  }
}



const Me = {
  path: '/me',
  getComponent(nextState, cb){
    require.ensure([], (require)=> {
      return cb(null, require('../Component/Me'))
    }, 'me')
  }
}


const IndexHeader = {
  path: 'indexHeader',
  getComponent(nextState, cb){
    require.ensure([], (require)=> {
      return cb(null, require('../Component/indexHeader'))
    }, 'indexHeader')
  }
}


module.exports = {
  IndexList: IndexList,
  Me: Me,
  IndexHeader: IndexHeader
};


// import {CreateBox} from '../Component/Create';
// import Me from '../Component/Me';
// import {indexList} from '../Containers/indexList'
// import App from '../Component/main'
// import {LoginBox} from '../Component/Login'
// import {articleDetailBox} from '../Containers/articleDetail'
// import {MyArticleBox} from '../Component/Me/myArticle'
//
//
// //原始路由配置
// class RouteConfig extends React.Component{
//     render(){
//         return(
//             <Router history={hashHistory}>
//                 <Route path="/" component={App}>
//                     <IndexRoute  component={indexList}/>
//                     <Route name="indexlist" path="/indexlist" component={indexList}/>
//                     <Route name="articleDetail" path="/indexList/:id" component={articleDetailBox}/>
//                     <Route path="/create" component={CreateBox}/>
//                     <Route path="/create/:id" component={CreateBox}/>
//                     <Route path="/me" component={Me}/>
//                     {/*<Route path="/me/avatar" component={Avatar}/>*/}
//                     <Route path="/login" component={LoginBox} />
//                     <Route path="/myArticle" component={MyArticleBox} />
//                 </Route>
//             </Router>
//         )
//     }
// }
// export default RouteConfig;


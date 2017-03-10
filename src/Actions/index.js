// const API = 'http://localhost:4545/';

const API = 'http://114.215.80.72:4545/'

//创建将会用到的action 和action Creater

//有些人一看见大写字母就懵逼,所以这里type类型都为小写,但正常的type为常量,所以应该大写
export const fetchStartAction = 'fetchStart';
export const fetchEndAction = 'fetchEndAction';
export const fetchFailedAction = 'fetchFailedAction';
export const fetchListAction = 'fetchList';

// export const postFailedAction = 'postFailedAction'



//开始请求
function fetchStart() {
  return {
    type:fetchStartAction,
  }
}
//请求结束,获得data
function fetchEnd(data={}) {
  return {
    type:fetchEndAction,
    data:data
  }
}
//请求失败
function fetchFailed(data) {
  return {
    type:fetchFailedAction,
    data:data
  }
}

// //post 失败
// function postFailed(data) {
//   return {
//     type:postFailedAction,
//     data:data
//   }
// }

//请求主列表
export function fetchList() {
  return function(dispatch){
    //没有执行到这里
    debugger
    ArticleModel.fetchList(dispatch)
  }
}



//me
export function me(token) {
  return (dispatch)=>{
    UserModel.getUserInfo(dispatch,token)
  }
}
//获取me完成
function fetchMeEnd(data) {
  return {
    type:'fetchMeEnd',
    isFetching:false,
    data
  }
}



//点赞
export function giveStarAction(params){
  return (dispatch)=>{
    ArticleModel.giveStar(dispatch,starEnd,params);
  }
}

function starEnd(data) {
  return {
    type:'starEnd',
    data:data,
  }
}



//评论
export function comment(params) {
  return (dispatch)=>{
    ArticleModel.comment(dispatch,commentEnd,params)
  }
}

function commentEnd(data) {
  return {
    type:'commentEnd',
    data
  }
}

function commentFinish() {
  return {
    type:'commentFinish'
  }
}

export function commentDone() {
  return (dispatch)=>{
    dispatch(commentFinish())
  }
}


export function Login(params) {
  return (dispatch)=>{
    UserModel.login(dispatch,registerLoginEnd,params)
  }
}


export function fetchWeatherInfo() {
  return (dispatch)=>{
    UserModel.fetchWeatherInfo(dispatch,fetchWeatherInfoEnd)
  }
}

function fetchWeatherInfoEnd(data) {
  debugger
  return {
    type:'fetchWeatherInfoEnd',
    data: data.weatherinfo
  }
}


export function uploadAvatar(params) {
  return (dispatch)=>{
    UserModel.uploadAvatar(dispatch,uploadAvatarEnd,params)
  }
}

function uploadAvatarEnd(data) {
  return {
    type:'uploadAvatarEnd',
    data
  }
}

export function uploadAvatarDone() {
  return (dispatch)=>{
    dispatch(commentFinish())
  }
}


/**
 * fetch请求数据Model
 * @param _method
 * @param _api
 * @param _params
 * @param _onSuccess
 * @param _onError
 * @private
 */
function _request (dispatch,endAction,_method,_api,_params) {

  let _options = {
    method:_method,
    mode: "cors",
    headers:{
      // 'Accept':'application/json',
      'Content-Type':'application/json',
    },
    body:(_method == 'GET')? null:JSON.stringify(_params)
  };
  if(_method.toLowerCase() == 'get'){
    _api+=Tools._getSearchFromObject(_params)
  }

  var data = {message: "success"};
  debugger
  dispatch(endAction(data))
  /*fetch(_api,_options)
    .then(Tools.checkStates)
    .then(Tools.parseJSON)
    .then((data)=>{
      dispatch(endAction(data))
    })
    .catch((err)=>{
      console.log(err);
      if(err.state == 401){
        alert("登录过期,重新登录")
        location.hash = "login";
        return
      }
      if(err.response){
        err.response.json().then((data)=>{
          if(data.message)
            dispatch(fetchFailed(data))
        })
      }
    })*/
}

function _fetch(dispatch, endAction, url) {
  fetch(url).then((res) => {
    return res.json();
  }).then((res) => {
    dispatch(endAction(res));
  })
}

// Upload Image
function _upload(dispatch,postEnd,_api, _formdata, _onSuccess, _onError){

  // Manual XHR & FormData
  let oReq = new XMLHttpRequest();
  oReq.open("POST", _api);
  oReq.onload = (e) => {
    let ret = JSON.parse(oReq.responseText)
    if (oReq.status == 200) {
      dispatch(postEnd(ret));
    } else {
      let err = ret;
      if(err.message) alert(err.message)
      //_onError(err);
    }
  };
  // oReq.upload.onprogress = updateProgress;
  oReq.send(_formdata);
}


let Tools = {
  checkStates: function (response) {
    if(response.ok){
      return response
    }else{
      let error = new Error(response.statusText);
      error.state = response.status;
      error.response = response;
      throw error;
    }
  },
  parseJSON:function (response) {
    return response.json();
  },
  _getSearchFromObject:function(param, key) {

    if(param == null) return '';
    let _search = '?';
    for (let key in param) {
      _search += `${key}=${encodeURIComponent(param[key])}&`
    }
    return _search.slice(0, -1);
  },
}


let UserModel = {
  storeToken:(token)=>{
    localStorage.setItem(USER_TOKEN,token);
  },
  fetchToken:()=>{
    return localStorage.getItem(USER_TOKEN);
  },

  getUserInfo:(dispatch,_params)=>{
    dispatch(fetchStart())
    _request(dispatch,fetchMeEnd,'GET',`${API}user/getUserInfo`,_params);
  },

  uploadAvatar:(dispatch,postEnd,_params)=>{
    _upload(dispatch,postEnd,`${API}user/uploadAvatar`,_params)
  },
  fetchWeatherInfo:(dispatch,getEnd,_params)=>{
    debugger
    dispatch(fetchStart())
    _fetch(dispatch,fetchEnd,"http://jasongan.cn:8080/api/weather")
  },
}
let ArticleModel={

  fetchList:(dispatch,_params)=>{
    dispatch(fetchStart())
    _request(dispatch,fetchEnd,'GET',`${API}article/fetchList`,'');
  },
  giveStar:(dispatch,fetchEnd,_params)=>{
    _request(dispatch,fetchEnd,'POST',`${API}article/giveStar`,_params)
  },
  comment:(dispatch,postEnd,_params)=>{
    _request(dispatch,postEnd,'POST',`${API}article/comment`,_params)
  }
}


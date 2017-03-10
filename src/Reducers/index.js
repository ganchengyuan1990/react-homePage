import {combineReducers, createStore, applyMiddleware} from "redux"

import {
  fetchListAction,
  articleDetailAction,
  articlePublishAction,
  fetchEndAction,
  fetchFailedAction,
  fetchStartAction
} from '../Actions'


/**
 *  定义一个初始化state
 */

const initialState = {
  visibilityFilter: "good",
  todos: []
};

function initial(state = initialState, action) {
  // 这里暂不处理任何 action，
  // 仅返回传入的 state。
    return state;
}

/**
 *  reducer 是一个传入state和action 返回新的state的纯函数
 */


//主列表的reducer
function indexList(state = initialState, action) {
  switch (action.type) {
    case fetchStartAction:
      return Object.assign({}, state, {
          visibilityFilter: "false"
      })
    case fetchEndAction:
      return {
        list: action.data,
        isFetching: false
      }
    default:
      return state
  }
}


//个人中心的reducer
function me(state = {}, action) {
  if (action.type == 'fetchMeEnd') {
    return {
      data: action.data,
    }
  }

  return state
}

//点赞的reducer
function giveStar(state = {}, action) {
  switch (action.type) {
    case 'starEnd':
      return {
        data: action.data
      }
    default:
      return state;
  }
}

//评论的reducer
function comment(state = {}, action) {
  switch (action.type) {
    case 'commentEnd':
      return {
        data: action.data
      }
    case 'commentFinish':
      return {
        data: 0
      }
    default:
      return state;
  }
}

function uploadAvatarEnd(state = {}, action) {
  switch (action.type) {
    case 'uploadAvatarEnd':
      return {
        data: action.data
      }
    case 'commentFinish':
      return {
        data: 0
      }
    default:
      return state;
  }
}

function fetchWeather(state = {}, action) {
  switch (action.type) {
    case 'fetchWeatherInfoEnd':
      return {
        data: action.data
      }
    default:
      return state;
  }
}

const state2 = {
  title: "我的信息",
  age: 24
}

const rootReducer = combineReducers({
  indexList,
  me,
  giveStar,
  comment,
  uploadAvatarEnd,
  fetchWeather,
})


export default rootReducer
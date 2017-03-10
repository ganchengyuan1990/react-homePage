import React from 'react';
import '../../static/css/style.css'
// import {dateDiff} from '../../Tools';





class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTop: null,
    };
  }


  render() {
    debugger
    fetch("https://jasongan.cn/api/weather").then((response) => {
       return response.json();
    }).then((res) => {
      debugger
       this.state.weatherInfo = JSON.stringify(res.weatherinfo);
       var result = res.weatherinfo;
       document.querySelector('.weather').innerHTML = "今天" + result.city + "的最高气温是" + result.temp1 + "，最低气温是" + result.temp2 + "，" + result.weather + '。';;
       return (
          <div className="weather">{this.state.weatherInfo}</div>
      )
    });
    
  }

}


module.exports = Weather
// export default ArticleDetail;
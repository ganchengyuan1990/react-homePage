import React from 'react';
import '../../static/css/style.css'
// import {dateDiff} from '../../Tools';





class IndexHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "时间追逐者",
      username: "Jason Gan",
      defaultTop: null,
    };
  }


  render() {
    return (
      <div>

        <main className="detail">
          <h2 className="clearPt">{this.state.title}</h2>

        </main>

      </div>

    )
  }

}


module.exports = IndexHeader
// export default ArticleDetail;
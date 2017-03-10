import React from 'react';
import {Link} from 'react-router';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import IndexHeader from '../indexHeader'


class Me extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: [
          {name: "登录页面", href: "http://m.feiniu.com/login/index.html"}, 
          {name: "商品列表页面", href: "http://list.m.feiniu.com/search?kw=%E6%96%99%E9%85%92"}, 
          {name: "领券中心页面(APP内嵌)", href: "http://m.feiniu.com/my/recharge/vouchermark.html"}, 
      ],
      personalWork: [
          {name: "个人网站(Vue版)", href: "https://ganchengyuan1990.github.io/"}, 
          {name: "个人网站(react版)", href: "https://jasongan.cn/"}, 
          {name: "个人技术博客(自制主题)", href: "https://ganchengyuan1990.github.io/blog/"}, 
      ],
      weatherInfo: "2323",
      defaultTop: null,
    };
  }

  componentDidMount() {
  }

  openUpload(e) {
    e.stopPropagation();
    avatar.click()
  }

  uploadAvatar(e) {
    let _file = e.target.files[0];
    if (_file.size > 204800) {
      $.alert('头像大小不能超过200K')
      return;
    }
    var avatarForm = this.refs.avatarForm;
    let data = new FormData(avatarForm);
    // data.append('img',data);
    var token = localStorage.getItem('userToken');
    data.append('token', token)
    this.props.uploadAvatarFn(data);
  }


  //这里有个伪bug,需要用改变action->改变state来huck掉。
  componentWillReceiveProps(nextProps){
    debugger
    if(nextProps.uploadAvatarEnd && nextProps.uploadAvatarEnd.data){
      $.toast(nextProps.uploadAvatarEnd.data.content);
      this.props.uploadAvatarCb();
      this.props.uploadAvatarDone();
    }
  }
  signOut(e) {
    e.preventDefault();
    setTimeout(()=> {
      $.closePanel()
    }, 0)
    $.confirm('您要退出登录么?', ()=> {
      localStorage.removeItem('userToken');
      this.context.router.push('/login')
    })
  }

  toMyArticle() {
    $.closePanel()
    setTimeout(()=> {
      this.context.router.push('/myArticle')
    }, 1000)
  }

  render() {
    let avatar = '';
    let username = '';
    if (this.props.data) {
      avatar = this.props.data.avatar;
      username = this.props.data.username;
    }

    // console.log(this.props.data);
    // if(!this.props.data) return;
    // let avatar = this.props.data.avatar||'';
    // let username = this.props.data.username||'';
    // console.log(3);
    return (
      <div>
        <IndexHeader />
        <div className="content" style={{top: '3rem'}}>
          <p className="personal">工作项目</p>
          <div className="list-block">
            <ul>
            {
              this.state.work.map((item, index) => {
                  return <li key={index} className="item-content item-link">
                  <a href={item.href}>
                    <div className="item-inner">
                        <div className="item-title">
                          {item.name}
                        </div>
                      <div className="item-after"></div>
                    </div>
                  </a>
                </li>
              })
            }
            </ul>
          </div>
          <p className="personal">个人项目</p>
          <div className="list-block">
            <ul>
            {
              this.state.personalWork.map((item, index) => {
                  return <li key={index} className="item-content item-link">
                  <a href={item.href}>
                    <div className="item-inner">
                        <div className="item-title">
                          {item.name}
                        </div>
                      <div className="item-after"></div>
                    </div>
                  </a>
                </li>
              })
            }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
Me.contextTypes = {
  router: React.PropTypes.object
}
module.exports = Me;
// export default Me;

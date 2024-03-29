import React, { Component } from 'react';
import ReactDom from 'react-dom';
import TitleList from './components/title-list';
import Hero from './components/hero';

import Logo from './components/logo';
import UserProfile from './components/user-profile';
import Navigation from './components/navigation';
import VideoPopup from './components/video-popup';
import style from './App.module.scss';
import './global.css';

/**
 * @render react
 * @name App
 * @description Whole app composed to tiny bit components.
 * @example
 * <App />
 */
class App extends Component {
  apiKey = '87dfa1c669eea853da609d4968d294be';

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      searchUrl: '',
      username: null,
      video: null,
      show_popup: false,
      popup_info: []
    };
    this.handleShowPopup = this.handleShowPopup.bind(this);
    this.handleHidePopup = this.handleHidePopup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  

  componentDidMount() {
    fetch('http://localhost:4000/api/getUsername')
      .then(res=>res.json())
      .then(user=>this.setState({username: user.username}));
    
    /*fetch('http://localhost:4000/getData')
      .then(res=>res.json())
      .then(video=>console.log(video));*/
  }

  handleKeyUp(e) {
    if (e.key === 'Enter' && this.state.searchTerm !== '') {
      //var searchUrl = "search/multi?query=" + this.state.searchTerm + "&api_key=" + this.apiKey;
      let searchUrl = "http://localhost:4000/searchVideo?search_term=" + this.state.searchTerm;
      this.setState({ searchUrl: searchUrl });
    }
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
    if (this.state.searchTerm == '') {
      this.setState({ searchUrl: ''})
    }
  }

  handleShowPopup(title, genre, uploaded_date, youtube_id, start_time) {
    console.log("test");
    this.setState({ show_popup: true, popup_info: [title, genre, uploaded_date, youtube_id, start_time]})
    console.log([title, genre, uploaded_date, youtube_id, start_time])
  }

  handleHidePopup(e) {
    this.setState({ show_popup: false});
  }

  render() {
    const username = this.state.username;
    const show_popup = this.state.show_popup;
    let search_url = false;
    if (this.state.searchUrl != '' && this.state.searchTerm != '') {
      search_url = true
    }
    console.log(this.state.searchTerm);
    console.log(this.state.searchUrl);
    return (
      <div>
        <header className={style.Header}>
          <Logo />
          <Navigation />
          <div id="search" className={style.Search}>
            <input onKeyUp={this.handleKeyUp} onChange={this.handleChange} type="search" placeholder="Search for information..." value={this.state.searchTerm} />
          </div>
          <UserProfile />
        </header>
        {/*<Hero />*/}
        <div style={{marginTop: '100px'}}>
          {search_url ? <TitleList title="Search Results" url={this.state.searchUrl} show_popup={this.state.show_popup} handleShowPopup={this.handleShowPopup}/> : null}
          {/*<TitleList title="Greeting" show_popup={this.state.show_popup} handleShowPopup={this.handleShowPopup}/>
          <TitleList title="Request" show_popup={this.state.show_popup} handleShowPopup={this.handleShowPopup} />
          <TitleList title="Apologizing" show_popup={this.state.show_popup} handleShowPopup={this.handleShowPopup} />*/}
          <TitleList title="What" show_popup={this.state.show_popup} handleShowPopup={this.handleShowPopup}/>
          <TitleList title="How" show_popup={this.state.show_popup} handleShowPopup={this.handleShowPopup}/>
          <TitleList title="Who" show_popup={this.state.show_popup} handleShowPopup={this.handleShowPopup}/>
          <TitleList title="Where" show_popup={this.state.show_popup} handleShowPopup={this.handleShowPopup}/>
          <TitleList title="when" show_popup={this.state.show_popup} handleShowPopup={this.handleShowPopup}/>
          <TitleList title="why" show_popup={this.state.show_popup} handleShowPopup={this.handleShowPopup}/>
          {/*<TitleList title="Strong Voice" url='genre/878/movies?sort_by=popularity.desc&page=1' show_popup={this.state.show_popup} handleShowPopup={this.handleShowPopup} />*/}
          {/*<TitleList title="" url='genre/35/movies?sort_by=popularity.desc&page=1' />*/}
        </div>
        <div>
          {show_popup ? <VideoPopup show_popup={this.state.show_popup} handleShowPopup={this.handleShowPopup} handleHidePopup={this.handleHidePopup} title={this.state.popup_info[0]} category={this.state.popup_info[1]} uploaded_date={this.state.popup_info[2]} youtube_id={this.state.popup_info[3]} start_time={this.state.popup_info[4]}/> : null}
          {/*<VideoPopup title="Harry Poter" category="Fantasy" uploaded_date="2017/08/11" youtube_id="R2zNRrOXbPY"/>*/}
        </div>
      </div>
    );
  }
}

export default App;


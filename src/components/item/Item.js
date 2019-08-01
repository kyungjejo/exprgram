import React, { Component } from 'react';
import ReactDom from 'react-dom';
import ListToggle from '../list-toggle';
import PropTypes from 'prop-types';
import style from './Item.module.scss';
import '../../global.css';
/**
 * @render react
 * @name Item
 * @description Netflix's title items
 * @example
 * <Item
 *   title='Demo List Item'
 *   rating={6}
 *   overview='This demo item brought you by the Bit team'
 *   backdrop='http://image.tmdb.org/t/p/original/aok7IhrbA83josNz9Dqh8tNA0Ao.jpg'
 * />
 */
export default class Item extends Component {
  /*static defaultProps = {
    title: 'Demo Item',
    rating: 6,
    overview: 'This demo item brought you by Bit team',
    backdrop: 'http://image.tmdb.org/t/p/original/aok7IhrbA83josNz9Dqh8tNA0Ao.jpg',
  }*/

  //static propTypes = {
    /**
     * @property {string} title item's title
     */
  //  title: PropTypes.string,

    /**
     * @property {number} score item's score (1-10 float range)
     */
  //  score: PropTypes.number,

    /**
     * @property {string} overview text for describing the item's overview
     */
  //  overview: PropTypes.string,

    /**
     * @property {string} backdrop thumbnail image for item
     */
  //  backdrop: PropTypes.string
  //}

  constructor(props) {
    super(props)
    this.state = {
        title: "",
        genre: [],
        length: 0,
        upload_date: "",
        thumbnails: "",
        category: "",
        youtube_id: "",
        tags: [],
    }
  }

  componentDidMount() {
    fetch(`http://localhost:4000/getVideo?youtube_id=${this.props.youtube_id}`, {
        method: 'GET',
    }).then(res=>res.json())
    //.then(res=>res['video_genre'] = eval(res.video_genre))
    //.then(res=>console.log(res))
    .then(res=>this.setState({youtube_id: this.props.youtube_id, title: res.video_title, genre: (res.video_genre), length: res.video_length, upload_date: res.upload_date, thumbnails: (res.video_thumbnails), category: res.video_category, tags: res.video_tags}));
  }

  render() {
    /*const { backdrop, title, score, overview } = this.props;
    return (
      <div className={style.Item} style={{ backgroundImage: 'url(' + backdrop + ')' }} >
        <div className={style.overlay}>
          <div className={style.title}>{title}</div>
          <div className={style.rating}>{score} / 10</div>
          <div className={style.plot}>{overview}</div>
          <ListToggle />
        </div>
      </div>
    );*/
    return (
      <div style={{cursor: 'pointer'}} onClick={() => this.props.handleShowPopup(this.state.title, this.state.genre[0], this.state.upload_date, this.state.youtube_id, this.props.start_time)} className={style.Item} style={{ backgroundImage: 'url(' + this.state.thumbnails.url + ')' }}>
        <div style={{cursor: 'pointer'}} className={style.overlay}>
          <div className={style.title}>{this.state.title}</div>
          <div className={style.rating}>
            <span>Relationship: Friend</span> <br/>
            {/*<span>Intensity of Speech: ★★★★☆</span> <br/>*/}
            <span>Formality: ★☆☆☆☆</span>
          </div>
          <div className={style.plot}>
          {this.state.genre.map((genre, i) => {
            if(i == (this.state.genre.length-1)) {
              return (
                <span>{genre} </span>
              );
            }
            else {
              return (
                <span>{genre}, </span>
              );
            }
          })}
          <span>/ uploaded at: {this.state.upload_date} </span> <span>/ {this.state.length}sec </span>
          {/*{this.state.tags.map((tag, i) => {
            if(i < 5) {
              return (
                <span>#{tag} </span>
              );
            }
          })}*/}
          </div>
          {/*<ListToggle />*/}
        </div>
      </div>
    );
  }
}

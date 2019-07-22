import React, {Component} from 'react';
import ReactDom from 'react-dom';
//import { Button, Header, Image, Modal } from 'semantic-ui-react';
//import style from './Navigation.module.scss';
import style from './VideoPopup.module.scss';
import '../../global.css';
import { relative } from 'path';
import YouTube from 'react-youtube';
import HeroButton from '../hero-button'

/*const VideoPopup = () => (
    <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);*/

export default class VideoPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subtitle: [],
            currentTime: 0,
            popup_state: true, // true is watching video section, false is realted video section
        }
        this._onPlayGetCurrentTime = this._onPlayGetCurrentTime.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.handleNextPopup = this.handleNextPopup.bind(this);
        this.handlePreviousPopup = this.handlePreviousPopup.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:4000/getVideoSubtitles?youtube_id=${this.props.youtube_id}`, {
            method: 'GET',
        }).then(res=>res.json())
        .then(subtitle=>this.setState({subtitle: subtitle}));
    }

    componentWillReceiveProps(nextProps) {
        fetch(`http://localhost:4000/getVideoSubtitles?youtube_id=${nextProps.youtube_id}`, {
            method: 'GET',
        }).then(res=>res.json())
        .then(subtitle=>this.setState({subtitle: subtitle}));

        this.forceUpdateHandler();
    }

    handleNextPopup() {
        this.setState({popup_state: false})
    }

    handlePreviousPopup() {
        this.setState({popup_state: true})
    }

    _onPlayGetCurrentTime(event) {
        setInterval(() => {
            let time = event.target.getCurrentTime();
            this.setState({currentTime: time});

            let subtitle = [];

            for(let i=0; i < this.state.subtitle.length; i++) {
                let current_start_time = this.state.subtitle[i][0] * 1;
                let next_start_time = 0;

                try {
                    next_start_time = this.state.subtitle[i+1][0] * 1;
                }
                catch(e) {
                    next_start_time = current_start_time + 10;
                }

                if(current_start_time < time && time < next_start_time) {
                    subtitle.push([this.state.subtitle[i][0], this.state.subtitle[i][1], "rgba(255, 255, 0, 0.7)", "current"]);
                }
                else {
                    subtitle.push([this.state.subtitle[i][0], this.state.subtitle[i][1], "transparent", "none"]);
                }

                let subtitle_div = document.getElementById("subtitle");
                let current_subtitle = "";

                try {
                    current_subtitle = document.getElementById("current");
                    subtitle_div.scrollTop = current_subtitle.offsetTop - 50;
                }
                catch(e) {
                    current_subtitle = "";
                }
                //console.log(current_subtitle);
                
            }
            this.setState({subtitle: subtitle});
        }, 1000);
    }

    forceUpdateHandler(){
        this.forceUpdate();
    };    

    renderTime() {
        return (
            <p>{this.state.currentTime}</p>
        );
    }

    render() {
        const opts = {
            height: '100%',
            width: '100%'
        };

        return (
            <div className={style.PopupOverlay}>
                { this.state.popup_state ? 
                <div className={style.VideoPopup}>
                {this.forceUpdateHandler}
                    <div id="header" className={style.Header}>
                        <h1 style={{marginLeft: '15px'}}>{this.props.title} / {this.props.category}</h1>
                        <h1 style={{float: 'right', marginRight: '15px'}}>Uploaded Date: {this.props.uploaded_date}</h1>
                    </div>
                    <div id="video" className={style.Video}>
                        <div className={style.VideoPlayer}>
                            <YouTube id="youtube-video" videoId={this.props.youtube_id} opts={opts} onPlay={this._onPlayGetCurrentTime}/>
                            {/*<YouTube id="youtube-video" videoId={this.props.youtube_id} opts={opts}/>*/}
                            {/*<object type="text/html" width="100%" height="100%" data={"//www.youtube.com/embed/"+this.props.youtube_id} allowFullScreen></object>*/}
                            <div style={{margin: '0 auto', marginLeft:'5%', marginRight:'5%', height:'15%'}}>
                                {this.state.subtitle.map((sub, i) => {
                                    if(sub[3] == "current") {
                                        return (
                                            <p style={{fontSize: '25px', textAlign: 'center'}}><span>{sub[1]}</span></p>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                        <div id="subtitle" className={style.VideoSubtitle}>
                            <br/>
                            <h1>Subtitle</h1> <br/>
                            <div className={style.subtitles}>
                                {this.state.subtitle.map((sub, i) => {
                                    return (
                                        <p id={sub[3]} style={{backgroundColor: sub[2]}}><span>{sub[0]}</span><span>{sub[1]}</span></p>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div id="context-form" className={style.Context}>
                        <br/>
                        <h1>Context</h1> <br/>
                        <div className={style.ContextInfo}>
                            <h3>Relationship: Friends</h3>
                            <h3>Intensity of Speech: ★★★★☆</h3>
                            <h3>Formality: ★☆☆☆☆</h3>
                        </div>
                        <div>
                            <HeroButton 
                                text="Next"
                                primary
                                onClickMethod={this.handleNextPopup}
                            />
                        </div>
                    </div>
                </div>
                :
                <div className={style.VideoPopup}>
                    <div id="header" className={style.Header}>
                        <h1 style={{marginLeft: '15px'}}>{this.props.title} / {this.props.category}</h1>
                        <h1 style={{float: 'right', marginRight: '15px'}}>Uploaded Date: {this.props.uploaded_date}</h1>
                    </div>
                    <div id="video-finished" className={style.VideoFinished}>
                        <div className={style.VideoPlayer}>
                            <YouTube id="youtube-video" videoId={this.props.youtube_id} opts={opts} onPlay={this._onPlayGetCurrentTime}/>
                            <HeroButton 
                                text="Back to the Video"
                                primary
                                onClickMethod={this.handlePreviousPopup}
                            />
                        </div>
                    </div>
                    <div id="related-videos" className={style.RelatedSection}>
                        <br/>
                        <h1>Watch Realted Videos Together</h1> <br/>
                        <div className={style.RelatedVideo}>
                            <div className={style.RelatedSpeechAct}>
                                Related to 'Greeting'
                            </div>
                            <div className={style.RelatedIntensity}>
                                Intesity ★★★★☆
                            </div>
                            <div className={style.RelatedRelationship}>
                                Related to Friends
                            </div>
                            <div className={style.RelatedFormality}>
                                Formality ★☆☆☆☆
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        );   
    }
}

//export default VideoPopup;
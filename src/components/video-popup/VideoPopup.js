import React, {Component} from 'react';
import ReactDom from 'react-dom';
//import { Button, Header, Image, Modal } from 'semantic-ui-react';
//import style from './Navigation.module.scss';
import style from './VideoPopup.module.scss';
import '../../global.css';
import { relative } from 'path';
import YouTube from 'react-youtube';

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
            currentTime: 1
        }
    }

    GetTime() {
        setInterval(() => {
            this.setState({currentTime: event.target.getCurrentTime()})
        }, 1000);
    }

    componentDidMount() {
        fetch(`http://localhost:4000/getVideoSubtitles?youtube_id=${this.props.youtube_id}`, {
            method: 'GET',
        }).then(res=>res.json())
        //.then(res=>console.log(res))
        .then(subtitle=>this.setState({subtitle: subtitle}));
    }

    render() {
        console.log(this.state.subtitle);
        const opts = {
            height: '100%',
            width: '100%'
        };

        return (
            <div className={style.VideoPopup}>
                <div id="header" className={style.Header}>
                    <h1 style={{marginLeft: '15px'}}>{this.props.title} - {this.props.category}</h1>
                    <h1 style={{float: 'right', marginRight: '15px'}}>Uploaded Date: {this.props.uploaded_date}</h1>
                </div>
                <div id="video" className={style.Video}>
                    <div className={style.VideoPlayer}>
                        <YouTube videoId={this.props.youtube_id} opts={opts}/>
                        {this.GetTime()}
                        {/*<object type="text/html" width="100%" height="100%" data={"//www.youtube.com/embed/"+this.props.youtube_id} allowFullScreen></object>*/}
                    </div>
                    <div className={style.VideoSubtitle}>
                        <br/>
                        <h1>Subtitle</h1> <br/>
                        <div className={style.subtitles}>
                            {this.state.subtitle.map((sub, i) => {
                                return (<p><span>{sub[0]}</span><span>{sub[1]}</span></p>);
                            })}
                        </div>
                    </div>
                </div>
                <div id="context-form" className={style.Context}>
                    <br/>
                    <h1>Context</h1> <br/>
                    <p>{this.state.currentTime}</p>
                    <div className={style.contextform}>
                        {/*<form>
                            what <input type="text" />
                            who <input type="text" />
                        </form>*/}
                    </div>
                </div>
            </div>
        );
    }
}

//export default VideoPopup;
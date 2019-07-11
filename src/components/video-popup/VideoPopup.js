import React, {Component} from 'react';
import ReactDom from 'react-dom';
//import { Button, Header, Image, Modal } from 'semantic-ui-react';
//import style from './Navigation.module.scss';
import style from './VideoPopup.module.scss';
import '../../global.css';
import { relative } from 'path';

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
    render() {
        return (
            <div className={style.VideoPopup}>
                <div id="header" className={style.Header}>
                    <h1 style={{marginLeft: '15px'}}>Title - Category</h1>
                    <h1 style={{float: 'right', marginRight: '15px'}}>Uploaded Date: 2017/08/11</h1>
                </div>
                <div id="video" className={style.Video}>
                    <div className={style.VideoPlayer}>
                        <object type="text/html" width="100%" height="100%" data="//www.youtube.com/embed/R2zNRrOXbPY" allowFullScreen></object>
                    </div>
                    <div className={style.VideoSubtitle}>
                        <br/>
                        <h1>Subtitle</h1> <br/>
                        <div className={style.subtitles}>
                            <p><span>5.58</span><span>aww..</span></p>
                            <p><span>12.54</span><span>Who gets his wand?</span></p>
                            <p><span>18.76</span><span>I'm only going to ask you once more goblin! think of very very carefully before you answer</span></p>
                            <p><span>26.26</span><span>I don't know</span></p>
                            <p><span>5.58</span><span>aww..</span></p>
                            <p><span>12.54</span><span>Who gets his wand?</span></p>
                            <p><span>18.76</span><span>I'm only going to ask you once more goblin! think of very very carefully before you answer</span></p>
                            <p><span>26.26</span><span>I don't know</span></p>
                            <p><span>5.58</span><span>aww..</span></p>
                            <p><span>12.54</span><span>Who gets his wand?</span></p>
                            <p><span>18.76</span><span>I'm only going to ask you once more goblin! think of very very carefully before you answer</span></p>
                            <p><span>26.26</span><span>I don't know</span></p>
                            <p><span>5.58</span><span>aww..</span></p>
                            <p><span>12.54</span><span>Who gets his wand?</span></p>
                            <p><span>18.76</span><span>I'm only going to ask you once more goblin! think of very very carefully before you answer</span></p>
                            <p><span>26.26</span><span>I don't know</span></p>
                        </div>
                    </div>
                </div>
                <div id="context-form" className={style.Context}>
                    <br/>
                    <h1>Context</h1> <br/>
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
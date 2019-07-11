import React, {Component} from 'react';
import ReactDom from 'react-dom';
//import { Button, Header, Image, Modal } from 'semantic-ui-react';
//import style from './Navigation.module.scss';
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
            <div style={{position: 'absolute', top: '50%', left:'50%', zIndex: '10', width: '90%', height: '90%', margin: '-25% 0 0 -45%'}}>
                <div id="header" style={{width: '100%', height: '5%', backgroundColor: 'black', fontSize: '28px'}}>
                    <h1 style={{display: 'inline', marginLeft: '15px'}}>Title - Category</h1>
                    <h1 style={{float: 'right', display: 'inline', marginRight: '15px'}}>Uploaded Date: 2017/08/11</h1>
                </div>
                <div id="video" style={{width: '100%', height: '65%', margin: '0 auto', backgroundColor: 'blue'}}>
                    {/*<iframe src="www.youtube.com/embed/O6Xo21L0ybE" width="100%" height="100%"></iframe>*/}
                    <div style={{width: '50%', height: '100%', float:'left'}}>
                        <object style={{margin: '0 auto'}} type="text/html" width="100%" height="100%" data="//www.youtube.com/embed/qFmXLGheyqs" allowFullScreen></object>
                    </div>
                    <div style={{width: '50%', height: '100%', float:'left'}}>
                        <h1>Subtitle</h1>
                        <h1>1:00 Blah~ blah~</h1>
                    </div>
                </div>
                <div id="tag-form" style={{width: '100%', height: '30%', backgroundColor: 'yellow'}}>
                </div>
            </div>
        );
    }
}

//export default VideoPopup;
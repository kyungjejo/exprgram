import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoPopup from '../components/video-popup';
import { changePopup } from '../store/modules/popup';

class VideoPopupContainer extends Component {
    handlePopup = show_popup => {
        const { changePopup } = this.props;
        console.log('waht');
        changePopup(show_popup);
    };

    render() {
        const { show_popup } = this.props;
        return <VideoPopup />
    }
}
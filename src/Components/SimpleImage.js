import React, {Component} from "react";
import ImageUploader from "react-images-upload";
import {connect} from 'react-redux';
import axios from 'axios';

class SimpleImage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        pictures: [] 
    };
    
  }

  sendWallpaper = () => {
      const {id} = this.props.aR.w_user,
      photo = this.state.pictures[0];
      const body = {name: photo.name}
      axios.put(`/api/wallpaper/${id}`, {photo})
      .then(() => {
        console.log(photo)
        console.log(photo.name)
      }).catch((err) => console.log(err))
    }

  onDrop = (pictureFiles, pictureDataURLs) => {
    this.setState({
      pictures: pictureFiles
    });
  }

  render() {
      console.log(this.props)
      console.log(this.state.pictures)
    return (
        <div>
      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={this.onDrop}
        accept="accept=image/*"
        maxFileSize={555242880}
      />
      
      <button onClick={this.sendWallpaper}>send</button>
    </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
    return{
        aR: reduxState.authReducer
    }
}

export default connect(mapStateToProps)(SimpleImage);
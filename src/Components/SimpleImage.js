import React, {Component} from "react";
import ImageUploader from "react-images-upload";
import { v4 as randomString } from 'uuid';
import {connect} from 'react-redux';
import axios from 'axios';

class SimpleImage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
       
        url: '',
        value: ''
        
    };
    
  }

  onDrop = (pictureFiles, pictureDataURLs) => {
      console.log(pictureFiles)
    this.setState({
      pictures: pictureFiles
    });
  }

  
  
  getSignedRequest = ([file]) => {
      console.log(file)
   
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

    axios.get('/api/signs3', {
      params: {
        'file-name': fileName,
        'file-type': file.type,
      },
    })
      .then(res => {

        const { signedRequest, url } = res.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    console.log('hit0')
    file = this.state.pictures
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    console.log(signedRequest);
    console.log(file);
    console.log(url)

    axios.put(signedRequest, file, options)
      .then(res => {
        console.log('hit1')
        this.setState({url})
      })
      .catch(err => {
        console.log('hit2')
        console.log(err)
        
        if (err.res.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys{
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}, ${err.stack}`);
        }
      });
  };

//   pushWallpaper = () => {
//     const {id} = this.props.aR.w_user.id
//     axios.put(`/api/wallpaper/${id}`, this.setState.url)
//     .then(() => {

//     })
//     .catch(err => console.log(err));
//   }

  sendWallpaper = () => {
      const {id} = this.props.aR.w_user,
      photo = this.state.pictures[0];
      
      axios.put(`/api/wallpaper/${id}`, {photo})
      .then(() => {
        console.log(photo)
       
      }).catch((err) => console.log(err))
    }

  

  render() {
      console.log(this.props)
      console.log(this.state.pictures)
     const {pictures} = this.state
    return (
        <div>
      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={this.onDrop}
        accept="accept=image/*"
        maxFileSize={555242880}
      />
      <button onClick={() => this.getSignedRequest(pictures)}>signedRequest</button>
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
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {pushWallpaper} from '../Dux/userReducer';




class Uploader extends Component {
    constructor(props) {
      super(props);
        this.state = {
            files: '',

        }
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.setState({
          [e.target.name]: e.target.value
      })

   
    }
    sendFile = () => {
        this.props.pushWallpaper(this.state.files);
    }
  
    render() {
        console.log(this.state.files)
        console.log(this.props)
      return (
        <form >
          <label>
            Upload file:
            <input onChange={this.handleSubmit}
             type="file"  
             name="files" />
          </label>
          <br />
          <button onClick={this.sendFile}type="submit">Submit</button>
        </form>
      );
    }
  }

  const mapStateToProps = (reduxState) => {
    return{
        uR: reduxState.userReducer  
    }
}
  export default connect(mapStateToProps, {pushWallpaper})(Uploader);
import React, { Component } from 'react';
import axios from 'axios';
import './theUploader.css';

class TheUploader extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFile: null
        }
    }

    onChangeHandler = (event) => {
       this.setState({
           selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post('http://localhost:5050/upload', data)
        .then(res => {console.log(res.status)
        })
        .catch(err => console.log(err))
    }
        


    render() {

        console.log(this.state.selectedFiles)
        return (
            
            <div className='container'>
                <div className='row'>

                    <div className='col-md-6'>
                        <form method='post' action='#' id='#'>
                          
                                <label>Upload your File</label>

                          

                            <input 
                                type='file' 
                                name='file' 
                                onChange={this.onChangeHandler}>
                            </input>
                        <button type='button' className='success' onClick={this.onClickHandler}>Upload</button>
                            
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default TheUploader;

                  
                                    



              
            
	      
	      
           
              
              
              
           
            
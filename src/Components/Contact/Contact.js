import React, { Component } from "react";
import {connect} from 'react-redux';
import {getUser} from '../../Dux/authReducer';
import axios from 'axios';
import './contact.css';


class Contact extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            subject: '',
            content: ''

        }
    }


    handleInput = (val) => {
        this.setState({ email: val, subject: val, content: val })
    }

    sendEmail = () => {
        const {id} = this.props.w_user
        const {email, subject, content} = this.state
      axios.post(`/api/email${id}`, {email, subject, content})
      .then(() => {
          alert('Email Sent')
      })
      .catch(err => console.log(err));

    }


    render(){
        return(
          
            <div className='contact-box'>
            <input className='email-box'
                name='email'
                type='text'
                placeholder='Enter Your Email Address Here!'
                onChange={this.handleInput}>
            </input>
            <input className='sub-box'
                name='subject'
                type='text'
                placeholder='Subject'
                onChange={this.handleInput}>
            </input>
            <textarea className='text-box'
                name='content'
                type='text'
                placeholder='Tell Us What You Think!'
                onChange={this.handleInput}>
            </textarea>  
        <button onClick={this.sendEmail}>SEND EMAIL</button>

                
        </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return{
        aR: reduxState.authReducer,
        uR: reduxState.userReducer  
    }
}


export default connect(mapStateToProps, {getUser})(Contact);
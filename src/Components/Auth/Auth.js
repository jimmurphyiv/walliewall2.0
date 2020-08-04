import React,  {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../Dux/authReducer';
import './auth.css'

class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password:'',
            email: '',
            profile_pic: ''
           

        }
    }

    
    

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleRegister = () => {
        const {first_name, last_name, username, password, email, profile_pic} = this.state;

        let body =  {first_name, last_name, username, password, email, profile_pic}

           axios.post('/auth/register', body)
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/Dash');
            })
            .catch(err => console.log(err));
       
                
     

    }
    

    render(){
        return (
        <div className='auth-container'>
            <section>
                
                    <input 
                        value={this.state.username}
                        name='username'
                        placeholder='USERNAME'
                        onChange={this.handleInput}/>
                    <input 
                        value={this.state.first_name}
                        name='first_name'
                        placeholder='FIRST NAME'
                        onChange={this.handleInput}/>
                    <input 
                        value={this.state.last_name}
                        name='last_name'
                        placeholder='LAST NAME'
                        onChange={this.handleInput}/>
                    <input 
                        value={this.state.email}
                        name='email'
                        placeholder='EMAIL'
                        onChange={this.handleInput}/>
                    <input 
                        type='password'
                        value={this.state.password}
                        name='password'
                        placeholder='PASSWORD'
                        onChange={this.handleInput}/>
                    <input
                        value={this.state.profile_pic}
                        name='profile_pic'
                        placeholder='PASTE PROFILE PIC URL'
                        onChange={this.handleInput}/>

                    <button onClick={this.handleRegister}>REGISTER</button>
            </section>
        </div>
        ) 
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Auth);
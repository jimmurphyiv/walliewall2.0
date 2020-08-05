import React, { Component } from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import {getPosts} from '../../Dux/userReducer';
import './profile.css'



class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            profile_pic: '',
            editView: false,
            userPosts: [],
            url: ''
        }
    }
  

    handleInput = (val) => {
        this.setState({ first_name: val, last_name: val, username: val, profile_pic: val })
    }
    handleEditView = () => {
        this.setState({editView: !this.state.editView})
    }
    editProfile = () => {
        const {first_name, last_name, username, profile_pic} = this.state;
        axios.put(`/auth/edit/${this.props.aR.w_user.id}`, 
        {first_name, last_name, username, profile_pic})
        .then(res => {
            this.props.getUser(res.data[0]);
            this.handleEditView();
            this.setState({
                first_name: '',
                last_name: '',
                username: '',
                profile_pic: ''
            });
        })
        .catch(err => console.log(err));
    }

    getUserPosts = () => {
        const {id} = this.props.aR.w_user.id
        console.log(this.props, id)
        axios.get(`/api/post/${id}`)
        .then(res => this.setState({userPosts: res.data}))
        .catch(err => console.log(err));
    }

    deletePost = (id) => {
        console.log(id)
        axios.delete(`/api/post/${id}`)
        .then(() => {this.props.getPosts()})
        .catch(err => console.log(err))
    }

        
    



    render(){
        console.log(this.props)
        const mappedPost = this.props.uR.w_user.map((post, i) => {
            console.log(post)
            return <div className='list' key={post.id}>
                <p>{post.title}</p>
                <img src={post.image} alt='post' />
                <p>{post.content}</p>
                <button onClick={() => this.deletePost(post.id)}>DELETE</button>
            </div>
            })
       
        return (
            <section className='profile-container' >
                <div className='profile-box'>
                    <div className='pic'>
                    <img src={this.props.aR.w_user.profile_pic}
                    alt={this.props.aR.w_user.username}/>
                    </div>
                    <div className='bio'>
                        Subway tile crucifix sustainable man braid fanny pack fashion axe whatever bitters kitsch yr kombucha af messenger bag.Lomo selvage single-origin coffee try-hard beard subway tile jianbing crucifix thundercats vape. Lomo plaid humblebrag mumblecore, offal quinoa fixie taxidermy. Gochujang 3 wolf moon heirloom glossier, squid iceland poke yr slow-carb gluten-free hashtag bicycle rights. Humblebrag sriracha af yuccie, kombucha squid hella selvage
                    </div>
                </div>
            
            
            <section className='edit-inputs'>
                {!this.state.editView
                ? <h2>{this.props.aR.w_user.username} <button id='edit-button' onClick={this.handleEditView}>EDIT PROFILE</button></h2>
                : (<div><input 
                    value={this.state.first_name}
                    placeholder='NEW FIRST NAME'
                    onChange={(e) => this.handleInput(e.target.value)}/>
                <button id='edit-button' onClick={this.updateFirst_name}>Submit</button><input 
                        value={this.state.last_name}
                        placeholder='NEW LAST NAME'
                        onChange={(e) => this.handleInput(e.target.value)}/>
                    <button id='edit-button' onClick={this.updateLast_name}>Submit</button><input 
                        value={this.state.username}
                        placeholder='NEW USERNAME'
                        onChange={(e) => this.handleInput(e.target.value)}/>
                    <button id='edit-button' onClick={this.updateUsername}>Submit</button>
                    <input 
                        value={this.state.profile_pic}
                        placeholder='NEW PROFILE PIC'
                        onChange={(e) => this.handleInput(e.target.value)}/>
                    <button id='edit-button' onClick={this.updateProfile_pic}>Submit</button>
                </div>)
                }
            </section>
                <section className='collections'>
                    <div>
                      
                    </div>
                    <div>
                        <h2>My Posts</h2>
                        {mappedPost}
                        <button onClick={this.deletePost}>DELETE</button>
                    </div>
                    
                    <div>
                        <h3>My Collection</h3>
                    </div>

                </section>

        </section>      
        )
    }
     

}

const mapStateToProps = (reduxState) => {
    return{
        aR: reduxState.authReducer,
        uR: reduxState.userReducer  
    }
}


export default connect(mapStateToProps,{getPosts})(Profile);
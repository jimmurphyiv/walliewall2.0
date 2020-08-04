import React,  {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../../Dux/userReducer';
import axios from 'axios';
import './dash.css';



class Dash extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            title: '',
            image: '',
            content: ''
           
        }
    }

    componentDidMount(){
        this.props.getPosts()
        this.setState({
           posts: this.props.w_user

        })
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
   
    createPost = () => {
        const {title, image, content} = this.state
        axios.post(`/api/post/${this.props.w_user.id}`, {title, image, content})
        .then(() => {
            
            this.getPosts();
            this.setState({image: ''});
        })
        .catch(err => console.log(err));
    }

    
    getUserPosts = () => {
        axios.get(`/api/post/${this.props.w_user.id}`)
        .then(res => this.setState({posts: res.data}))
        .catch(err => console.log(err));
    }
  


    deletePost = (id) => {
        axios.delete(`/api/post/${id}`)
        .then(() => {this.getUserPosts();
        })
        .catch(err => console.log(err))
    }

  

    render(){
        const mappedPost = this.props.uR.w_user.map((post, i) => {
        return <div className='feed-list' key={i}>
            <p>{post.title}</p>
            <img src={post.image} alt='post' />
            <p>{post.content}</p>
            <button>Post</button>
        </div>
        })
       console.log(this.props)
    
        return(
            <section className='flex-container'>
             
                <div className='profile-box'>
                    <div className='pic'>
                    <img src={this.props.aR.w_user.profile_pic}
                    alt={this.props.aR.w_user.username}/>
                    </div>
                    <div className='bio'>
                    Subway tile crucifix sustainable man braid fanny pack fashion axe whatever bitters kitsch yr kombucha af messenger bag.Lomo selvage single-origin coffee try-hard beard subway tile jianbing crucifix thundercats vape. Lomo plaid humblebrag mumblecore, offal quinoa fixie taxidermy. Gochujang 3 wolf moon heirloom glossier, squid iceland poke yr slow-carb gluten-free hashtag bicycle rights. Humblebrag sriracha af yuccie, kombucha squid hella selvage
                    </div>
                </div>
               
                <div className='feed'>
                    <h2>FEED</h2>
                    
                    <input 
                    value={this.state.title}
                    name='title'
                    placeholder='Add Title'
                    onChange={this.handleInput}/>
                
                <input
                    value={this.state.image}
                    name='image'
                    placeholder='Add Image URL'
                    onChange={this.handleInput}/>
                
                <input 
                    value={this.state.content}
                    name='content'
                    placeholder='Add Content'
                    onChange={this.handleInput}/>
                <button onClick={this.createPost}>Post</button>

                {mappedPost}
                </div>
                
                <div className='messages'>
                    messages
                </div>
                
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

export default connect(mapStateToProps, {getPosts})(Dash);
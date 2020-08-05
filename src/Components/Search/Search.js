import React, { Component } from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import './search.css'


class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            w_user: [],
            search: []
        }
    }

    componentDidMount(){
        axios.get(`/api/users`)
        .then(res => {
            this.setState({
                w_user: res.data
            })
        }).catch(err => console.log(err))
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }



    searchResults = () => {
        let output = [];
        output = this.state.w_user.filter((e, i, a) => e.wallpaper === this.state.search)
    }



    
    render(){
        console.log(this.state.w_user)
        return(
            <div className='search-container'>
                <section className='search-box'>
                    <h1>SEARCH</h1>
                    <input 
                    type='text'
                    name='search'
                    required
                    onChange={(e) => this.handleChange(e)}>
                    </input>
                    <button>KEYWORD</button>
                    
                   
                </section>

                <section className='catergories-box'>
                    <div className='cater-box'> 
                        catergorie
                    </div>
                    <div className='cater-box'> 
                        catergorie
                    </div>
                    <div className='cater-box'> 
                        catergorie
                    </div>
                    <div className='cater-box'> 
                        catergorie
                    </div>
                    <div className='cater-box'> 
                        catergorie
                    </div>
                    <div className='cater-box'> 
                        catergorie
                    </div>
                    <div className='cater-box'> 
                        catergorie
                    </div>
                    <div className='cater-box'> 
                        catergorie
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return{
        uR: reduxState.userReducer  
    }
}
export default connect(mapStateToProps)(Search);
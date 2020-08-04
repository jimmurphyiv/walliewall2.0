import React, { Component } from "react";
import './search.css'

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            catergorie: []
        }
    }

    
    render(){
        return(
            <div className='search-container'>
                <section className='search-box'>
                    <h3>SEARCH</h3>
                    
                    <button>KEYWORD</button>
                    
                    <button>TYPE</button>
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

export default Search;
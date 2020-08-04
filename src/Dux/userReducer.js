import axios from 'axios';

const initialState = {
    w_user: []
}

const GET_POSTS = 'GET_POSTS';

 

export function getPosts(){ 
    let posts = axios.get('/api/post')
    return {
        type: GET_POSTS,
        payload: posts
    }
}



export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_POSTS +'_PENDING': 
            return state;
        case GET_POSTS +'_FULFILLED':
            console.log(payload)            
            return{...state, w_user: payload.data};
        case GET_POSTS +'_REJECTED':
            return state;
        default: 
            return state;
        }
}
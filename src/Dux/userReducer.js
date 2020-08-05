import axios from 'axios';

const initialState = {
    w_user: [],
    files: []

}

const GET_POSTS = 'GET_POSTS';
const PUSH_WALLPAPER = 'PUSH_WALLPAPER';
 

export function getPosts(){ 
    let posts = axios.get('/api/post')
    return {
        type: GET_POSTS,
        payload: posts
    }
}

export function pushWallpaper(wallObj){
    
    console.log(wallObj)
    return {
        type: PUSH_WALLPAPER,
        payload: wallObj
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
        case PUSH_WALLPAPER:
            console.log(payload)
            return {...state, files: payload.data}
        default: 
            return state;
        }
}
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const config = { headers:{ token: localStorage.getItem('token')

}}

export const AddPost = createAsyncThunk('post/AddPost', async(newPost,{rejectWithValue,dispatch})=>{
    try {
        const {data} = await axios.post('/api/posts/',newPost,config)
        dispatch(getAllPosts())
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getAllPosts = createAsyncThunk('post/getAllPosts', async(_,{rejectWithValue})=>{
    try {
        const {data} = await axios.get('/api/posts/')
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
   
    }
})

const PostSlice = createSlice({
    name:'post',
    initialState:{
        isLoading:false,
        post:{},
        posts:[],
        Errors:null
    },

    reducers:{},
    extraReducers:{
        [AddPost.pending]: (state)=>{
            state.isLoading = true
        },
        [AddPost.fulfilled]:(state,{type,payload})=>{
            state.isLoading = false
            state.post = payload
        },
        [AddPost.rejected]: (state,{type,payload})=>{
            state.Errors = payload
        },
        [getAllPosts.pending]: (state)=>{
            state.isLoading = true
        },
        [getAllPosts.fulfilled]:(state,{type,payload})=>{
            state.isLoading = false
            state.posts = payload
        },
        [getAllPosts.rejected]: (state,{type,payload})=>{
            state.Errors = payload
        }

    }
})

export default PostSlice.reducer
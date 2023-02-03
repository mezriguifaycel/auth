import { configureStore } from "@reduxjs/toolkit";
import User from './UserSlice'
import Post from './PostSlice'

export const Store = configureStore({
    reducer:{
        User,
        Post
    }
})
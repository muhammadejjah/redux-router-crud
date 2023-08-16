import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";


const initialState = {
    records: [],
    loading: false,
    error :null,
    record : null,
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async(_,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try{
        const res = await fetch("http://localhost:5000/posts")
        const data = res.json()
        return  data
    }catch(err){
    return rejectWithValue(err.message)
    }
})

export const deletePosts = createAsyncThunk("posts/deletePosts", async(id,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try {
        await fetch(`http://localhost:5000/posts/${id}`,{
        method:"DELETE",
        })
        return id
    } catch (err) {
        return rejectWithValue(err.message)
    }
})

export const addPosts = createAsyncThunk("posts/addPosts", async(item,thunkAPI)=>{
    const {rejectWithValue ,getState}=thunkAPI
    console.log(getState().authSlice)
    item.userId= getState().authSlice.id
        try {
        const res = await fetch(`http://localhost:5000/posts` , {
            method:"POST",
            body : JSON.stringify(item),
            headers:{
                "Content-Type": "application/json; charset=UTF-8",  
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return rejectWithValue(err.message)
    }
})

export const getPost = createAsyncThunk("posts/getPost",async (id,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try {
        const res  = await fetch (`http://localhost:5000/posts/${id}`)
        const data = await res.json()
        return data
    } catch (err) {
        return rejectWithValue(err.message)
    }

})
const postSlices = createSlice({
    name:"posts",
    initialState,
    extraReducers:{
        // fetchPosts
        [fetchPosts.pending]:(state,action)=>{
            state.loading = true;
            state.error = null;
        },
        [fetchPosts.fulfilled]:(state,action)=>{
            state.loading = false;
            state.records= action.payload;
        },
        [fetchPosts.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },

        
        //deleteSlice
        [deletePosts.pending]:(state,action)=>{
            state.loading = true;
            state.error = null;
        },
        [deletePosts.fulfilled]:(state,action)=>{
            state.loading = false;
            state.records= state.records.filter(el=>el.id!== action.payload)
        },
        [deletePosts.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },

        //addPosts
        [addPosts.pending]:(state,action)=>{
            state.loading = true;
            state.error = null;
        },
        [addPosts.fulfilled]:(state,action)=>{
            state.loading = false;
            state.records.push(action.payload);
        },
        [addPosts.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },

        //get post
        [getPost.pending]:(state,action)=>{
            state.loading = true;
            state.error = null;
        },
        [getPost.fulfilled]:(state,action)=>{
            state.loading = false;
            state.record = action.payload;
        },
        [getPost.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
    }
})
export default postSlices.reducer

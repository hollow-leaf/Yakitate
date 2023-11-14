import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    wallet:{
        address: "",
        login:false
    }
}

const userSlice:any = createSlice({
    name:"user",
    initialState : initialState,
    reducers:{
        setLogin(state:any,action){
            const {address}=action.payload
            state.wallet={
                address,
                login:true,
            }
        },
        setLogout(state:any){
            state.wallet = initialState
        },
    }
})

export const {setLogin,setLogout} = userSlice.actions

export default userSlice.reducer
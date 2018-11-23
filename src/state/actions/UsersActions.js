import axios from 'axios';

const fetchUsers = () => {
    return async(dispatch) => {
        let response = await axios.get("https://g4-ch2.herokuapp.com/api/usuarios/red")
        dispatch({ type: "FETCH_USERS", payload: response.data });
    }
}


const createUser = (data) => {
    return async (dispatch) => {
        let response = await axios.post("https://g4-ch2.herokuapp.com/api/usuarios/red", data);
        dispatch({ type: "CREATE_USER", payload: response.data });
    }
}

const deleteUser = (id) => {
    return async (dispatch) => {
        await axios.delete(`https://g4-ch2.herokuapp.com/api/usuarios/red/${id}`);
        dispatch({ type: "DELETE_USER"});
    }
}

const updateUser = (id, data) => {
    
    return async (dispatch) => {
        await axios.post(`https://g4-ch2.herokuapp.com/api/usuarios/red/${id}`, data);
        dispatch({ type: "UPDATE_USER_SUCCESS" });
    }
}

export { fetchUsers, createUser, deleteUser, updateUser };
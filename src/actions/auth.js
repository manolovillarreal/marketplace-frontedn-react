
import {fetchNoToken,fetchToken} from '../helpers/fetch'
import {types} from '../types/types'

export const startLogin = async (email,password,dispatch)=>{
    
        const resp = await fetchNoToken('auth/login',{email,password},'POST');
        const body = await resp.json();

        if(resp.ok){
            const {token,user} = body;
            console.log(body);
            localStorage.setItem('token',token);
            localStorage.setItem('token-init-date',new Date().getTime());

            dispatch(login(user));
        }
        else{
            console.log(body);
        }

        return body;

}

export const startRegister = async (name,email,password,role,dispatch)=>{
    
    const resp = await fetchNoToken('auth/new',{name,email,password,role},'POST');
    const body = await resp.json();

    if(resp.ok){
        const {token,user} = body;
        console.log(body);

        localStorage.setItem('token',token);
        localStorage.setItem('token-init-date',new Date().getTime());

        dispatch(login(user));
    }
    else{
        console.log(body);
    }

    return body;

}

export const startChecking = async (dispatch)=>{
    
    const resp = await fetchToken('auth/renew');
    const body = await resp.json();

    if(body.ok){
        const {user,token} = body
        localStorage.setItem('token',token);
        localStorage.setItem('token-init-date',new Date().getTime());

        dispatch(login(user));
    }
    else{
        dispatch({type:types.authLogout});
    }

}

export const logout = (dispatch,history) =>{

    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date');

    dispatch({ 
        type: types.authLogout 
    });

    history.replace('/');
}


const login = (user) =>({
    type: types.authLogin,
    payload:user
});

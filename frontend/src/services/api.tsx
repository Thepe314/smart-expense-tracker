import axios from "axios"

// Base config, all apis will call from here 
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",  //link to backend localhost or server
  headers: {
    "Content-Type": "application/json", //type of content the payload will be(Object)
  },
});


//1. Made JWT Token Functions 
export const getToken =() =>localStorage.getItem('token');
export const setToken =(token:string) =>localStorage.setItem('token',token);
export const removeToken =() =>localStorage.removeItem('token');
export const isAuthenticated =() =>!!getToken();

//2. Made Request interceptors to automatically add token to every request/api call
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token)
    {
        config.headers.Authorization ='Bearer ${token}';
    }

    return(config);
    },

      (error) => Promise.reject(error)
);

//Later add interceptor.response

//Auth api
export const authService={

    //login api take in email and password attributes from backend
    login: async (email:string, password:string) =>
    {
        const response = await api.post('/login', {email,password}); // /login is the endpoint of the api needs to have email and password
        const {token, user}=response.data; // backend returns user and token
        setToken(token); // sets/saves the jwt tokem to local storage 
        return{token, user}; // returns or give object of jwt token and user for usage/component
    },

    signup: async (email:string, password:string) =>
    {
        const response = await api.post('/signup', {email,password}); // /login is the endpoint of the api needs to have email and password
        const {token, user}=response.data; // backend returns user and token
        setToken(token); // sets/saves the jwt tokem to local storage 
        return{token, user}; // returns or give object of jwt token and user for usage/component
    },


    // api for logout
    logout : async () =>
    {
        try{
            await api.post('/logout'); //calls for logout api
            
        }catch{
            //empty 
            
        }finally {
            removeToken(); // removes stored jwt toekn from local storage.
        }

    },




}

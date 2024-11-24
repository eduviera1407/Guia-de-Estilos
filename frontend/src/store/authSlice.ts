import { createSlice } from '@reduxjs/toolkit' // Importamos la función createSlice de la librería redux-toolkit

//Creamos el tipo AuthState. Este tipo será un objeto cuyos elementos son un boolean y dos strings.
export interface AuthState {
isAutenticated: boolean,
userName: string,
userRol: string
}
//Declaramos la variable initialAuthState (que es un objeto) y decimos que es del tipo AuthState.
//Inicializamos los elementos de dicha variable:
//El usuario inicialmente no está autenticado (isAutenticated: false)
//El nombre de usuario y su rol inicialmente son cadenas vacías.
const initialAuthState: AuthState = {
isAutenticated: false,
userName: '',
userRol: ''
}
//Creamos los reducers dentro de la función createSlice y los asignamos a la variable authSlice:
//. Primero le damos un nombre
//. Segundo establecemos el estado inicial
//. Tercero creamos los reducers: login y logout
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login: (state, action) => {
            const userData = action.payload;  // Datos del usuario (nombre, rol)
            state.isAutenticated = true;
            state.userName = userData.name;
            state.userRol = userData.rol;  // Aquí se debe guardar el rol
        },
        logout: (state) => {
            state.isAutenticated = false;
            state.userName = '';
            state.userRol = '';
        }
    }
});


export const authActions = authSlice.actions;
export default authSlice.reducer;

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  // Otros reducers si los tienes
});

const store = configureStore({
    reducer: rootReducer, // Debes proporcionar tu root reducer aquí
    // Puedes configurar otras opciones si es necesario
  });

export default store;
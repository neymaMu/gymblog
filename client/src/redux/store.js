import { configureStore,combineReducers} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import{persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import userupdate from './update/updateSlice'

import themereducer from './theme/themeSlice'



const rootReducer = combineReducers({
  user:userReducer,
  me:userupdate,
  theme:themereducer,
 
})



const persistConfig = {
  key:'root',
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig,rootReducer)




export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware) => 
  getDefaultMiddleware({serializableCheck:false})

})

export const persistor = persistStore(store)
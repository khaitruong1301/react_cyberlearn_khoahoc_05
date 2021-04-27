import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducers/CarouselReducer';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';

const rootReducer = combineReducers({
    //state ứng dụng
    CarouselReducer,
    QuanLyPhimReducer
});


export const store = createStore(rootReducer,applyMiddleware(thunk));




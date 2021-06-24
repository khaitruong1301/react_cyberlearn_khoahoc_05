import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';


//antd
import "antd/dist/antd.css";

//reactslick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//cấu hình signalr
import * as signalR from '@aspnet/signalr';
import { DOMAIN } from './util/settings/config';


export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();
connection.start().then(function () {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    ,
    document.getElementById('root')
  );

});
// connection.onclose()

// .then(function () {
//   console.log("connected");
//   connection.invoke("loadDanhSachGhe");
// }).catch(function (err) {
//   return console.error(err.toString());
// });



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

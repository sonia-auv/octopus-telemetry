import React from 'react';
import './App.css';
import * as Roslib from 'roslib'

var ros = new Roslib.Ros({
    url: 'ws://localhost:9090'
})

ros.on('connection', function(){
    console.log('Connected')
})

ros.on('error', function(error){
    console.log('Error: ' + error)
})

ros.on('close', function(){
    console.log('Connection closed')
})

var listener = new Roslib.Topic({
    ros: ros,
    name: '/proc_navigation/odom',
    messageType: 'nav_msgs/Odometry'
})

listener.subscribe(function(message){
    console.log('Received message on ' + listener.name + ' : ' + JSON.stringify(message))
    listener.unsubscribe()
})
function App() {

  return (
    <div className="App">
      <p>WIP</p>
    </div>
  );
}

export default App;

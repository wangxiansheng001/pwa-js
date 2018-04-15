onmessage = function (ev) {
    console.log(ev.data);
    while(true){
        postMessage(Math.random());
    }
  }
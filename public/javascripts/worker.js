(function(){
  var worker;
  if (typeof(Worker) !== "undefined") {
    if (typeof(worker) == "undefined") {
      worker = new Worker('javascripts/background_worker.js');
    }
    worker.onmessage = function(event) {
      if(event.data == 'logout')
      {
        if(localStorage.loggedIn==undefined || !eval(localStorage.loggedIn)){
          if(window.location.href.match('dashboard').length > 0)
          {
            window.location.replace('/public/index.html')
          }
          history.pushState(null, null, location.href);
          window.onpopstate = function () {
            history.go(1);
          };
        }
      }
    };
  } else {
    console.log("Web Workers are not supported in your browser")
  } 
})();
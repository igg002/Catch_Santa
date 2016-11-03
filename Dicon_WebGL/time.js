var Time = function(){
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
};

var mainTime = new Time();
setInterval(function(){
    mainTime.seconds++;
}, 1000);
setInterval(function(){
    if(mainTime.seconds % 60 == 0 && mainTime.seconds != 0 && mainTime.seconds != null){
        mainTime.minutes++;
        mainTime.seconds = 0;
    }
    if(mainTime.minutes % 60 == 0 && mainTime.minutes != 0 && mainTime.seconds != null){
        mainTime.hours++;
        mainTime.minutes = 0;
    }    
}, 1);
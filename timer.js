$("#timer").click(function() {
    let input = Number(prompt("Please input seconds here"));

    let result = isValid(input);
    if(!result.status) {
        alert(result.message);
        return;
    }

    if(input > 0) {
       $("button").css("display", "none");
       $("#timer-cancel").css("display", "block");
       timer(input);
    }
})

$("#timer-cancel").click(function() {
    clearInterval(interval);
    $("h1").text(secondsToHours(0));
    $("button").show();
    $("#timer-cancel").hide();
    $(".stopwatch-button").hide();
})

$("#stopwatch").click(function() {
    let input = Number(prompt("Please input seconds here"));

    let result = isValid(input);
    if(!result.status) {
        alert(result.message);
        return;
    }

    $("button").css("display", "none");
    $(".stopwatch-button").css("display", "block");

    stopwatch(input);
})

function isValid(input) {   
    if (input < 0) {
        return {status: false, message: `input is ${input} and it needs to be postive`};
    } else if (typeof(input) != 'number') {
        return {status: false, message: `input is ${input} and it needs to be a number`};
    } else {
        return {status: true, message: ""};
    } 
}

var interval;

function timer(input) {
    interval = setInterval(function() {  
        if (input === 0) {
            clearInterval(interval);
            $("button").css("display", "block");
        }
        
        $("h1").text(secondsToHours(input));
        input--;

    }, 1000);
}

function secondsToHours(time) {
    let hours = parseInt(time / 3600);
    let remainderSeconds = time % 3600;
    let minutes = parseInt(remainderSeconds / 60);
    let seconds = parseInt(remainderSeconds % 60);
    
    if (hours < 10) {
        hours = "0" + hours;
    }
    
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    
    return `${hours}:${minutes}:${seconds}`
}

var currentStopwatchTime; 
var stopwatchInterval; 

function stopwatch(input) {
    stopwatchInterval = setInterval(function() {  
        currentStopwatchTime = input;
        $("h1").text(secondsToHours(input));
        input++;
    }, 1000);
}

$("#stopwatch-pause").click(function() {
    clearInterval(stopwatchInterval);
})

$("#stopwatch-resume").click(function() {
    stopwatch(currentStopwatchTime);
})

$("#stopwatch-stop").click(function() {
    clearInterval(stopwatchInterval);
    currentStopwatchTime = 0;
    $("h1").text(secondsToHours(0));
    $("button").show();
    $("#timer-cancel").hide();
    $(".stopwatch-button").hide();
})
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition1 = new SpeechRecognition;
var recognition2 = new SpeechRecognition;
var recognition3 = new SpeechRecognition;

var nameInput = $('#name_story');
var challengeInput = $('#challenge');
var solutionInput = $('#solution');

var content1 = '';
var content2 = '';
var content3 = '';

recognition1.continuous = true;
recognition2.continuous = true;
recognition3.continuous = true;

recognition1.onresult = function(event){
    var current = event.resultIndex;

    var transcript = event.results[current][0].transcript;
    content1 += transcript;
    nameInput.val(content1)
}

$('.input1-story i').mousedown(function(event){
    if(content1.length){
        content1 += '';
    }
    recognition1.start();
})

// ============================
recognition2.onresult = function(event){
    var current = event.resultIndex;

    var transcript = event.results[current][0].transcript;
    content2 += transcript;
    challengeInput.val(content2)
}

$('.input2-challenge i').mousedown(function(event){
    if(content2.length){
        content2 += '';
    }
    recognition2.start();
})

// =============================
recognition3.onresult = function(event){
    var current = event.resultIndex;

    var transcript = event.results[current][0].transcript;
    content3 += transcript;
    solutionInput.val(content3)
}

$('.input3-solution i').mousedown(function(event){
    if(content3.length){
        content3 += '';
    }
    recognition3.start();
    
})

$( ".input1-story i" ).mouseup(function(){
    recognition1.stop();
})

$( ".input2-challenge i" ).mouseup(function(){
    recognition2.stop();
})

$( ".input3-solution i" ).mouseup(function(){
    recognition3.stop();
})



nameInput.on('input',function(){
    content1 = $(this).val();
})

challengeInput.on('input',function(){
    content2 = $(this).val();
})

solutionInput.on('input',function(){
    content3 = $(this).val();
})



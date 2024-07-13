const resultElement=document.getElementById("result");
let recognition;


function startconverting(){
    if('webkitSpeechRecognition' in window) {
        recognition=new webkitSpeechRecognition();
        setuprecognition(recognition);
        recognition.start();
    }
}

function setuprecognition(recognition){
    recognition.continuous=true;
    recognition.interimResults=true;
    recognition.lang='en-US';
    recognition.onresult=function(event){
        const{finaltranscript,interimtranscript}=processresult(event.results);
        resultElement.innerHTML=finaltranscript+interimtranscript;
    }
}

function processresult(results){
    let finaltranscript='';
    let interimtranscript='';
    for(i=0;i<results.length;i++){
        let transcript=results[i][0].transcript;
        transcript.replace("\n","<br>");
        if(results[i].isFinal){
            finaltranscript+=transcript;
        }else{
            interimtranscript+=transcript;
        }
    }
    return {finaltranscript,interimtranscript}

}

function stopconverting(){
    if(recognition){
        recognition.stop();
    }
}
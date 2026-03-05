const bootMessages = [

"Initializing BEA Core...",
"Loading Neural Interface...",
"Starting Intelligence Engine...",
"Connecting to AI Network...",
"BEA Ready."

];

let bootIndex = 0;

function bootSequence(){

const bootText = document.getElementById("bootText");

if(bootIndex < bootMessages.length){

bootText.innerHTML += bootMessages[bootIndex] + "<br>";

bootIndex++;

setTimeout(bootSequence,800);

}else{

setTimeout(()=>{
document.getElementById("bootScreen").style.display="none";
},800);

}

}

window.onload = bootSequence;

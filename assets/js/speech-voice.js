var ss = navigator.userAgent;
var t = 'Chrome';
var reg = new RegExp('\\b' + t + '\\b', "g");
var resultat = ss.match(reg);
/*  Condition si userAgent != de Chrome alors l'écoute n'est pas possible */
if (resultat == null) {
    document.querySelector('#navigator').innerHTML = 'Désoler, mais votre navigateur n\'est pas compatible avec l\'enregistrement audio.<br><b>Merci d\'utiliser Chrome</b>.';
}
else {
    document.querySelector('#btn').innerHTML =  '<button id="start-button" class=""><i class="fas fa-microphone"></i></button>';
}
function startListening() {
    var language =navigator.language;
    var recognition = new (webkitSpeechRecognition || SpeechRecognition)();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
    [
        'onaudiostart',
        'onaudioend',
        'onend',
        'onerror',
        'onnomatch',
        'onresult',
        'onsoundstart',
        'onsoundend',
        'onspeechend',
        'onstart'
    ].forEach(function(eventName) {
        recognition[eventName] = function(e) {
            console.log(eventName, e);
        };
    });
    function speak(text) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        speechSynthesis.speak(utterance);
    }
    document.querySelector('#start-button').innerHTML = 'En écoute...';
    recognition.onend = function() {
        document.querySelector('#start-button').innerHTML = 'Démarrer l\'écoute';
    };
    recognition.onresult = function() {
        document.querySelector('#demo-echo').textContent = event.results[0][0].transcript;
        var txt = event.results[0][0].transcript;
        speak(txt);
    };
};
/**
 * Function qui permet de recupéré les valeur du formulaire
 */
function start(  ) {
    var u = new SpeechSynthesisUtterance(); /* J'instancie l'objet API Speech */
    u.text = document.querySelector('#text').value; /*Récupere les données de mon formulaire*/
    u.lang = navigator.language; /* Selection du language à partir de l'userAgent du navigateur */
    u.rate = 1; /* Vitesse vocale */
    speechSynthesis.speak(u); /*Function speak qui synthetise les données recuts afin de les retranscrire vocalement*/
    document.querySelector('#script').innerHTML = u.text;
};
(function() {
    /**
     * Function qui permet de lancer le script vocal
     */
    if (resultat == null) {
        /* Aux données formulaire */
        document.querySelector('#start').addEventListener('click', start);
    }else {
        /* A l'enregistrement vocal */
        document.querySelector('#start-button').addEventListener('click', startListening);
        /* Au donnée formulaire */
        document.querySelector('#start').addEventListener('click', start);
    }
})();
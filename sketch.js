// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Number Guessing Chatbot
// Edited Video: https://www.youtube.com/watch?v=zGe1m_bLOFk
function setup() {
	createCanvas(400,100);


	// -------------
	// SPEECH RECOGNITION
	let speechRec = new p5.SpeechRec('es-ES',gotSpeech);
	let continuous = false;
	let interim = false;
	speechRec.start(continuous,interim);
	function voiceReady(){
		let voices = speech.voices;
		let voice = voices[6];
		console.log(speech.voices);
		//speech.speak('Estoy Preparado para hablar');
	}
	function gotSpeech(){
		console.log(speechRec);
		if(speechRec.resultValue){
			let input = speechRec.resultString;
			let reply = bot.reply("local-user", input);
			speech.speak(reply);

		}
	}

	// -------------
	// SPEECH synthesis
	speech = new p5.Speech();
	speech.onLoad = voiceReady;
	//speech.setRate(0.5);
	//speech.setPitch(100);
	speech.started(startSpeaking);
	speech.ended(endSpeaking);

	function startSpeaking(){

		background(255,0,0);
	}
	function endSpeaking(){
		console.log('vuelve a escuchar')
		speechRec.start(continuous,interim);
		background(0,250,0);
	}

	// -------------
	// BOT
	let bot = new RiveScript();
	bot.loadFile("brain.rive", brainReady, brainError);

	function brainReady() {
		console.log('Chatbot ready!');
		bot.sortReplies();
	}

	function brainError() {
	    console.log('Chatbot error!')
	}




}

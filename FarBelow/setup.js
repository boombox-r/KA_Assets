var sounds = {};
var textures = {};
var csvs = {};

async function decodeAudio(context){
  try{
  var keys = Object.keys(sounds);
  output("Audio files to load: "+keys+"\n")
  for(var i = 0; i < keys.length; i++){
    var key = keys[i];
    var b64 = sounds[key].b64; 
    
    var decoded = atob(b64);
    var bytes = new Uint8Array(decoded.length);
    for(var j = 0; j < decoded.length; j++){
      bytes[j] = decoded.charCodeAt(j);
    }
        
    var ab = await context.decodeAudioData(bytes.buffer);
    sounds[key].buffer = ab;
  }
  output("Finished decoding audio assets!");
  }catch(err){
    output("ERROR ON DECODE: \n"+err)
  }
}

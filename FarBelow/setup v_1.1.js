var sounds = {};
var textures = {};
var csvs = {};

function base64ToBlob(b64, contentType){
    var decoded = atob(b64);
    var bytes = new Uint8Array(decoded.length);
    for(var i = 0; i < decoded.length; i++){
        bytes[i] = decoded.charCodeAt(i);
    }
    return new Blob([bytes], {type: contentType});
}

async function decodeAudio(context){
  try{
  var keys = Object.keys(sounds);
  output("Audio files to load: "+keys+"\n")
  for(var i = 0; i < keys.length; i++){
    var key = keys[i];
    output("Decoding audio: '"+key+"'\n")
    var b64 = sounds[key].b64; 
    
    var decoded = atob(b64);
    var bytes = new Uint8Array(decoded.length);
    for(var j = 0; j < decoded.length; j++){
      bytes[j] = decoded.charCodeAt(j);
    }
        
    var ab = await context.decodeAudioData(bytes.buffer);
    sounds[key].buffer = ab;
  }
  output("Finished decoding audio assets!\n");
  }catch(err){
    output("ERROR ON DECODE: \n"+err)
  }
}

async function prepareTextureBitmaps(){
    var keys = Object.keys(textures);
    output("Textures to load: "+keys+"\n")
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        output("Loading texture: '"+key+"'\n");
        var blob = base64ToBlob(textures[key].b64);
        var bmp = await createImageBitmap(blob);
        textures[key].image = bmp;
    }
    output("Finished loading texture assets!\n")
}

class %CURRENT_CLASSNAME%{

constructor(){
this.jsonFiles={}
this.assetsURL={}
this.assetsBitmap={}
}

readLocal(ba){
if(ba && ba.length>0){
var fileReader=new lang.utils.VM2FileReader
//fileReader.readBytes(ba)
fileReader.readBytesAssetsTag(ba)
var assetsObj=fileReader.readAssetsFolder()
this._readLocal(assetsObj,'')
}
}

_readLocal(assetsObj,path){
var th=this
if(assetsObj){
for(var _n in assetsObj){
var spl1=_n.split('.')
var nm4=spl1.pop()
var nn=spl1.join('.')
var bb=assetsObj[_n]

var n=path+nn

if(bb is lang.utils.ByteArray){
if(nm4=='ttf'){
lang.text.Font.registerFont(nn,bb)
}else if(nm4=='json'){
var str6=bb.readUTFBytes(bb.length)
var obJson=JSON.decode(str6)
if(obJson)th.jsonFiles[nn]=obJson
}else if(nm4=='mp3'){
var url=URL.createURL(bb,'audio/mpeg')
th.assetsURL[n]=url
}else{
var bm=new lang.display.Bitmap
//bm.smoothing=false
bm.src=bb
th.assetsBitmap[n]=bm
}
}else if(bb is Object){
var pp=path+_n+'/'
th._readLocal(bb,pp)
}
}
}
}

}
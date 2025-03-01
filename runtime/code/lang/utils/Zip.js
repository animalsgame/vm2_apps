class %CURRENT_CLASSNAME%{

%CURRENT_CLASSNAME%(){
this.isWrite=false
}

native open(s){}
native _addFile(name,data){}
native saveFile(name,path){}
native getFiles(){}
native extract(path){}
native getFileBytes(name){}
native close(){}

addFile(name,data){
if(data is String){
var ba=new lang.utils.ByteArray
ba.writeUTFBytes(data)
ba.position=0
data=ba
}/*else if(data is lang.io.File){
var fileV=data.isFile()
if(fileV){
var bb=data.readBytes()
if(bb)data=bb
}
}*/

var v=this._addFile(name,data)
return v
}

}
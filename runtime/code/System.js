class System{

static native registerClassAlias(name,v){}
static native exit(){}
static native exec(s){}
static native setAppTitle(s){}
static native setWindowRestore(){}
static native setWindowMin(){}
static native setWindowMax(){}
static native setWindowSize(w,h){}
static native setWindowState(v){}
static native grabMousePos(){}
static native exception(s){}
static native getClassName(o){}
static native getJavaJNI(){}
//static native folderExists(path){}
//static native createFolder(path){}
//static native getFolderFiles(path){}
static native getLocalStorage(){}
static native getPathFolderFiles(t){}
static native gc(){}
static native getClipboard(){}
static native setClipboard(s){}
static native loadBinaryLib(o){}
static native openFileDialog(cb){}
static native saveFileDialog(name,cb){}
static native openColorPicker(cb){}
static native shortcutApp(t,o){}
static native getMonitorInfo(){}
static native getWindow(){}
static native openURL(v){}

getDefinitionByName(s){
var spl=s.split('.')
var ob=GLOBAL
for(var i=0; i < spl.size; i++){
var nm=spl[i]
if((nm in ob)==false)return null
ob=ob[nm]
}
return ob
}


static loadLibrary(o){
var cb=System.loadLibrary
var ob=o
if(o is String){
if(System.platform.type!='web'){
var path='libs/'+o+'.animalsgame'
var fi=new lang.io.File(path)
var isExt=fi.exists()
if(isExt==true){
var ba=fi.readBytes()
ob=ba
}

if(o=='VM2System'){
if(runtime.isLoadLibSystem==true){
return true
}
}

}
}else if(o is Array){
if(System.platform.type=='web'){
var v=System.loadBinaryLib(o)
return v
}else{
var err=[]
var okk=[]
for (var i = 0; i < o.size; i++) {
var nm=o[i]
var r=cb(nm)
if(r==true){
okk.push(nm)
}else{
err.push(nm)
}
}
var obb={ok:okk,error:err}
return obb
}
}else{
ob=o
}
var v=System.loadBinaryLib(ob)
return v
}


}
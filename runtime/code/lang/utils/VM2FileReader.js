class ReadFolderFileStruct{
    ReadFolderFileStruct(){
        this.ba=null
    }
    
    read(ba){
    this.ba=ba
    }
    
    skipFolder(o){
    if(o!=null){
    if(o.type=='folder'){
    this.ba.position=o.pos
    for(var i=0; i < o.nums; i++){
    var el=this.readBytesStruct(false)
    this.skipFolder(el)
    }
    }
    }
    }
    
    readBytesStruct(isSkip){
    var ob=null
    var startPos=this.ba.position
    var t=this.ba.readByte()
    var name=this.ba.readString()
    if(t==1){
    var nums=this.ba.readInt()
    ob={type:'folder',name:name,nums:nums,startPos:startPos,pos:this.ba.position}
    if(isSkip==true)
    this.skipFolder(ob)
    }else{
    var sz=this.ba.readInt()
    ob={type:'file',name:name,pos:this.ba.position,size:sz}
    this.ba.position+=sz
    }
    return ob
    }
    
    readBytesStructNoSkip(){
    /*var ob=null
    var startPos=this.ba.position
    var t=this.ba.readByte()
    var name=this.ba.readString()
    if(t==1){
    var nums=this.ba.readInt()
    ob={type:'folder',name:name,nums:nums,startPos:startPos,pos:this.ba.position}
    }else{
    var sz=this.ba.readInt()
    ob={type:'file',name:name,pos:this.ba.position,size:sz}
    this.ba.position+=sz
    }
    return ob*/
    return this.readBytesStruct(false)
    }
    
    findFolderDataByName(t,o,name,isSkip){
    var ob=null
    if(o!=null){
    if(name!=null){
    if(o.type=='folder'){
    var arr=this.readFolder(o,isSkip)
    if(arr!=null){
    for(var i=0; i < arr.size; i++){
    var el=arr[i]
    if(el!=null){
    if(el.type==t){
    if(el.name==name)return el
    }
    }
    }
    }
    }
    }
    }
    return null
    }
    
    findFolderByName(o,name,isSkip){
    if(isSkip==null)isSkip=true
    return this.findFolderDataByName('folder',o,name,isSkip)
    }
    
    findFileByName(o,name){
    return this.findFolderDataByName('file',o,name,true)
    }
    
    readFolder(o,isSkip){
    var arr=[]
    if(o!=null){
    if(o.type=='folder'){
    this.ba.position=o.pos
    for(var i=0; i < o.nums; i++){
    var el=this.readBytesStruct(isSkip)
    arr.push(el)
    }
    }
    }
    return arr
    }
    
    readFileBytes(o){
    var ob=null
    if(o!=null){
    //if(name!=null){
    if(o.type=='file'){
    this.ba.position=o.pos
    var sz=o.size
    var bytes=new lang.utils.ByteArray
    this.ba.readBytes(bytes,0,sz)
    bytes.position=0
    return bytes
    }
    //}
    }
    return null
    }
}


class %CURRENT_CLASSNAME%{

%CURRENT_CLASSNAME%(){
this.ba=null
this.instanceClass=null
this.classesList=[]
this.headerFile=[11,5,16]
this.headerFile2=[11,5,17]
this.version=0
this.folderStruct=null
this.rootFolder=null
this.isFormat2=false
this.assetsPos=-1
this.isComplete=false
}


readAssetsFolder(){
var ob={}
if(this.ba!=null){
if(this.assetsPos>-1){
var p=this.ba.position
this.ba.position=this.assetsPos
//alert(this.ba.position)
this.readFolderBytes(this.ba,ob,1)
this.ba.position=p
}
}
return ob
}

readFolderBytes(ba,o,isOpen){
if(ba!=null){
var t=ba.readByte()
var name=ba.readString()
if(t==1){
var nums=ba.readInt()
if(isOpen==1){
for(var i=0;i<nums;i++)this.readFolderBytes(ba,o,0)
}else{
var ob={}
for(var i=0;i<nums;i++)this.readFolderBytes(ba,ob,0)
o[name]=ob
}
}else{
var len=ba.readInt()
var bytes=new lang.utils.ByteArray
ba.readBytes(bytes,0,len)
bytes.position=0
o[name]=bytes
}
}
}


validatePartBa(ba,a){
for (var i = 0; i < a.size; i++) {
var c=ba.readByte()
if(a[i]!=c)return false
}
return true
}

readCPool(ba){
var ar=[]
var count=ba.readInt()
for (var i = 0; i < count; i++) {
var id=ba.readShort()
var t=ba.readByte()
var ob={id:id}
if(t==1){
ob.t='string'
ob.v=ba.readString()
ar.push([ob.id,ob.v])
}else if(t==4){
ob.t='double'
ob.v=ba.readString()
ob.v=ob.v as Number
ar.push([ob.id,ob.v])
}
}
return ar
}

readMethods(ba){
if(ba!=null){
var ob={}
ob.baInfo={}
ob.name=ba.readString()
ob.flags=ba.readByte()
var len=ba.readInt()
ob.depth=ba.readShort()
ob.argsCount=ba.readByte()
ob.varsCount=ba.readInt()
var len=ba.readInt()
ob.baInfo.pos=ba.position
ob.baInfo.size=len
ba.position+=len
return ob
}
return null
}

readClass(ba){
if(ba!=null){
var ob={}
ob.name=null
ob.extendClass=null
ob.methods=[]

var len=ba.readInt()
ob.cpool=this.readCPool(ba)
//ba.position+=len
ob.name=ba.readString()
var extendClassQ=ba.readString()
if(extendClassQ!='')ob.extendClass=extendClassQ
var methodsCount=ba.readInt()
for (var k = 0; k < methodsCount; k++) {
var methodcl=this.readMethods(ba)
ob.methods.push(methodcl)
}
return ob
}
return null
}


readBytesAssetsTag(ba){
this.ba=ba
if(ba!=null){
var p2=ba.position
var valid=validatePartBa(ba,this.headerFile)
if(valid==true){
this.version=ba.readByte()
var tagsCount=ba.readInt()
for(var i=0; i < tagsCount; i++){
var t=ba.readByte()
var len=ba.readInt()
if(t==2){
this.assetsPos=ba.position
}
ba.position+=len	
}
}else{
ba.position=0
valid=validatePartBa(ba,this.headerFile2)
if(valid==true){
this.isFormat2=true
var q=new lang.utils.ReadFolderFileStruct
q.read(ba)
this.folderStruct=q

var rootFolder=q.readBytesStructNoSkip()
/*var appFolder=q.findFolderByName(rootFolder,'app')
if(appFolder!=null){*/
var assetsFile=q.findFolderByName(rootFolder,'assets',false)
if(assetsFile!=null){
this.assetsPos=assetsFile.startPos
}
//}

}
}
ba.position=p2
}
}







readBytes(ba){
this.ba=ba
var pos1=-1
if(ba!=null){
var p2=ba.position
var valid=validatePartBa(ba,this.headerFile)
if(valid==true){
this.version=ba.readByte()
var tagsCount=ba.readInt()
for(var i=0; i < tagsCount; i++){
var t=ba.readByte()
var len=ba.readInt()
if(t==1){
pos1=ba.position
ba.position+=len
}else if(t==2){
//ba.position+=len
//var ob={}
this.assetsPos=ba.position
ba.position+=len
//this.readFolderBytes(ba,ob,1)
}else{
ba.position+=len	
}
}
if(pos1>-1){
ba.position=pos1
var countClasses=ba.readInt()
for(var i=0;i<countClasses;i++){
var c=this.readClass(ba)
this.classesList.push(c)
}
this.instanceClass=ba.readString()
this.isComplete=true
}
}else{
    
ba.position=0
valid=validatePartBa(ba,this.headerFile2)
if(valid==true){
this.isFormat2=true
var q=new lang.utils.ReadFolderFileStruct
q.read(ba)
this.folderStruct=q

var rootFolder=q.readBytesStructNoSkip()
this.rootFolder=rootFolder
//var appFolder=q.findFolderByName(rootFolder,'app',true)
//if(appFolder!=null){
var assetsFile=q.findFolderByName(rootFolder,'assets',false)
if(assetsFile!=null){
this.assetsPos=assetsFile.startPos
}
//}

}
    
}
ba.position=p2
}
}

readStoreInfo(){
var p1=this.ba.position
if(this.rootFolder!=null){
if(this.folderStruct!=null){
var file=this.folderStruct.findFileByName(this.rootFolder,'storeInfo.json')
if(file!=null){
this.ba.position=file.pos
var str=this.ba.readUTFBytes(file.size)
var ob=JSON.decode(str)
return ob
}
}
}
this.ba.position=p1
return null
}

}
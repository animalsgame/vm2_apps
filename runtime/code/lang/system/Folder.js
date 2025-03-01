class Folder{
Folder(s){
this.name=s
this.list=[]
this.parent=null
}
addFile(name,dt){
this.list.push({name:name,data:dt})
}
addFolder(v){
var c=new lang.system.Folder(v)
c.parent=this
this.list.push(c)
return c
}

getFileByPath(path){
var spl=path.split('/')
var ob=this
for(var i=0; i<spl.size; i++){
var nm=spl[i]
var obb=ob.list
for(var k=0; k<obb.size; k++){
var res=ob.list[k]
if(res.name==nm)ob=res
if(ob==null)return null
}
}
if(ob!=null && (ob is lang.system.Folder)==false)return ob
return null
}


}
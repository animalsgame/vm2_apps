class %CURRENT_CLASSNAME%{

%CURRENT_CLASSNAME%(){
this.list=[]
}


on(o,type,cb){
var ob={o:o,type:type,cb:cb}
o.on(type,cb)
this.list.push(ob)
}
off(o,type,cb){
o.off(type,cb)
}

clear(){
for (var i = 0; i < this.list.size; i++) {
var el=this.list[i]
el.o.off(el.type,el.cb)
}
this.list=[]
}

}
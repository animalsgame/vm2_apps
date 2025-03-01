class %CURRENT_CLASSNAME%{

static(){
this.arr=[]
}

bindSetter(cb,o,prop){
if(prop!=null){
if(o!=null){
if(cb!=null){
var ob={t:1,cb:cb,o:o,prop:prop,lastV:'%'}
this.arr.push(ob)
return ob
}
}
}
return null
}

bindProperty(o, prop, host, chain){
if(prop!=null){
if(o!=null){
if(host!=null){
if(chain!=null){
var ob={t:2,o:o,prop:prop,host:host,chain:chain,lastV:'%'}
this.arr.push(ob)
return ob
}
}
}
}
return null
}


unbind(o){
if(o!=null){
for(var i = 0; i < this.arr.size; i++){
var oo=this.arr[i]
if(o==oo){
this.arr.del(i)
}
}
}
}


static update(){
for(var i = 0; i < this.arr.size; i++){
var o=this.arr[i]
if(o.prop in o.o){
var pr1=o.prop
var vv=o.o[pr1]
if(vv!=o.lastV){
if(o.t==1){
o.cb(vv)
}else if(o.t==2){
if(o.chain in o.host){
var ch1=o.chain
o.host[ch1]=vv
}
}
}
o.lastV=vv
}
}
}

}
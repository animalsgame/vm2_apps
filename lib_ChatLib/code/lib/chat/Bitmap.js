class %CURRENT_CLASSNAME%{

%CURRENT_CLASSNAME%(src){
this.isChatLib=true
this.parent=null
this.ev=[]
this.x=0
this.y=0
this.alpha=1
this.scaleX=1
this.scaleY=1
this.buttonMode=false
this.src=''
this.width=0
this.height=0
this.displayItem=null
this.sourceRect=null
this.setSource(src)
}

setSource(v){
var th=this
if(v!=null){
th.src=v

th.width=v.naturalWidth
th.height=v.naturalHeight

if('sourceRect' in v){
th.sourceRect=v.sourceRect
th.width=th.sourceRect.w
th.height=th.sourceRect.h
}

}
}

on(t,cb){
this.ev.push({type:t,cb:cb})
}

off(t,cb){
var th=this
for (var i = 0; i < th.ev.size; i++) {
var el=th.ev[i]
if(el.type==t){
if(el.cb==cb){
th.ev.del(i)
return true
}
}
}
return false
}

setDisplay(o){
var th=this
if(o!=null){
o.itemData=this
for (var i = 0; i < th.ev.size; i++) {
var el=th.ev[i]
o.on(el.type,el.cb)
}
}
}

}
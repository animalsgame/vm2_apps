class %CURRENT_CLASSNAME%{

%CURRENT_CLASSNAME%(){
this.isChatLib=true
this.ev=[]
this.parent=null
this.itemData=null
this.x=0
this.y=0
this.alpha=1
this.scaleRatio=1
this.scaleX=1
this.scaleY=1
this.buttonMode=false
this.text=''
this.width=0
this.height=0
this.color=0
this.fontSize=16
this.fontName='Arial'
this.bold=false
this.filters=null
this.displayItem=null
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

setScale(v,tf){
this.scaleRatio=v
tf.fontSize=this.fontSize*v
tf.scaleX=1/v
tf.scaleY=1/v
tf.text=''
tf.text=this.text
}

setDisplay(o){
var th=this
th.displayItem=o
if(o!=null){
o.itemData=this
th.width=o.width/th.scaleRatio
th.height=o.height/th.scaleRatio
for (var i = 0; i < th.ev.size; i++) {
var el=th.ev[i]
o.on(el.type,el.cb)
}


}
}

}
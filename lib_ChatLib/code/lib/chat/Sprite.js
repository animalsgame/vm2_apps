class %CURRENT_CLASSNAME%{

%CURRENT_CLASSNAME%(){
this.isChatLib=true
this.parent=null
this.paddingTop=0
this.maxTextHeight=0
this.x=0
this.y=0
this.alpha=1
this.scaleX=1
this.scaleY=1
this.minHeight=0
this.displayItem=null
this.buttonMode=false
this.list=[]
}

add(o){
if(o!=null){
o.parent=this
this.list.push(o)
}    
}

remove(o){
var th=this
if(o!=null){
for (var i = 0; i < th.list.size; i++) {
var el=th.list[i]
if(el==o){
o.parent=null
th.list.del(i)
return true
}
}
}
return false
}

}
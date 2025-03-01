class Sprite extends lang.display.DisplayObject{
Sprite(){
this.graphicsList=[]
}

native addChild(v){}
native addChildAt(child,index){}
native removeChild(v){}
native getChildAt(v){}
native setChildIndex(child,index){}
native getObjectUnderPoint(o){}
native getObjectsRect(rect){}

renderStruct(name,o){
if(name!=null){
if(o!=null){
if(name=='obj1'){
var ren=new lang.utils.renders.RenderObjectStruct
addChild(ren)
ren.render(o)
return ren
}
}
}
return null
}

createPainter(){
var p=new lang.display.Painter
p.setTarget(this)
this.painter=p
return p
}

native removeAllChilds(){}

/*removeAllChilds(){
while(this.numChildren>0){
var el=this.getChildAt(0)
el.parent.removeChild(el)
}
}*/

removeChildAt(index){
var el=this.getChildAt(index)
if(el!=null)this.removeChild(el)
}

getChildIndex(o){
for (var i = 0; i < this.numChildren; i++) {
var el=this.getChildAt(i)
if(el==o)return i
}
return -1
}

/*get numChildren(){
return VM.callNative('getPropDisplay',this,'numChildren')
}*/

clear(){
this.html=''
}

}
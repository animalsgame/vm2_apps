class DisplayObject extends lang.events.EventDispatcher{
DisplayObject(){
	//this.x=0
	//this.y=0
}

/*set buttonMode(v){
VM.callNative('setPropDisplay',this,'buttonMode',v)
}*/


/*set x(v){
VM.callNative('setPropDisplay',this,'x',v)
}

set y(v){
VM.callNative('setPropDisplay',this,'y',v)
}

get x(){
return VM.callNative('getPropDisplay',this,'x')	
}

get y(){
return VM.callNative('getPropDisplay',this,'y')
}*/


get parent(){
return VM.callNative('getPropDisplay',this,'parent')	
}

/*get buttonMode(){
return VM.callNative('getPropDisplay',this,'buttonMode')
}*/

get loaderInfo(){
return VM.callNative('getPropDisplay',this,'loaderInfo')	
}

/*native startDrag(){}
native stopDrag(){}*/

startDrag(bounds){
this.stopDrag()
var d=new DragMaster1(this)
if(bounds!=null)d._bounds=bounds
this._dragMaster=d
d.start()
}
        
stopDrag(){
if('_dragMaster' in this)this._dragMaster.stop()
}

native setMatrix(o){}
native getBounds(){}
	
native focus(){}

native attr(k,v){}
native css(k,v){}

native getAbsolutePos(){}
native localToGlobal(o){}
native globalToLocal(o){}
native hitTestPoint(x,y){}
native toLocal(o){}
}
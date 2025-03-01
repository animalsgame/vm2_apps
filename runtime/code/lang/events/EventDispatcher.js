class EventDispatcher{

EventDispatcher(){
//this._data={}
}

on(type,cb){
VM.callNative('addEventObject',this,type,cb)
}
off(type,cb){
VM.callNative('delEventObject',this,type,cb)
}

addEventListener(type,cb){
this.on(type,cb)
}

removeEventListener(type,cb){
this.off(type,cb)
}

native emit(type,args){}
native removeAllEvents(){}
native dispatchEvent(e){}

}
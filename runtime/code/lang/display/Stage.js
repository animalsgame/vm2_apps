class Stage extends lang.display.Sprite{
	Stage(){
		
	}
	
set displayState(v){
VM.callNative('setPropDisplay',this,'displayState',v)
}
get displayState(){
return VM.callNative('getPropDisplay',this,'displayState')	
}
	
}
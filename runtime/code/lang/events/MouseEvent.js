class MouseEvent extends lang.events.Event{
	
	static get CLICK(){return 'click';}
	static get RIGHT_CLICK(){return 'rclick';}
	static get MOUSE_DOWN(){return 'mousedown';}
	static get MOUSE_UP(){return 'mouseup';}
	static get ROLL_OVER(){return 'rollover';}
	static get ROLL_OUT(){return 'rollout';}
	
	MouseEvent(x,y){
		this.mouseX=x
		this.mouseY=y
	}
	
	native updateAfterEvent(){}
	native stopPropagation(){}
	native stopImmediatePropagation(){}
	
	get target(){
		return VM.callNative('getTargetEvent',this)	
	}
	
	
}
class KeyboardEvent extends lang.events.Event{
	
	KeyboardEvent(type,code){
		this.type=type
		this.keyCode=code
	}
	
	native preventDefault(){}
	
}
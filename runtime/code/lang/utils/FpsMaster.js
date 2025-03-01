class FpsMaster{
	FpsMaster(){
	this._callback=null
	this.framerate=24
	}
	
	setCallback(cb){
	this._callback=cb
	}
	native add(o){}
	native remove(o){}
	native run(){}
	native stop(){}
	
}
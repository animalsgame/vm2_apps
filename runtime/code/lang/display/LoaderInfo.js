class LoaderInfo{
	LoaderInfo(a,b,c){
		this._bytes=a
		this._content=b
		this._parameters=c
	}
	
	get content(){
		return VM.callNative('getPropLoaderInfo',this,'content')
	}
	
	get bytes(){
		return VM.callNative('getPropLoaderInfo',this,'bytes')
	}
	
	get parameters(){
		return VM.callNative('getPropLoaderInfo',this,'parameters')
	}
	
	get url(){
		return VM.callNative('getPropLoaderInfo',this,'url')
	}
	
}
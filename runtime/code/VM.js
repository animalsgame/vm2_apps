class VM{
	VM(){
	}
	native setGlobal(s,v){}
	native setGlobalNative(s,v){}
	native addClass(s,v){}
	native addClassExtend(s,ext,v){}
	native overloadOperator(o,name,cb){}
	native callNative(t,o){}
	native getMainSprite(){}
	/*setGlobal(s,v){
		VM.callNative('VMSetGlobal',s,v)
	}
	setGlobalNative(s,v){
		VM.callNative('VMSetGlobalNative',s,v)
	}*/
	
	applyMethod(thisObject,cb,args){
		return VM.callNative('applyMethod',thisObject,cb,args)
	}
	
	errorsHandler(type,args){
	    if(args==null)args=[]
	    if(type=='text'){
	       if(args.size>0){
	           var tx1=args[0]
	           
	      var maxW=600  
	      var sw=runtime.stage.stageWidth
	      if(sw<maxW)maxW=sw-40
	           var tx2=new lang.text.TextField
tx2.color=0
tx2.fontName='Arial'
tx2.fontSize=20
tx2.maxWidth=maxW
tx2.text=''+tx1
var fullTextW=tx2.width
var allW=tx2.width
if(tx2.width>=maxW){
allW=maxW
fullTextW=maxW
}
allW+=30
var allH=tx2.height+30
tx2.x=(allW-fullTextW)/2
tx2.y=(allH-tx2.height-8)/2
//tx2.mouseEnabled=false

var sp3=new lang.display.Sprite
//sp3.mouseEnabled=false
sp3.cb2=(e)=>{
sp3.x=(e.width-allW)/2
}
sp3.removeV=()=>{
var pos1=runtime.stage.getChildIndex(this)
if(pos1>-1){
var el1=runtime.stage.getChildAt(pos1)
if(el1!=null){
runtime.stage.removeChild(el1)
if(this.tm!=null){
this.tm.stop()
this.tm=null
}
runtime.stage.off('resize',this.cb2)
}
}
}

sp3.tm=Timer.init(6000,()=>{
sp3.removeV()
})

sp3.x=(runtime.stage.stageWidth-allW)/2
sp3.y=(runtime.stage.stageHeight-allH)/2

var sp1=new lang.display.Sprite
sp1.alpha=1
sp3.addChild(sp1,tx2)
sp1.createPainter()
sp1.painter.border(1,0)
sp1.painter.rect(0,0,allW,allH,'#4BAAD3')
/*sp1.on('click',()=>{
sp3.removeV()
})*/
runtime.stage.on('resize',sp3.cb2)
	           
if('curTextInfoT1' in runtime){
if(runtime.curTextInfoT1!=null)runtime.curTextInfoT1.removeV()
}
runtime.stage.addChild(sp3)
runtime.curTextInfoT1=sp3

	           //alert(''+tx1)
	       }
	    }else if(type=='enableFullscreen'){
	        if('isFSFirst' in runtime && runtime.isFSFirst){
	            
	        }else{
var tx2=new lang.text.TextField
tx2.color=0xFFFFFF
tx2.fontName='Arial'
tx2.fontSize=18
tx2.bold=true
tx2.text='Для выхода из полноэкранного режима нажмите ESC'
var allW=tx2.width+30
var allH=50
tx2.x=(allW-tx2.width)/2
tx2.y=15

var sp3=new lang.display.Sprite
sp3.mouseEnabled=false
sp3.cb2=(e)=>{
sp3.x=(e.width-allW)/2
sp3.y=50
}
sp3.removeV=()=>{
if(sp3.tm!=null){
sp3.tm.stop()
sp3.tm=null
}
runtime.curFullscreenInfo=null
runtime.stage.off('resize',this.cb2)
if(this.parent!=null)this.parent.removeChild(this)
}


sp3.removeV=()=>{
var pos1=runtime.stage.getChildIndex(this)
if(pos1>-1){
var el1=runtime.stage.getChildAt(pos1)
if(el1!=null){
runtime.stage.removeChild(el1)
if(this.tm!=null){
this.tm.stop()
this.tm=null
}
runtime.stage.off('resize',this.cb2)
runtime.curFullscreenInfo=null
}
}
}

sp3.tm=Timer.init(6000,()=>{
sp3.removeV()
})

runtime.stage.addChild(sp3)
var sp1=new lang.display.Sprite
sp1.alpha=0.6
sp3.addChild(sp1,tx2)
sp1.createPainter()
sp1.painter.border(1,0)
sp1.painter.rect(0,0,allW,allH,'#000000')
//sp1.painter.rect(0,0,allW,allH,'#4BAAD3')

runtime.stage.on('resize',sp3.cb2)
if('curFullscreenInfo' in runtime){
if(runtime.curFullscreenInfo!=null)runtime.curFullscreenInfo.removeV()
}
runtime.isFSFirst=true
runtime.curFullscreenInfo=sp3
}
	    }else if(type=='exitFullscreen'){
	        if('curFullscreenInfo' in runtime){
	            if(runtime.curFullscreenInfo!=null){
	            runtime.curFullscreenInfo.removeV()
	            runtime.curFullscreenInfo=null
	            }
	        }
	    }
	}
	
}
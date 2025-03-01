class runtime extends lang.display.Sprite{
	runtime(){
		VM.setGlobal('runtime',this)
		VM.setGlobal('trace',LogClass.trace)
		VM.setGlobal('alert',LogClass.alert)
		
		var runtimeType=''
		
		if('runtime' in System.platform)runtimeType=System.platform.runtime
		if(runtimeType!='js'){
		VM.setGlobal('window',GLOBAL)
		VM.setGlobal('VM.addClass',(name,extendClass,initcb,obj)=>{
		    var nm=''+name
		    var cl=()=>{}
		    var extClass=null
		    var proto=cl.prototype
		    if(obj!=null)Object.copyProps(proto,obj)
		    if(initcb is Function)cl.__init=initcb
		    cl.__set=(k,v)=>{
		        proto[k]=v
		        this[k]=v
		    }
		    if(extendClass!=null){
		        extClass=System.getDefinitionByName(extendClass)
		        if(extClass!=null)cl.prototype.__extends=extClass
		    }
		    return cl
		})
		
		String.substr=String.cut
		Array.splice=Array.cut
		}
		
		if(System.platform.type!='web'){
		var isMobileV=false
		var ptInfo=System.platform.type
		if(ptInfo=='android')isMobileV=true
		System.platform.mobile=isMobileV
		
		String.trim=()=>{
		    var s=this.replace(/^\s+|\s+$/g, '')
		    return s
		}
		
		//lang.events.EventDispatcher.addEventListener=lang.events.EventDispatcher.on
		//lang.events.EventDispatcher.removeEventListener=lang.events.EventDispatcher.off
		
		VM.setGlobal('lang.display.Painter',lang.display.PainterNative)
		//VM.setGlobal('lang.utils.ByteArray',lang.utils.ByteArrayNative)
		
		VM.setGlobal('lang.utils.File.saveBytes',(path,data)=>{
		   var fi=new lang.io.File(path)
		   var res=fi.write(data)
		   return res
		})
		
		VM.setGlobal('lang.utils.File.readBytes',(path)=>{
		   var fi=new lang.io.File(path)
		   var bb=fi.readBytes()
		   return bb
		})
		
		VM.setGlobal('setInterval',(cb,tm)=>{
		    if(cb!=null){
		        var time=Timer.init(tm,cb)
		        return time
		    }
		    return null
		})
		
		VM.setGlobal('clearInterval',(o)=>{
		    if(o!=null){
		        if('stop' in o)o.stop()
		    }
		})
		
		
		VM.setGlobal('setTimeout',(cb,tm)=>{
		    if(cb!=null){
		        var time=Timer.init(tm,()=>{
		            this.stop()
		            if(cb!=null)cb()
		        })
		        return time
		    }
		    return null
		})
		
		VM.setGlobal('clearTimeout',(o)=>{
		    if(o!=null){
		        if('stop' in o)o.stop()
		    }
		})
		
		/*VM.setGlobal('parseFloat',(v)=>{
		    var vv=v as Number
		    return vv
		})*/

		}else{
		   lang.display.Sprite.removeAllChilds=()=>{
		       while(this.numChildren>0){
		           var el=this.getChildAt(0)
		           el.parent.removeChild(el)
		       }
		   }
		}
		
		if(System.platform.type=='php'){
		VM.setGlobal('print',LogClass.alert)	
		}
		
		this.startTime=Date.getTimestamp()
		
		if(System.platform.type!='web'){
		stage.on('messagesHandler',(t,msg)=>{
		    if(t=='text'){
		        VM.errorsHandler('text',[msg])
		    }
		})
		}
		
this.isLoadLibSystem=false
this.isLoadLibUi=false
this.vm2Account=null
if(System.platform.type!='web'){
/*var res=System.loadLibrary(['VM2System'])
if('error' in res){
var sz1=res.error.size
if(sz1==0){
this.isLoadLibSystem=true
}
}*/

var res=System.loadLibrary(['UI'])
if('error' in res){
var sz1=res.error.size
if(sz1==0){
this.isLoadLibUi=true
}
}

var loaderLoadBytes=lang.display.Loader.loadBytes
lang.display.Loader.loadBytes=(ba)=>{

if(ba!=null){
var isZip=false
if(ba.size>2){
var a=ba.readByte()
var b=ba.readByte()
if(a==0x50){
if(b==0x4b){
isZip=true
}
}
}
ba.position=0
if(isZip==true){
var rnd=Math.randomInt()
var tempFile1='tempFile'+rnd+'.zip'
var fi=new lang.io.File(tempFile1)
fi.write(ba)
var zip=new lang.utils.Zip
var b=zip.open(tempFile1)
if(b==true){
var baa=zip.getFileBytes('app.animalsgame')
if(baa!=null){
loaderLoadBytes.apply(this,[baa])
baa=null
}
}
zip.close()
zip=null
fi.delete()
fi=null
ba=null
}else{
loaderLoadBytes.apply(this,[ba])
}
}
}

}
		
		
		
		//var isLoadFonts=false
		//if(System.platform.type=='android')isLoadFonts=true
		//else if(System.platform.type=='pc')isLoadFonts=true
		/*if(isLoadFonts==true){
		    var File=lang.utils.File
		    var path=System.getPathFolderFiles('shared')
		    //alert(path)
		    //var baSans=File.readBytes(path+'/sans.ttf')
		    var baArial=File.readBytes(path+'/arial.ttf')*/
		   /* if(baSans!=null){
		        lang.text.Font.registerFont('sans',baSans)
		    }else{
		        URL.binaryGet('https://animals-game.ru/fonts/sans.ttf?rnd=455884',(bb)=>{
		            if(bb!=null){
		                if(bb.size>0){
		                    var r1=File.saveBytes(path+'/sans.ttf',bb)
		                }
		            }
		        })
		    }*/
		    
		    
		    /*if(baArial!=null){
		        //alert(baArial.size)
		        lang.text.Font.registerFont('Arial',baArial)
		    }*//*else{
		        URL.binaryGet('https://animals-game.ru/fonts/arial.ttf?rnd=455884',(bb)=>{
		            if(bb!=null){
		                if(bb.size>0){
		                    var r1=File.saveBytes(path+'/arial.ttf',bb)
		                }
		            }
		        })
		    }*/
		    
		//}
		
this.cbContextMenuRClick=null
this.overloadOperatorsMap={1:"+", 2:"-",3:"*",4:"/",5:"%",10:"<",11:">",12:"<=",13:">=",14:"==",15:"!=",16:"<<",17:">>",18:"&",19:"|",20:"^",21:"[]",22:"~",23:"()"}

this.urlScheme={}

this.urlBlobData=new lang.system.Folder('root')
/*if(System.platform.type=='web'){
var fnMap=[['requestFullscreen','exitFullscreen','fullscreenElement','fullscreenEnabled','fullscreenchange','fullscreenerror'],
['webkitRequestFullscreen','webkitExitFullscreen','webkitFullscreenElement','webkitFullscreenEnabled','webkitfullscreenchange','webkitfullscreenerror'],
['webkitRequestFullScreen','webkitCancelFullScreen','webkitCurrentFullScreenElement','webkitCancelFullScreen','webkitfullscreenchange','webkitfullscreenerror'],
['mozRequestFullScreen','mozCancelFullScreen','mozFullScreenElement','mozFullScreenEnabled','mozfullscreenchange','mozfullscreenerror'],
['msRequestFullscreen','msExitFullscreen','msFullscreenElement','msFullscreenEnabled','MSFullscreenChange','MSFullscreenError']]
var fn={}
for(var i=0;i<fnMap.size;i++){
var val=fnMap[i]
var v2=val[1]
if(v2 in document){
for(var k=0;k<val.size;k++){
var v3=fnMap[0]
var v4=v3[k]
fn[v4]=val[k]
}
}
}
this.fullscreenObjData=fn
}*/
	}
}
class %CURRENT_CLASSNAME% extends lang.display.Sprite{

%CURRENT_CLASSNAME%(title,ww,hh,clr){
var th=this
var ren=null
var spr=new lang.display.Sprite
addChild(spr)
var headerH=50
var fullW=ww
if(clr==null)clr='#3a9ac4'
this.closeCB=null
var ob3={type:'movie',name:'mov',list:[{type:'rect',width:1,height:1,fill:'#000000',alpha:0.3,onresize:(w,h)=>{
this.painter.clear()
this.painter.rect(0,0,w,h,this.painter.fillData)
}},{type:'movie',name:'m',onresize:(w,h)=>{
this.x=(w-ww)/2
this.y=(h-hh)/2
},list:[{type:'rect',x:-2,y:-2,width:ww+4,height:hh+4,fill:'#000000',alpha:0.5},{type:'rect',width:ww,height:(hh-headerH),fill:'#FFFFFF',y:headerH},{type:'movie',width:ww,height:(hh-headerH),name:'content',list:[],y:headerH},{type:'rect',width:ww,height:headerH,fill:clr},{name:'titleTxt',type:'text',text:title,bold:true,color:0xFFFFFF,selectable:false,fontName:'Arial',fontSize:20,onresize:(w,h)=>{
this.x=((ww-20)-this.width)/2
this.y=(headerH-this.height)/2
}}/*,{type:'img',src:'/images/logo-min.png',selectable:false},*/,{type:'img',y:14,src:'https://animals-game.ru/images/remove-symbol.png',onclick:(e)=>{
th.remove()
},onrollover:(e)=>{this.alpha=0.6},onrollout:(e)=>{this.alpha=1},onresize:(w,h)=>{this.x=ww-32}}]}]}

ren=spr.renderStruct('obj1',ob3)
th.setHTMLContent=(s)=>{
ren.mov.m.content.html=s   
}
th.addContent=(s)=>{ren.mov.m.content.addChild(s)}
th.scrollContent=(v)=>{ren.mov.m.content.scroll=v}
th.getContentSize=()=>{return {width:ww,height:(hh-headerH)}}
this.ren=ren
//ren.mov.m.titleTxt.y=(headerH-ren.mov.m.titleTxt.height)/2

this.cb1=(e)=>{
var sz=MainUI.getStageSize()
ren.resizeDisplay(sz.width,sz.height)
}

stage.on('resize',this.cb1)

var sz2=MainUI.getStageSize()

ren.resizeDisplay(sz2.width,sz2.height)
}

remove(){
if(this.parent!=null)
this.parent.removeChild(this)
stage.off('resize',this.cb1)
this.removeAllEvents()
if(this.closeCB!=null)this.closeCB()
this.closeCB=null
}

}
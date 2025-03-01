class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(){
this.ob={}
this.minSize={w:200,h:100}
this.cnt=sprite()
addChild(this.cnt)
}

init(){
var th=this

th.reg('colorpicker','Выбор цвета',(cb,targetProps)=>{
var sp=new ColorPicker(targetProps)
sp.cb=cb
return sp
},{w:300})

th.reg('colorpickerFilter','Цвет для фильтра',(cb,targetProps)=>{
var sp=new ColorPicker(targetProps,'filter')
sp.cb=cb
return sp
},{w:300})

th.reg('pixelTarget','Захват цвета',(bm,cb)=>{
var sp=sprite()
var ww=50
var lastColor=null
var isPause=false
var ev=events()
var bg=sprite()
var tf=text('',{color:0})
var txtDef='для выбора - пробел'
var tf2=text(txtDef,{color:Config.borderColorV,bold:true})
tf.y=ww+5
tf2.x=ww+35
tf2.y=18
bg.createPainter()

var changeColor=(v)=>{
bg.painter.clear()
bg.painter.border(4,0)
bg.painter.rect(0,0,ww,ww,v)
tf.text=''+v
lastColor=v
}

sp.addChild(bg,tf,tf2)

changeColor('#000000')

var bmd2=new lang.display.BitmapData(1,1,true,0)
var mat=new lang.geom.Matrix

var targ2=bm
if(targ2){
mat.scale(targ2.scaleX,targ2.scaleY)
}

var cbMove=(e)=>{
var targ=th
if(bm && !isPause){
if(bm.parent)targ=bm.parent
var pos=mousePos(targ,e)

if(pos.x<bm.width && pos.y<bm.height){
bm.x=-pos.x
bm.y=-pos.y
bmd2.draw(bm)
bm.setMatrix(mat)
var pix=bmd2.getPixel(0,0)
if(pix[3]>0){
var alp=pix[3]/255
var vv=RGBToHex(pix)
if(lastColor!=vv){
changeColor(vv)
if(cb)cb(vv)
}
}
}
}
}

if(bm){
ev.on(bm,'mousemove',cbMove)
ev.on(th.stage,'keyup',(e)=>{
if(e.keyCode==lang.ui.Keyboard.SPACE){
if(sp.close)sp.close()
/*isPause=!isPause
tf2.x=ww+35
if(isPause){
tf2.x+=30
tf2.text='цвет выбран'
}else{
tf2.text=txtDef
}*/
//sp.close()
}
})
}

sp.remove=()=>{
ev.clear()
}

return sp
},{w:300})

}

reg(t,title,cb,props){
if(!props)props={}
var th=this
if(t && cb){
th.ob[t]={type:t,title:title,props:props,cb:cb}
}
}

open(t){
var args=[];
for(var i=1; i < arguments.length; i++)args.push(arguments[i]);
var ob={args:args,target:this.cnt}
this.openTarget(t,ob)
}

openTarget(t,props){
var th=this;
if(t && t in th.ob && props){
var target=props.target
if(target){
var args=null
if('args' in props)args=props.args
var o=th.ob[t]
var pr=o.props
var res=o.cb.apply(null,args)
var cntW=th.minSize.w
var cntH=th.minSize.h
if('w' in pr)cntW=Math.max(cntW,pr.w)
if('h' in pr)cntH=Math.max(cntH,pr.h)
if(res){
cntW=Math.max(cntW,res.width)
cntH=Math.max(cntH,res.height)
}

var borderSize=6
var borderCnt=4
var titleHeight=24
var clrBorder=0xB23067//Config.borderColorV
var sp=sprite()
sp.windowItem=o

var closeCB=()=>{
th.closeWindow(sp)
}

var appIconSize=titleHeight-1
var appIcon=bitmap('birdMin')
var closeBut=bitmap('close')
closeBut.buttonMode=true
closeBut.on('click',closeCB)
sp.close=closeCB
var ratio=Math.min(1,appIconSize/(appIcon.width*appIcon.resolution),appIconSize/(appIcon.height*appIcon.resolution))
appIcon.scaleX=ratio
appIcon.scaleY=ratio
appIcon.x=8
appIcon.y=1
appIcon.mouseEnabled=false
var bg=sprite()
var bgCnt=sprite()
var cntSpr=sprite()
bg.createPainter()
bg.painter.border(4,0,0.2)

bgCnt.createPainter()
bgCnt.painter.border(borderCnt,0xCCCCCC)
cntSpr.addChild(bgCnt)
if(res){
res.x=borderCnt/2
res.y=borderCnt/2
res.close=closeCB
cntSpr.addChild(res)
sp.contentSpr=res
}
sp.x=50
sp.y=50
var titleTxt=text(o.title,{fontSize:16,color:0xFFFFFF,bold:true})
titleTxt.y=6
titleTxt.mouseEnabled=false

cntSpr.x=borderSize
cntSpr.y=borderSize+titleHeight

cntW+=borderCnt
cntH+=borderCnt
bg.painter.rect(0,0,cntW+(borderSize*2),cntH+titleHeight+(borderSize*2),clrBorder)

bgCnt.painter.rect(0,0,cntW,cntH,'#FFFFFF')
sp.addChild(bg,cntSpr,titleTxt,appIcon,closeBut)
cntW+=(borderSize*2)
//cntH+=(borderSize*2)
titleTxt.x=(cntW-titleTxt.width)/2
closeBut.x=cntW-(closeBut.width+10)
closeBut.y=6
sp.borderBG=bg
th.setWindowProps(sp)
th.cnt.addChild(sp)
return sp
//alert(cntW,cntH)

}
}
return null
}

setWindowProps(sp){
if(sp){
//sp.borderBG.buttonMode=true
sp.borderBG.isDragItem=true
sp.borderBG.dragItemElement=sp
}
}

find(t){
var th=this
if(t){
for (var i = 0; i < th.cnt.numChildren; i++) {
var d=th.cnt.getChildAt(i)
if(d.windowItem && d.windowItem.type==t)return d
}
}
return null
}

closeAll(){
var th=this
var num=th.cnt.numChildren
for (var i = 0; i < num; i++) {
var d=th.cnt.getChildAt(0)
th.closeWindow(d)
}
}

closeWindow(sp){
if(sp && sp.close){
if(sp.parent)sp.parent.removeChild(sp)
sp.close=null
if(sp.contentSpr)sp.contentSpr.close=null
destroyItem(sp)
}
}

resize(w,h){

}

}
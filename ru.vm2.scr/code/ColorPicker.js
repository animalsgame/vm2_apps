class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(targetProps,t){
var th=this
th.cb=null
th.pickObj=Config.colorpickerObj
th.targetProps=targetProps
th.bmPanel=null
th.panelW=150
th.pointCenter=0
th.ev=events()
th.tfInfo=text('',{color:0})
var sp=sprite()
addChild(sp,th.tfInfo)
var thickness=4
var itemW=60
th.thickness=thickness
th.itemW=itemW
var fillSpr=sprite()
th.brushRect=rect(1,1,'#000000')
fillSpr.addChild(th.brushRect)

th.selectColor('#000000')

var colors=th.createColors()
colors.x=th.panelW
sp.addChild(fillSpr,colors)

var maxAlpha=255

var alphaSlider=hslider((v)=>{
colors.bmm.alpha=v/maxAlpha
th.updColor(th.pickObj.x,th.pickObj.y)
},{min:30,max:maxAlpha,value:maxAlpha})
alphaSlider.x=th.panelW
alphaSlider.y=colors.y+th.panelW+16

th.tfInfo.y=alphaSlider.y

sp.addChild(alphaSlider)
th.targetProps.selectPickerCB=(v)=>{
th.selectColor(v)
}

var clrBut=button(Config.borderColorV,'Захват цвета',()=>{
if(th.targetProps && th.targetProps.bitmapTarget){
var findWindow=$app.windowMaster.find('pixelTarget')
if(findWindow)findWindow.close()
$app.windowMaster.open('pixelTarget',th.targetProps.bitmapTarget,th.targetProps.selectPickerCB)

var pick1=$app.windowMaster.find('colorpicker')
if(pick1)pick1.close()

}
})
clrBut.y=itemW+8
if(t!='filter')sp.addChild(clrBut)
}

selectColor(v,noCB){
var th=this
var vOrig=v
if(v){
if(v is Number)v=decToHex(v)
th.brushRect.painter.clear()
th.brushRect.painter.border(th.thickness,0)
th.brushRect.painter.rect(0,0,th.itemW-(th.thickness*2),th.itemW-(th.thickness*2),v)
th.tfInfo.text=v
if(th.cb && !noCB)th.cb(vOrig,th.bmPanel.alpha)
}
}

createColors(){
var th=this
var sp=sprite()

var bg=sprite()
bg.createPainter()

var gradColors=['#FF0000','#FFFF00','#00FF00','#00FFFF','#0000FF','#FF00FF','#FF0000']

var pointColor='#000000'
var pointW=20
var pointH=2
var pointCenter=(pointW-pointH)/2
var pointerBut=sprite()
pointerBut.mouseEnabled=false
pointerBut.createPainter()
pointerBut.painter.rect(0,pointCenter,pointW,pointH,pointColor)
pointerBut.painter.rect(pointCenter,0,pointH,pointW,pointColor)
pointerBut.x=-pointCenter
pointerBut.y=-pointCenter

var pointerBut2=sprite()
pointerBut2.alpha=0
pointerBut2.mouseEnabled=false
pointerBut2.createPainter()
pointerBut2.painter.rect(0,pointCenter,pointW,pointH,pointColor)
pointerBut2.painter.rect(pointCenter,0,pointH,pointW,pointColor)
pointerBut2.x=-pointCenter
pointerBut2.y=-pointCenter

th.pointerBut=pointerBut
th.pointCenter=pointCenter
var w1=60
var h1=w1
var colors=[]
var ratios=[]

var sz3=gradColors.length
for(var i = 0; i < sz3; i++){
var qq=gradColors[i]
var kk=i/(sz3-1)
colors.push(qq)
ratios.push(kk)
}

var ww=w1
var hh=h1
var pp=lang.display.Painter.createLinearGradient(0,0,ww,0,colors,ratios)
//var pp2=lang.display.Painter.createLinearGradient(0,0,0,sin*hh,['#000000','#FFFFFF'],[0,1])
bg.painter.rect(0,0,ww,hh,pp)
//bg.painter.rect(0,0,ww,hh,pp2)
var bmd=new lang.display.BitmapData(w1,h1,true,0)
bmd.draw(bg)

var bmd2=new lang.display.BitmapData(w1,h1,true,0)
for (var k = 0; k < h1; k++) {
var alpV=Math.floor((k/(h1-1))*255)
for (var i = 0; i < w1; i++){
bmd2.setPixel(i,k,0xFFFFFF,alpV/255)
/*var kk=(i%colors.length)/sz3
var clrPos=Math.floor(i*kk)
var decColor=hexToDec(gradColors[clrPos])
bmd.setPixel(i,k,decColor)*/
}
}

bmd.copyPixels(bmd2,rectangle(0,0,bmd2.width,bmd2.height),rectangle(0,0,bmd2.width,bmd2.height))

var bmm=new lang.display.Bitmap
bmm.scaleX=th.panelW/ww
bmm.scaleY=th.panelW/hh
bmm.smoothing=false
bmm.src=bmd
bmm.bmdData=bmd
th.bmPanel=bmm

if(!Config.colorpickerObj){
Config.colorpickerObj={x:0,y:hh-1}
}
th.pickObj=Config.colorpickerObj

var cbMove=(e)=>{
var pos=mousePos(bmm,e)
th.updColor(pos.x,pos.y)
}

bmm.on('mousedown',(e)=>{
//var startPos=mousePos(th,e)
cbMove(e)
th.ev.on(th.stage,'mousemove',cbMove)
th.ev.on(th.stage,'mouseup',()=>{th.ev.clear()})
})
sp.bmm=bmm

var bgBlack=rect(th.panelW,th.panelW,'#000000')
sp.y=10
sp.addChild(bgBlack,bmm,pointerBut2,pointerBut)

th.updColor(th.pickObj.x,th.pickObj.y)

return sp
}

updColor(x,y){
var th=this
if(th.bmPanel && th.bmPanel.bmdData){
var xx=Math.floor(x)
var yy=Math.floor(y)
var ww=th.bmPanel.width
var hh=th.bmPanel.height
var bmd=th.bmPanel.bmdData
if(xx<0)xx=0
if(yy<0)yy=0
if(xx>=ww)xx=ww-1
if(yy>=hh)yy=hh-1
th.pickObj.x=xx
th.pickObj.y=yy
var pix=bmd.getPixel(xx,yy)
if(pix){
var q1=yy/hh
var alpV=th.bmPanel.alpha
pix[0]=Math.floor(pix[0]*alpV)
pix[1]=Math.floor(pix[1]*alpV)
pix[2]=Math.floor(pix[2]*alpV)
var clrHex=RGBToHex(pix)
th.selectColor(clrHex)
th.pointerBut.x=Math.round(((xx/ww)*th.panelW)-th.pointCenter)
th.pointerBut.y=Math.round(((yy/hh)*th.panelW)-th.pointCenter)
//th.tfInfo.text='x '+xx+' y '+yy+' : '+clrHex
}
}
}

getAlpha(){
var th=this
if(th.bmPanel)return th.bmPanel.alpha
return 1
}

remove(){
this.targetProps=null
this.ev.clear()
}

}
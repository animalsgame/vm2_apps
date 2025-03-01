class %CURRENT_CLASSNAME%{

constructor(){
}

destroyItem(o){
if(o){
var vv=true
if('noDestroyV' in o && o.noDestroyV)vv=false
if(vv && !('isDestroyV' in o)){
o.isDestroyV=true
if(o is lang.display.Sprite){
for(var i = o.numChildren-1; i >= 0; i--){
var d=o.getChildAt(i)
destroyItem(d)
}
}
if('remove' in o && o.remove){
o.remove()
o.remove=null
}
}
}
}

hslider(cb,props){
var sp=sprite()
var bg=bitmap('hslider')
var circ=bitmap('hsliderCirc')
var sw=bg.width
var cw=circ.width/2
circ.y=-4
circ.mouseEnabled=false
sp.addChild(bg,circ)

var minV=0
var maxV=100
var valueV=0

if(props){
if('min' in props)minV=props.min
if('max' in props)maxV=props.max
if('value' in props)valueV=props.value
}

var k2=Math.max(0,(valueV-minV)/(maxV-minV))
if(k2>1)k2=1

var posV=Math.floor(k2*(sw-cw))
circ.x=posV-cw
if(circ.x<0)circ.x=0

var ev=events()

var cbMove=(e)=>{
var pos=mousePos(sp,e)
var k2=(sw-circ.width)/sw
var koef=Math.min(k2,(pos.x-cw)/sw)
if(koef<0)koef=0
var newX=Math.round(sw*koef)
if(newX<0)newX=0
circ.x=newX
var val=Math.floor(minV+(maxV-minV)*(koef/k2))
if(cb)cb(val)
}

bg.on('mousedown',(e)=>{
cbMove(e)

ev.on(sp.stage,'mousemove',cbMove)
ev.on(sp.stage,'mouseup',()=>{
ev.clear()
})
})
sp.remove=()=>{
ev.clear()
}
return sp
}

/*colorpicker(colorV,cb){
var sp=sprite()
var thickness=4
var itemW=35
var fillSpr=sprite()
//fillSpr.x=thickness
//fillSpr.y=itemW

var brushRect=rect(1,1,'#000000')
brushRect.buttonMode=true
brushRect.selectColor=(v,alp)=>{
if(v){
if(v is Number)v=decToHex(v)
brushRect.painter.clear()
brushRect.painter.border(thickness,0)
brushRect.painter.rect(0,0,itemW-(thickness*2),itemW-(thickness*2),v)
if(cb)cb(v,alp)
}
}

if(colorV)brushRect.selectColor(colorV,1)

brushRect.on('click',(e)=>{
var findWindow=$app.windowMaster.find('colorpicker')
if(findWindow)findWindow.close()
$app.windowMaster.open('colorpicker',brushRect.selectColor)
})
fillSpr.addChild(brushRect)
sp.addChild(fillSpr)
sp.brushRect=brushRect
return sp
}*/

/*colorpicker2(colorV,cb){
var sp=sprite()
var thickness=4
var itemW=35
var fillSpr=sprite()
var brushRect=rect(1,1,'#000000')
brushRect.buttonMode=true
brushRect.selectColor=(v)=>{
var vOrig=v
if(v){
if(v is Number)v=decToHex(v)
brushRect.painter.clear()
brushRect.painter.border(thickness,0)
brushRect.painter.rect(0,0,itemW-(thickness*2),itemW-(thickness*2),v)
if(cb)cb(vOrig)
}
}
if(colorV)brushRect.selectColor(colorV)
brushRect.on('click',(e)=>{
System.openColorPicker((v)=>{
brushRect.selectColor(v)
})
})
fillSpr.addChild(brushRect)
sp.addChild(fillSpr)
sp.brushRect=brushRect
return sp
}*/

RGBToHex(a,isAlpha){
var s='#000000'
if(a && a.length>=3){
var r=a[0]
var g=a[1]
var b=a[2]
var alp=255
if(isAlpha)alp=a[3]
var rStr=r.toString(16)
var gStr=g.toString(16)
var bStr=b.toString(16)
var aStr=alp.toString(16)
if(rStr.length==1)rStr='0'+rStr
if(gStr.length==1)gStr='0'+gStr
if(bStr.length==1)bStr='0'+bStr
if(aStr.length==1)aStr='0'+aStr
s='#'+rStr+gStr+bStr
if(isAlpha)s+=aStr
}
return s
}

button(color,txt,cb,props){
var sp=sprite()
var allW=60
var allH=40
var margin=8
var tf=text(txt,{color:0xFFFFFF,fontSize:18,bold:true})
allW=tf.width+(margin*2)
allH=tf.height+(margin*2)

if(props && 'w' in props){
allW=props.w
}

var bg=rect(allW,allH,color)
tf.x=margin
tf.y=margin

if(props && 'w' in props){
tf.x=((props.w-tf.width)/2)
}

tf.mouseEnabled=false
bg.buttonMode=true
if(cb)bg.on('click',cb)
sp.addChild(bg,tf)
return sp
}

pixelsToBMD(ob4){
if(ob4){
var bmd=new lang.display.BitmapData(ob4.width,ob4.height,0,true)
var sz2=ob4.width*ob4.height
var ww=ob4.width
if(sz2>0){
for (var i = 0; i < sz2; i++) {
var xx=i%ww
var yy=Math.floor(i/ww)
var pixelPos=(yy*ww)+xx
var pixelV=ob4.pixels[pixelPos]
var clr=hexToDec(ob4.palette[pixelV])
bmd.setPixel(xx,yy,clr)
}
return bmd
}
}
return null
}

hexToDec(color){
if(color && color is String){
if(color.length>0){
var ch=color.charAt(0)
if(ch=='#')color=color.cut(1)
var vv=parseInt(color,16)
return vv
}
}
return 0
}

decToHex(color){
if(color==null)color=0
var vv=''+color.toString(16)
var num=vv.length
var qw=''
if(num<6){
for (var i=0; i < 6-num; i++)qw+='0'
}
var q=qw+''+vv
return '#'+q
}

mousePos(o,e){
var v=null
if(o){
var ratio=$app.scaleFactor
var r2=$app.pixelRatio
v=o.toLocal({x:e.mouseX,y:e.mouseY})

if($app.isVM2V11){
//v.x=(v.x*r2)
//v.y=(v.y*r2)
return v
}

if(o==$app.stage){
v.x=(v.x/ratio)//*r2
v.y=(v.y/ratio)//*r2
}
}
return v
}

mouseTouchID(e){
var v=e.touchPointID||0
return v
}

rectangle(x,y,w,h){
var v=new lang.geom.Rectangle(x,y,w,h)
return v
}

sprite(){
var sp=new lang.display.Sprite
return sp
}

hgroup(o,sz){
if(o){
if(sz==null)sz=0
var xx=0
for (var i = 0; i < o.numChildren; i++) {
var el=o.getChildAt(i)
el.x=xx
xx=xx+el.width+sz
}
}
}

vgroup(o,sz){
if(o){
if(sz==null)sz=0
var xx=0
for (var i = 0; i < o.numChildren; i++) {
var el=o.getChildAt(i)
el.y=xx
xx=xx+el.height+sz
}
}
}

text(txt,styles){
var textDefStyles={fontSize:18,fontName:'Arial',color:0xFFFFFF}
var tf=new lang.text.TextField
var color=textDefStyles.color
var fontSize=textDefStyles.fontSize
var fontName=textDefStyles.fontName
var maxW=0
if(styles){
if('fontName' in styles)fontName=styles.fontName
if('fontSize' in styles)fontSize=styles.fontSize
if('color' in styles)color=styles.color
if('bold' in styles)tf.bold=styles.bold
if('maxWidth' in styles){
maxW=styles.maxWidth
tf.maxWidth=maxW
}
}
tf.fontName=fontName
tf.color=color
tf.fontSize=fontSize
tf.text=''+txt
//tf.dragItem=true

if(styles){
if('align' in styles){
if(styles.align=='center'){
if(maxW>0){
tf.align='center'
}else if('w' in styles){
if(styles.w>0){
tf.x=(styles.w-tf.width)/2
}
}
}
}
}
return tf
}

bitmap(name){
var ob2=$app.assetsReader.assetsBitmap
var tex=null
if(name && name is lang.display.Bitmap)tex=name
else if(name && name is lang.display.BitmapData)tex=name
if(!tex){
if(name in ob2)tex=ob2[name]
if(!tex){
var nm2='icons/'+name
if(nm2 in ob2)tex=ob2[nm2]
}
}
var d=new lang.display.Bitmap
if(tex){
d.src=tex
//d.scaleX=4
//d.scaleY=4
d.resolution=2
}
return d
}

rect(w,h,fill){
if(w<1)w=1
if(h<1)h=1
var d=new lang.display.Sprite
d.createPainter()
d.painter.rect(0,0,w,h,fill)
d.painter.fillV=fill
return d
}

events(){
var v=new lang.events.EventsObjectMaster
return v
}

}
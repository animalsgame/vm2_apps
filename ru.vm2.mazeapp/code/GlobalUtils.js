class %CURRENT_CLASSNAME%{

constructor(){
}

mousePos(o,e){
var v=null
if(o){
var ratio=1//$app.scaleFactor
var r2=1//$app.pixelRatio
v=o.toLocal({x:e.mouseX,y:e.mouseY})
if(o==$app.stage){
v.x=(v.x/ratio)*r2
v.y=(v.y/ratio)*r2
}
}
return v
}

sprite(){
var v=new lang.display.Sprite
return v
}

bitmap(v){
var bm=new lang.display.Bitmap
bm.src=v
return bm
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

text(txt,styles){
var textDefStyles={fontSize:18,fontName:'Arial',color:0}
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
return tf
}

textinput(w){
if(w<0)w=100
var bg=sprite()
bg.createPainter()
bg.painter.clear()
bg.painter.border(3,0)
bg.painter.rect(0,0,w+6,26,'#FFFFFF')
var spr=sprite()
var ti=new lang.text.TextInput
ti.x=3
ti.y=3
ti.width=w
ti.fontSize=18
ti.color=0
spr.ti=ti
spr.addChild(bg,ti)
return spr
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

}
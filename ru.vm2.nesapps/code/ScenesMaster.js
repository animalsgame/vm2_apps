class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(){
this.curScene=null
this.w=0
this.h=0
this.ow=0
this.oh=0
this.cnt2=new lang.display.Sprite
this.cnt=new lang.display.Sprite
this.cnt.y=$app.headerH
addChild(this.cnt)
this.headerSpr=new lang.display.Sprite
this.footerSpr=new lang.display.Sprite
this.bgSpr=new lang.display.Sprite
this.bgSpr.createPainter()
this.bgSpr2=new lang.display.Sprite
this.bgSpr2.createPainter()
this.headerSpr.addChild(this.bgSpr)
this.footerSpr.addChild(this.bgSpr2)
this.cnt2.addChild(this.headerSpr,this.footerSpr)


var tf=new lang.text.TextField
tf.y=2
tf.fontName='Arial'
tf.fontSize=18
tf.color=0xFFFFFF
tf.bold=true
tf.text='Игровой центр'
this.tfFooter=tf
this.footerSpr.addChild(this.tfFooter)
}

clear(){
removeChild(this.cnt2)
while(this.cnt.numChildren>0){
var el=this.cnt.getChildAt(0)
el.parent.removeChild(el)
if('removeScene' in el)el.removeScene()
}
this.curScene=null
}

navApps(cb){
clear()
addChild(this.cnt2)
var c=new AppsScene(cb)
this.curScene=c
this.cnt.addChild(c)
this.autoResize()
}

navPreloadScene(txt){
addChild(this.cnt2)
var spr=new lang.display.Sprite
var bg=new lang.display.Sprite
bg.createPainter()
var tf=new lang.text.TextField
tf.fontName='Arial'
tf.fontSize=22
tf.color=0
tf.bold=true
tf.text=txt

spr.resize=(w,h)=>{
tf.x=(w-tf.width)/2
tf.y=(h-tf.height)/2
bg.painter.clear()
bg.painter.rect(0,0,w,h,'#FFFFFF')
}
spr.addChild(bg,tf)
this.curScene=spr
this.cnt.addChild(spr)
this.autoResize()
}

autoResize(){
this.resize(this.ow,this.oh)
}

resize(w,h){
this.ow=w
this.oh=h
this.w=w
this.h=h-$app.headerH-$app.footerH

this.bgSpr.painter.clear()
this.bgSpr.painter.rect(0,0,this.w,$app.headerH,'#3083A7')

this.bgSpr2.painter.clear()
this.bgSpr2.painter.rect(0,0,this.w,$app.footerH,'#455a64')
this.tfFooter.x=(w-this.tfFooter.width)/2
this.footerSpr.y=h-$app.footerH
for (var i = 0; i < this.cnt.numChildren; i++) {
var el=this.cnt.getChildAt(i)
if('resize' in el)el.resize(this.w,this.h)
}
}
}
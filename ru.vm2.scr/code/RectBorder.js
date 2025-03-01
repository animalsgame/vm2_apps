class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(clr,thickness){
this.w=0
this.h=0
this.color=clr
if(thickness==null)thickness=1
this.thickness=thickness
this.spr=sprite()
this.spr.createPainter()
this.mouseChildren=false
addChild(this.spr)
}

resize(w,h){
var th=this
th.w=w
th.h=h
var clr=th.color
th.spr.painter.clear()
th.spr.painter.rect(0,0,w,th.thickness,clr)
th.spr.painter.rect(0,0,th.thickness,h,clr)

var x2=Math.max(0,w-th.thickness)
var y2=Math.max(0,h-th.thickness)
th.spr.painter.rect(w-th.thickness,0,th.thickness,h,clr)
th.spr.painter.rect(0,y2,w,th.thickness,clr)
}

clear(){
this.spr.painter.clear()
}

}
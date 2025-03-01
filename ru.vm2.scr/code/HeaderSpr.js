class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(){
this.w=0
this.h=50
this.cnt=sprite()
this.bg=null
}

init(){
this.bg=rect(1,1,Config.headerBG)
this.logo=bitmap('birdHeader')
this.logo.x=2
this.cnt.addChild(this.logo)
addChild(this.bg,this.cnt)
}

resize(w,h){
var th=this
th.w=w
if(th.bg){
th.bg.painter.clear()
th.bg.painter.rect(0,0,w,th.h,th.bg.painter.fillV)
}
}

}
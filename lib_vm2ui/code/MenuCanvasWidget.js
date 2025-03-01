class CanvasMenuSprItem extends lang.display.Sprite{

constructor(menu,o){
var th=this
this.item=o
this.w=0
this.h=0
this.cb=o[1]
this.bg=new lang.display.Sprite
this.bg.createPainter()
this.bg2=new lang.display.Sprite
this.bg2.createPainter()
this.bg2.alpha=0
this.bg2Init=false
this.tf=new lang.text.TextField
this.tf.fontSize=18
this.tf.fontName='Arial'
this.tf.text=o[0]
this.tf.bold=true
this.tf.mouseEnabled=false
this.tf.width=this.tf.width+4
this.tf.x=4
this.selectable=false
addChild(this.bg,this.tf,this.bg2)
this.bg2.buttonMode=true
this.bg2.on('click',(e)=>{
menu.remove()
if(th.cb!=null)th.cb()
})
menu.ev.on(this.bg2,'rollover',(e)=>{
th.setState(1)
})
menu.ev.on(this.bg2,'rollout',(e)=>{
th.setState(0)
})
//th.setState(0)
}

setState(v){
this.state=v
this.resize(this.w,this.h)
}


resize(w,h){
this.w=w
this.h=h
if(this.bg2Init==false){
this.bg2.painter.rect(0,0,w,h,'#000000')
this.bg2Init=true
this.setState(0)
}
this.bg.painter.clear()
this.tf.color=0xFFFFFF
this.tf.x=(w-this.tf.width)/2
if(this.tf.y==0)
this.tf.y=(h-(this.tf.height-4))/2
if('textFieldOffsetY' in GLOBAL)this.tf.y=this.tf.y+GLOBAL.textFieldOffsetY
//var clr2='#3083A7'
var clr2='#000000'
this.bg.alpha=0.1
if(this.state==1){
//this.tf.color=0
this.bg.alpha=1
clr2='#1D556E'
//this.bg.painter.rect(0,0,w,h,clr2)
}
this.bg.painter.rect(0,0,w,h,clr2)
}

}


class MenuCanvasWidget extends lang.display.Sprite{

constructor(menuList){
var th=this
this.w=180
this.h=300
this.headerH=30
this.mColor='#3083A7'
this.menuH=35
//if(System.platform.type=='android')this.menuH+=10
this.menuList=menuList
this.ev=new lang.events.EventsObjectMaster
this.bg1=new lang.display.Sprite
this.bg1.createPainter()

this.bgHeader=new lang.display.Sprite
this.bgHeader.createPainter()

this.tfHeader=new lang.text.TextField
this.tfHeader.fontSize=18
this.tfHeader.fontName='Arial'
this.tfHeader.color=0xFFFFFF
this.tfHeader.bold=true
this.tfHeader.text='Меню'
this.tfHeader.x=(this.w-this.tfHeader.width)/2
this.tfHeader.y=8

addChild(this.bg1,this.bgHeader,this.tfHeader)
this.cnt=new lang.display.Sprite
this.margin=1
this.margin2=0

this.bgHeader.x=1
this.bgHeader.y=1

this.tf=new lang.text.TextField
this.tf.x=this.margin
this.tf.y=this.margin
this.tf.fontSize=12
this.tf.fontName='Arial'
this.tf.color=0xFFFFCC
this.selectable=false

this.tfLvl=new lang.text.TextField
this.tfLvl.x=this.margin
this.tfLvl.y=this.margin
this.tfLvl.fontSize=12
this.tfLvl.fontName='Arial'
this.tfLvl.color=0x66FFCC
addChild(this.tf,this.tfLvl,this.cnt)
this.cnt.y=this.headerH+5

var maxW=0

var tfsz=new lang.text.TextField

for (var i = 0; i < this.menuList.size; i++) {
var el=this.menuList[i]
var txt=el[0]
tfsz.text=txt
if(this.w<tfsz.width)this.w=tfsz.width
}

this.h=(this.menuH+this.margin2)*this.menuList.size
this.h=this.h+this.cnt.y+this.margin
this.redraw()

this.firstClick=false
this.firstClick1=true
this.ev.on(stage,'click',()=>{
    if(th.firstClick==false){
    th.firstClick=true
    }else{
        if(th.firstClick1==false){
            th.firstClick1=true
        }else{
        th.remove()
        }
    }
})


var yy=0
for (var i = 0; i < this.menuList.size; i++) {
var el=this.menuList[i]
var sp=new lang.display.CanvasMenuSprItem(this,el)
sp.resize(this.w-(this.margin*2),this.menuH)
sp.x=this.margin
sp.y=i*(this.menuH+this.margin2)
this.cnt.addChild(sp)
}

}

remove(){
this.ev.clear()
if(this.parent!=null)this.parent.removeChild(this)
}

setInfo(nick,level){
this.tf.text=nick
this.tf.width=this.tf.width+4
this.tfLvl.text='['+level+']'
this.tfLvl.x=this.w-this.tfLvl.width-8
}


redraw(){
var border=1
this.bg1.painter.clear()
var clr2=0
//var clr3='#3083A7'
//var clr4='#F8FAFA'
var clr4=this.mColor
this.bg1.painter.border(border,clr2)
/*this.bg1.painter.rect(0,0,this.w,this.h,clr4)
this.bg1.painter.rect(border*2,border*2,this.w-(border*2),22-(border*2),clr3)

this.bg1.painter.border(border,clr2)*/
this.bg1.painter.rect(0,0,this.w,this.h,clr4)

this.bgHeader.painter.clear()
this.bgHeader.painter.rect(0,0,this.w-(this.bgHeader.x*2),this.headerH,this.mColor)
//this.bg1.painter.rect(border,border,this.w-(border*2),22-(border),clr3)


}

}
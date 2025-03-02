class %CURRENT_CLASSNAME% extends lang.display.Sprite{

%CURRENT_CLASSNAME%(){
/*var th=this
var cfg=new lib.chat.Config
cfg.scrollWidth=10
cfg.scrollColor=0xfcdbaa
//cfg.scale=1.5

this.smiles=new ChatLibSmilesMaster

var fi1=new lang.io.File('chatBG.png')
var bmChat=new lang.display.Bitmap
bmChat.src=fi1

var bgm=new lang.display.Sprite
bgm.createPainter()
addChild(bgm)

var spr=new lib.chat.Chat(cfg)
//spr.setBlendColor(0xFFFFFF)
addChild(spr)
spr.resize(300,300)
stage.framerate=30
var ch=lib.chat

var fi1=new lang.io.File('adminNickIcon.png')
var bm1=new lang.display.Bitmap
bm1.src=fi1

var fi1=new lang.io.File('DeleteMsg.png')
var bmDel=new lang.display.Bitmap
bmDel.src=fi1

//addChild(bm1)
var el=new ch.Sprite
spr.curItems=el
var colors=[0xFF0000,0xCCCC00,0]
//spr.add(el)
//spr.render(el)

var tiW=300
var tiH=25
var sp2=new lang.display.Sprite
sp2.x=5
var bg1=new lang.display.Sprite
bg1.createPainter()
bg1.painter.border(1,0)
bg1.painter.rect(0,0,tiW,tiH,'#FFFFFF')
sp2.addChild(bg1)

var ti=new lang.text.TextInput
ti.width=tiW-sp2.x
ti.height=25
ti.x=2
ti.y=2
sp2.addChild(ti)
sp2.y=spr.h+10
spr.addChild(sp2)

var sendBut=new lang.text.TextField
sendBut.color=0
sendBut.fontSize=18
sendBut.text='SEND'
sendBut.buttonMode=true
sp2.addChild(sendBut)

var createChatTimeInfo=(ts)=>{
var date = new Date()
date.setTime(ts*1000)
var strsec=''
var strmin=''
var strhour=''
var sec=date.getSeconds()
var min=date.getMinutes()
var hours=date.getHours()
if (sec<10)strsec = "0"+sec
else strsec = ""+sec
if (min < 10)strmin = "0"+min
else strmin = ""+min
if (hours < 10){
strhour = "0"+hours
}
else strhour = ""+hours
return "["+strhour+":"+strmin+":"+strsec+"]"
}

var sendMsg=()=>{
var val=ti.value
if(val.size>0){
ti.value=''

if(el.list.size>=30){
spr.removeMessageIndex(0,false)
}

var ts=Date.getTimestamp()
var tmStr=createChatTimeInfo(ts)


var el2=new ch.Sprite
el2.paddingTop=15

var delImg=new ch.Bitmap(bmDel)
delImg.y=2
delImg.el1=el2
delImg.buttonMode=true
delImg.on('click',()=>{
el2.list.del(0)
var itemm=this.itemData.txtItem
var p1=el2.list.indexOf(itemm)
if(p1>-1){
//itemm.color=0xffcc00
//itemm.text=' Сообщение удалено'
//p1+=1
p1-=1
//alert(p1)
for (var i = p1; i < el2.list.size; i++) {
var rr=el2.list.pop()
}

var tf2=new ch.Text
tf2.text=' Сообщение удалено'
tf2.bold=true
tf2.fontSize=16
tf2.color=0xffcc00
tf2.buttonMode=true
tf2.on('click',()=>{
alert('mod')
})
el2.add(tf2)

var tf2=new ch.Text
tf2.text=' модератором'
tf2.bold=true
tf2.fontSize=16
tf2.color=0x54eff7
tf2.buttonMode=true
tf2.on('click',()=>{
alert('mod')
})
el2.add(tf2)

spr.update()
//spr.scrollDown()
}
//var r=el.remove(this.itemData.el1)
//spr.update()
//spr.scrollDown()
//alert(this.itemData)
})
el2.add(delImg)

//el2.minHeight=35
var tfTime=new ch.Text
tfTime.bold=true
tfTime.text=' '+tmStr+' '
tfTime.fontSize=16
tfTime.color=0xFFFFFF
el2.add(tfTime)


var img1=new ch.Bitmap(bm1)
img1.scaleX=25/bm1.naturalWidth
img1.scaleY=21/bm1.naturalHeight
//img1.x=2
//img1.y=-4
el2.add(img1)

var tx2=new ch.Text
tx2.bold=true
tx2.text='Администратор'
tx2.fontSize=16
tx2.color=0xffdf52//colors.random()
tx2.buttonMode=true
tx2.on('click',(e)=>{
alert(this)
})
tx2.on('rollover',()=>{
this.alpha=0.7
})
tx2.on('rollout',()=>{
this.alpha=1
})
el2.add(tx2)
delImg.txtItem=null

var splStr=th.smiles.parseStringMsg(val)
//alert(JSON.encode(splStr))
if(splStr!=null){
for (var i = 0; i < splStr.size; i++) {
var ell=splStr[i]
if(ell.type=='text'){
var tx=new ch.Text
tx.bold=true
tx.text=' '+ell.v
tx.fontSize=16
tx.color=0xC9E79F//colors.random()
el2.add(tx)
if(delImg.txtItem==null){
delImg.txtItem=tx
}
}else if(ell.type=='smile'){
var img1=new ch.Bitmap(ell.bm)
//img1.y=-3
el2.add(img1)
}
}
}
spr.append(el2)
//el.add(el2)
//spr.update()
spr.scrollDown()
}
}

stage.on('keyup',(e)=>{
if(e.keyCode==lang.ui.Keyboard.ENTER){
sendMsg()
}
})

sendBut.on('click',()=>{
sendMsg()   
})

stage.on('resize',()=>{
var w=th.stage.stageWidth
var h=th.stage.stageHeight
var tiww=w-60-(sp2.x*2)
ti.width=tiww-4
bg1.painter.clear()
bg1.painter.border(1,0)
bg1.painter.rect(0,0,tiww,tiH,'#FFFFFF')

sendBut.x=tiww+4
sendBut.y=2

sp2.y=h-(tiH+4)
var chatH=h-(tiH+8)
spr.resize(w-5,chatH)

bgm.painter.clear()
bgm.painter.rect(0,0,w,chatH+4,bmChat)

//spr.resize(100,100)
//spr.resize(w-30,spr.h)

})*/
    
}
}
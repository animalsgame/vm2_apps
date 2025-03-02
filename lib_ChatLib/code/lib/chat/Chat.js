class %CURRENT_CLASSNAME% extends lang.display.Sprite{

%CURRENT_CLASSNAME%(cfg){
var th=this
this.ob=lib.chat
this.w=0
this.h=0
this.cntW=0
this.scaleV=1
this.lastWH={w:0,h:0}
this.cntPos={x:0,y:0}
this.curItems=new th.ob.Sprite
this.cnt=new lang.display.Sprite
this.cnt.rendering=false
//this.setBlendColor(0)
addChild(this.cnt)
this.sc=new th.ob.VScrollBar1(this.cnt)
addChild(this.sc)
if(cfg==null)cfg=new th.ob.Config
this.cfg=cfg
this.cnt.scaleX=th.cfg.scale
this.cnt.scaleY=th.cfg.scale
this.sc._scrollColor=cfg.scrollColor
/*Timer.init(20000,()=>{
this.stop()
th.add(th.curItems)
})*/
}

getScaleV(spr){
var par=spr
var v=1
while(par!=null){
v=v*par.scaleX
par=par.parent
}
return v
}

setBlendColor(v){
this.cnt.blendModeColor=v
}

removeMessageIndex(i,isRedraw){
var th=this
if(i>-1){
if(isRedraw==null)isRedraw=true
if(th.curItems!=null){
var arr=th.curItems.list
if(i<arr.size){
var el=arr[i]
arr.del(i)
if(isRedraw==true){
th.update()
}else{
if(el.displayItem!=null){
var hh=el.displayItem.height
if(el.displayItem.parent!=null)el.displayItem.parent.removeChild(el.displayItem)

if(i==0){
th.cntPos.y=th.cntPos.y-hh
for (var i = 0; i < th.cnt.numChildren; i++) {
var ell=th.cnt.getChildAt(i)
if(ell!=null){
ell.y=ell.y-hh
}
}
}else{
th.update()
}
}
}
}
}
}
}

add(o){
var th=this
if(o!=null){
th.curItems.add(o)
th.update()
}
}

append(o){
var th=this
if(o!=null){
th.curItems.add(o)
th.render(o,true)
th.sc.update()
th.checkSz()
//th.update()
}
}

checkSz(){
var th=this
var w=th.w
if(th.sc.visible==true){
w=w-th.cfg.scrollWidth
}
th.cntW=w
var isRender=false
if(th.lastWH.w!=w)isRender=true
if(th.lastWH.h!=h)isRender=true

if(isRender==true){
th.resize(th.w,th.h)
}
}

update(){
var th=this
this.render(this.curItems)
this.sc.update()
this.checkSz()
//this.scrollDown()
}

scrollDown(){
this.sc.update()
this.sc.value=this.sc.maxValue
//alert(this.sc.maxValue)
//this.cnt.scrollTop=this.cnt.scrollHeight
//this.sc.update()
//alert(this.cnt.scrollHeight)
}

render(o,isAppend){
var th=this
if(o!=null){
if(isAppend==true){
th.renderItem(o,th.cnt,th.cntPos,true)
}else{
th.cntPos.x=0
th.cntPos.y=0
th.curItems=o

//var elNums=th.cnt.numChildren

th.cnt.removeAllChilds()
th.renderItem(o,th.cnt)
/*for (var i = 0; i < elNums; i++) {
var el=th.cnt.getChildAt(0)
if(el!=null && el.parent!=null)el.parent.removeChild(el)
}*/

//th.cnt.rendering=true
/*th.cnt2=new lang.display.Sprite
th.renderItem(o,th.cnt2)
th.cnt.addChild(th.cnt2)*/

/*var elNums=th.cnt.numChildren
for (var i = 0; i < elNums; i++) {
var el=th.cnt.getChildAt(i)
if(el!=null && el.parent!=null){
if(el!=th.cnt2){
el.parent.removeChild(el)
}
}
}*/

//var nums=th.cnt.numChildren
//th.renderItem(o,th.cnt)

/*for (var i = 0; i < nums; i++) {
var el=th.cnt.getChildAt(i)
if(el && el.parent)el.parent.removeChild(el)
}*/

}
var scrollV=0
if(th.cntPos.y>th.h)scrollV=(th.cntPos.y+20)-th.h
if(th.sc!=null)th.sc.contentScroll=scrollV
}
}

setPropsItem(disp,o){
var th=this
if(disp!=null){
if(o!=null){
disp.scaleX=o.scaleX*th.cfg.scale
disp.scaleY=o.scaleY*th.cfg.scale
disp.alpha=o.alpha
if('sourceRect' in o){
if(o.sourceRect!=null)disp.sourceRect=o.sourceRect
}
if(o.buttonMode==true)disp.buttonMode=true
if(o is th.ob.Text){
if(o.bold==true)disp.bold=true
//disp.selectable=true
disp.fontName=o.fontName
disp.fontSize=o.fontSize

var clrV=o.color
disp.color=clrV
if(o.filters!=null){
if(o.filters.size>0){
disp.filters=o.filters
}
}
disp.text=o.text

if(clrV is Object){
if('type' in clrV && clrV.type=='linearGradient'){
//var pp=lang.display.Painter.createLinearGradient(clrV.x0,clrV.y0,disp.width*th.scaleV,clrV.y1,clrV.colors,clrV.ratios)
clrV.x1=disp.width*th.scaleV
disp.color=clrV
}
}

}
}
}
}


parseTFSplit(aa3,o,pos,spr){
var th=this
var ratio1=th.scaleV
if(aa3!=null){
for (var k = 0; k < aa3.size; k++) {
var qq=aa3[k]
if(qq.type=='text'){
var tf=new lang.text.TextField
spr.addChild(tf)
th.setPropsItem(tf,o)
tf.text=qq.text
var txtLast=o.text
o.text=qq.text
o.setScale(ratio1,tf)
o.text=txtLast
o.setDisplay(tf)
//pos.y+=10
tf.x=o.x+pos.x
tf.y=o.y+pos.y
//pos.y+=10
pos.x=pos.x+o.x+o.width
}else if(qq.type=='newline'){
if(o.height<=0)o.height=18
pos.x=0
pos.y=pos.y+o.height
//alert(o.text,o.height)
pos.y+=10
}
}
}
}

renderItem(o,spr,pos,isAppend){
var th=this
//if('list' in o)alert(o.list.size)
var ratio1=th.scaleV
if(isAppend==null)isAppend=false
if(pos==null)pos={x:0,y:0}
if(o!=null){
if(o is th.ob.Sprite){
var pp={x:0,y:0}
var hh=0
var sp=new lang.display.Sprite
sp.itemO=o
o.displayItem=sp
spr.addChild(sp)
//th.cnt.addChild(sp)
//alert(th.curItems==o,o)
for (var i = 0; i < o.list.size; i++) {
var el=o.list[i]
/*if(el is th.ob.Text){
alert('Text',i,el.text)
}else{
var sz7=0
if('list' in el)sz7=el.list.size
alert(el,i,sz7,th.curItems==el)
}*/
//if(el!=o)
th.renderItem(el,sp,pp)
var hh2=sp.height
if(hh<hh2)hh=hh2
//if(hh2<o.minHeight)hh=o.minHeight
//pos.y=pos.y+sp.height
//alert(sp.height)
}
sp.x=o.x+pos.x
sp.y=o.y+pos.y+o.paddingTop

o.maxTextHeight=0
//pos.x=o.x+pos.x
//alert(hh,sp.height)
/*if(o.minHeight>0){
if(hh>o.minHeight){
//hh=hh+o.minHeight
//alert(hh-o.minHeight)
}else{
hh=o.minHeight
}
}*/
pos.y=o.y+pos.y+hh+o.paddingTop

if(isAppend==false){
if(th.cntPos.y<pos.y)th.cntPos.y=pos.y
}
//th.cntPos.y=th.cntPos.y+(hh+o.paddingTop)

}else if(o is th.ob.Text){

var tfOrig=new lang.text.TextField
th.setPropsItem(tfOrig,o)
var txtV=o.text
//tfOrig.text=txtV
var txtH=tfOrig.height
if(spr.itemO.maxTextHeight<txtH)spr.itemO.maxTextHeight=txtH
//o.setScale(ratio1,tfOrig)
var maxW=(th.cntW-pos.x)*ratio1
//var tw=tfOrig.width
//if(pos.x+tw>=th.cntW){
//var firstTxtInfo=null
var txtV2=txtV
var fontSz=o.fontSize
//if(maxW<tw)maxW=tw
/*if(maxW>0){
}else{
maxW=th.cntW*ratio1
}*/


//tfOrig.x=maxW
tfOrig.x=pos.x*ratio1
tfOrig.fontSize=fontSz*ratio1


/*if(tfOrig.x>200){
var pp=txtV.indexOf('т')
if(pp==0){
alert(tfOrig.x,th.cntW*ratio1)
}
}*/
/*if(pos.x+o.x+o.width>=th.cntW){
pos.x=0
pos.y=pos.y+o.height
}*/

//alert(txtV)

//var aa3=[]

var aa3=tfOrig.splitTextInfo(txtV,(th.cntW-10)*ratio1)

/*for (var k = 0; k < aa4.size; k++){
aa3.push(aa4[k])
}*/

//alert(1,txtV)
tfOrig.fontSize=fontSz
tfOrig.x=0
//var aa3=[]
/*var aa3=[]
//tfOrig.x=maxW

tfOrig.fontSize=fontSz*ratio1
var aa4=tfOrig.splitTextInfo(txtV,maxW)
tfOrig.fontSize=fontSz

if(aa4!=null){
if(aa4.size>0){
var r5=aa4[0]
if(r5.type=='text'){
aa3.push(r5)
if(aa4.size>1)aa3.push(aa4[1])
txtV=txtV.cut(r5.text.size)
}
aa4=tfOrig.splitTextInfo(txtV,th.cntW*ratio1)
for (var k = 0; k < aa4.size; k++) {
aa3.push(aa4[k])
}

}
}*/

/*if(aa4!=null){
if(aa4.size>1){
var r5=aa4[0]
if(r5.type=='text'){
aa3.push(r5)
}

//aa4=tfOrig.splitTextInfo(txtV,th.cntW*ratio1)
for (var k = 1; k < aa4.size; k++) {
aa3.push(aa4[k])
}

}
}*/

/*if(maxW>0){
tfOrig.fontSize=fontSz*ratio1
var aa3=tfOrig.splitTextInfo(txtV,maxW)
tfOrig.fontSize=fontSz
//alert(JSON.encode(aa3))
if(aa3!=null){
if(aa3.size>0){
firstTxtInfo=aa3[0]
if(firstTxtInfo.type=='text'){
txtV2=txtV2.cut(firstTxtInfo.text.size)
var txtLast=o.text
o.text=firstTxtInfo.text
var tf=new lang.text.TextField
spr.addChild(tf)
th.setPropsItem(tf,o)
tf.text=firstTxtInfo.text
o.setScale(ratio1,tf)
o.text=txtLast
o.setDisplay(tf)

tf.x=o.x+pos.x
tf.y=o.y+pos.y
pos.x=0
pos.y=pos.y+o.height
}
}
}
}else{
pos.x=0
//alert('v2',txtV2,pos.y,o.height)
pos.y=pos.y+tfOrig.height
}*/

//alert(JSON.encode(firstTxtInfo))
/*tfOrig.fontSize=fontSz*ratio1
aa3=tfOrig.splitTextInfo(txtV2,th.cntW*ratio1)
tfOrig.fontSize=fontSz*/
//aa3=tfOrig.splitTextInfo(txtV2,th.cntW)
//alert(JSON.encode(aa3))
//aa3=[]

//th.parseTFSplit(aa3,o,pos,spr)

if(o.height<=0)o.height=18
pos.x=pos.x+o.x

for (var k = 0; k < aa3.size; k++) {
var qq=aa3[k]
if(qq.type=='text'){
var tf=new lang.text.TextField
spr.addChild(tf)
th.setPropsItem(tf,o)
tf.text=qq.text
tf.textVal=txtV
var txtLast=o.text
o.text=qq.text
o.setScale(ratio1,tf)
o.text=txtLast
o.setDisplay(tf)
/*if(qq.text=='и'){
alert(o.width,JSON.encode(aa3),o.x)
}*/
/*if(k==0){
if(pos.x+o.x+o.width>=th.cntW){
pos.x=0
pos.y=pos.y+o.height+10
k+=1
}
}*/
tf.x=pos.x
tf.y=pos.y+o.y
/*tf.x=o.x+pos.x
tf.y=o.y+pos.y*/
//pos.y+=10
//pos.x=pos.x+o.x+o.width
pos.x=pos.x+o.width
}else if(qq.type=='newline'){
//if(o.height<=0)o.height=18
pos.x=0
pos.y=pos.y+o.height+10
//alert(o.text,o.height)
}
}
/*}else{
//tfOrig.fontSize=o.fontSize*ratio1
//tfOrig.scaleX=1/ratio1
//tfOrig.scaleY=1/ratio1
//tfOrig.noScale=true
//tfOrig.text=''
//tfOrig.text=o.text
spr.addChild(tfOrig)
o.setScale(ratio1,tfOrig)
o.setDisplay(tfOrig)

//var ratio=th.getScaleV(tfOrig)

//alert(o.width)
tfOrig.x=o.x+pos.x
tfOrig.y=o.y+pos.y
pos.x=pos.x+o.x+o.width
//pos.x=pos.x+o.x+(o.width/ratio1)
}*/

}else if(o is th.ob.Bitmap){
var bm=new lang.display.Bitmap
bm.src=o.src
th.setPropsItem(bm,o)
o.setDisplay(bm)
spr.addChild(bm)
var bmW=o.width*o.scaleX
var bmH=o.height*o.scaleY
if(pos.x+o.x+bmW>=th.cntW){
pos.x=0
pos.y=pos.y+o.y+bmH
}

var yy2=o.y
if('itemO' in spr){
var txtH1=spr.itemO.maxTextHeight
if(txtH1>0){
yy2=yy2-(bmH-txtH1)
//alert(txtH1,bmH)
}
}
//alert(yy2,pos.y)
bm.x=o.x+pos.x
bm.y=yy2+pos.y

pos.x=pos.x+o.x+bmW
}

}
}

resize(w,h){
var th=this

th.w=w
th.h=h

var ratio=th.getScaleV(th)
th.scaleV=ratio

var scrollW=this.cfg.scrollWidth
var origW=th.w
var origH=th.h
var isRender=false
var isRenderW=false

if(th.sc.visible==true){
w=w-(scrollW+10)
}

//alert(w)

w=w/th.cfg.scale
///th.scaleV
h=h/th.cfg.scale
///th.scaleV

th.cntW=w
if(th.lastWH.w!=w){
isRender=true
isRenderW=true
}
if(th.lastWH.h!=h)isRender=true
th.lastWH.w=w
th.lastWH.h=h
th.cnt.width=w
th.cnt.height=h

th.cnt.scroll=true
if(isRender==true){
//th.chtW=th.cntW/ratio
th.sc.value=0
//th.sc.scaleTarget=th.scaleV
th.sc.resize(scrollW,origH)
th.sc.x=origW-scrollW
th.sc.update()
if(isRenderW==true){
//alert(8)
th.update()
}
}
}

}
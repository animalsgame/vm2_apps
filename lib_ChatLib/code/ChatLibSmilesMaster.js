class %CURRENT_CLASSNAME%{

%CURRENT_CLASSNAME%(){
this.arr=[]
this.obj={}
this.objNames={}
this.smilesPath='https://ag6.ru/images/smiles'
this.str1=''
this.regexp=null
this.smilesRegexStrArr=[]
this.smilesRegexp1=/[[\]{}()*+?.,\\^$|#\s]/g
this.maxSmilesV=5
this.smilesCacheV='645745859'
this.spr2=new lang.display.Sprite
this.curSmileSprOver=null
addSmile(":-)", "smile3.gif")
addSmile(":-(", "sad.gif")
addSmile("*angel*", "angel.gif")
addSmile("*crazy*", "crazy.gif")
addSmile(":-[", "blush2.gif")
addSmile(":D", "big.gif")

addSmile("*kissing*", "kiss3.gif")
addSmile("*yahoo*", "yahoo.gif")
addSmile(":-*", "kiss2.gif")
addSmile("*cray*", "cray.gif")
addSmile("*rose*", "give_rose.gif")
addSmile("*rofl*", "rofl.gif")

addSmile("*dance*", "dance4.gif")
addSmile("*good*", "good.gif")
addSmile("*clapping*", "clapping.gif")
addSmile("*bee*", "beee.gif")
addSmile(":-P", "blum3.gif")
//addSmile("*serdca*", "serdca.gif")

addSmile("*music*", "music.gif")
addSmile("*girl_crazy*", "girl_crazy.gif")
addSmile("*diablo*", "diablo.gif")

//addSmile("*face1*", "biggrin.gif")
//addSmile("*girl_yahoo*", "girl_yahoo.gif")
addSmile("*girl_blum*", "girl_blum.gif")
addSmile(":-X", "secret.gif")
addSmile("*read*", "read.gif")
addSmile("*igra*", "gamer4.gif")
addSmile("8-)", "dirol.gif")
addSmile("*sorry*", "sorry.gif")
addSmile("*dash*", "dash1.gif")
addSmile("*help*", "help.gif")
addSmile("*admin*", "punish.gif")
//addSmile("*girl_witch*", "girl_witch.gif")
addSmile("*wink*", "wink.gif")
//addSmile("*serdca*", "serdca.gif")
//addSmile("*heart*", "heart.gif")
//addSmile("*wacko2*", "wacko3.gif")
//addSmile("*girl_wacko*", "girl_wacko.gif")

var str2=this.smilesRegexStrArr.join('|')
//alert(str2)
this.regexp=new RegExp(str2,'gi')
this.smilesRegexStrArr=[]

this.isSmiles=false
var s3='Привет :-)'
var p4=s3.indexOf(':-)')
if(p4==7)this.isSmiles=true
/*var s3='Привет :-) тест :-['

alert(s3.indexOf(':-)'))*/

//var s2=this.parseStringMsg('Привет :-) :-) *angel* тест :-[')
//var s2=this.parseStringMsg('5:-)8')
//alert(JSON.encode(s2))
//alert(s2)
//alert(str2)
}

addSmile(name,v){
var th=this
var idd=this.arr.size+1
var o={name:name,v:v,id:idd}
this.arr.push(o)
this.obj[idd]=o
this.objNames[name]=o
//var url=this.smilesPath+'/preload/'+v+'?rnd='+th.smilesCacheV
var url2=this.smilesPath+'/'+v+'?rnd='+th.smilesCacheV
var nm=name
var bmm=new lang.display.Bitmap
bmm.position='relative'
bmm.src=url2
bmm.el=o
o.bm=bmm
//var rr=/[[\]{}()*+?.,\\^$|#\s]/g
//var a=[]
var ob={}
var aa2=[]

nm=nm.replace(this.smilesRegexp1,'\\$&')

/*var a=this.smilesRegexp1.match(name)
if(a!=null){
for (var i = 0; i < a.size; i++) {
var el=a[i]
for (var k = 0; k < el.size; k++) {
var el2=el[k]
aa2.push(el2)
}
}
}

for (var i = 0; i < aa2.size; i++) {
var vv=aa2[i]
if(vv in ob){
}else{
ob[vv]=1
nm=nm.replaceAll(vv,'\\'+vv)
}
}*/


//alert(a)
/*while(a!=null){
a=rr.exec(name)
if(a!=null){
var vv=a[0]
if(vv in ob){
}else{
ob[vv]=1
nm=nm.replaceAll(vv,'\\'+vv)
}
}
}*/
this.smilesRegexStrArr.push(nm)
}

getSmileValueByID(id){
if(id in this.obj){
var o=this.obj[id]
return o.name
}
return ''   
}

cutStringSmiles(s){
if(this.regexp!=null){
//var a=[]
var nums=0
var s1=s

var a=this.regexp.match(s)
if(a!=null){
for (var i = 0; i < a.size; i++) {
var aa=a[i]
var m=aa[0]
if(m in this.objNames){
var ob=this.objNames[m]
if(nums>=this.maxSmilesV)s=s.replace(m,'')
}
nums+=1
}

}
/*while(a!=null){
a=this.regexp.exec(s1)
if(a!=null){
var m=a[0]
if(m in this.objNames){
var ob=this.objNames[m]
if(nums>=this.maxSmilesV)s=s.replace(m,'')
}
nums+=1
}
}*/
}
return s
}



parseStringMsg(s){
var th=this
/*if(this.regexp!=null){
var nums=0
var s1=s
var a=this.regexp.match(s1)
if(a!=null){
var m=a[0]
if(m in this.objNames){
var ob=this.objNames[m]
if(nums<this.maxSmilesV){
//s=s.replace(m,'<img src="'+this.smilesPath+'/'+ob.v+'" class="noSelect">')
}else{
}
}
nums+=1
}
}*/
var aa=[]
if(th.isSmiles==false){
aa.push({type:'text',v:s})
return aa
}

if(this.regexp!=null){
var nums=0
var s1=s

//var r2 = /(\*angel\*|\*crazy\*|\*help\*|\*kissing\*|\*дружба\*|\*yahoo\*|\*cray\*|\*rose\*|\*rofl\*|\*dance\*|\*sorry\*|\*igra\*|\*mamba\*|\*ok\*|\*плакса\*|\*dash\*|\*pardon\*|\*airkiss\*|\*wacko\*|\*good\*|\*clapping\*|\*bee\*|\*music\*|\*girl_crazy\*|\*diablo\*|\*stratch\*|\*serdca\*|\*mosking\*)|(:D|;D)|(:-\)|:-\()|(:-\[)|(:-\*)|(:\-P)|(8-\))|(:\-X)/g
//alert(r2.match(s1))
var spl=s1.split(this.regexp)
var nn=0
if(spl!=null){
for (var i = 0; i < spl.size; i++) {
var el=spl[i]
var rr=true
var obb={type:'text',v:el}
if(el in th.objNames){
if(nn<th.maxSmilesV){
var ob=th.objNames[el]
obb.type='smile'
obb.bm=ob.bm
nn+=1
}else{
rr=false
}
}
if(rr==true)aa.push(obb)
}
}


//alert(JSON.encode(aa))
//r2.test('a')
//trace(s1,s1.split(r2.r))
/*var a=r2.match(s1)
var obb={}
var aa2=[]
if(a!=null){
for (var i = 0; i < a.size; i++) {
var el=a[i]
for (var k = 0; k < el.size; k++) {
var el2=el[k]
if(el2!=null){
if(el2.size>0){
if(el2 in obb){
}else{
obb[el2]=1
var p2=s1.indexOf(el2)
aa2.push(el2)
}
}
}
}
}
}*/

/*for (var i = 0; i < aa2.size; i++) {
var el=aa2[i]
var spl=s1.split(el)
//s1=spl.join(',')
alert(JSON.encode(spl))
}*/

//alert(aa2)

}

/*var isSmiles=true

for (var i = 0; i < this.arr.size; i++) {
var el=this.arr[i]
var spl=s.split(el.name)
if(isSmiles==true){
s=spl.join('<img src="'+this.smilesPath+'/'+el.v+'?rnd='+this.smilesCacheV+'" />')   
}else{
s=spl.join('*smile*')
}
}*/
return aa
}


}
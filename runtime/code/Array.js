class Array{
Array(){
}

swap(i,j){
var temp=this[i]
var a=this[j]
this[i]=a
this[j]=temp
}

each(cb){
for(var i=0; i<this.size; i++){
cb(this[i])
}
}

eachPage(v,maxRows){
var th=this
var a=[]
if(v<=0)v=1
var pos=(v-1)*maxRows
for (var i=0; i < maxRows; i++) {
var pp=pos+i
if(pp<th.size){
var ob=th[pp]
a.push(ob)
}
}
return a
}

native push(o){}
native join(delim){}
native cut(start,end){}
native sort(o){}
native slice(start,end){}
native fill(v,start,end){}
native concat(){}

native shift(){}
native unshift(){}
native pop(){}
native from(o){}

//native reverse(){}

/*shift(){
if(this.size>0){
var v=this[0]
this.cut(0,1)
return v
}
return null
}

pop(){
if(this.size>0){
var pp=this.size-1
var v=this[pp]
this.cut(pp,1)
return v
}
return null
}*/

del(v){
this.cut(v,1)
//VM.callNative('delArray',this,'y',v)
}




eachTime(time,cb,endcb){
if(cb!=null){
var o=this
var pos=0
Timer.init(time,()=>{
if(pos<o.size){
var el=o[pos]
cb(el)
++pos
}else{
if(endcb!=null)endcb()
this.stop()
}
})
}
}


dup(v){
if(v>0){
var a=this.slice()
for (var i = 0; i < v; i++)this.unshift.apply(this,a)
}
/*var ar=this
var sz=this.size
var rr=null
if(v>0){
for (var i = 0; i < v; i++) {
for (var k = 0; k < sz; k++)ar.push(ar[k])
}
}*/
}

eachQuery(cb){
var a=[]
var rr=null
if(cb!=null){
for (var i = 0; i < this.size; i++){
var el=this[i]
var r=cb(el)
if(r)rr=a.push(el)
}
}
return a
}


findOne(cb){
if(cb!=null){
for (var i = 0; i < this.size; i++){
var el=this[i]
var r=cb(el)
if(r)return el
}
}
return null
}

// isOne - ≈сли указано true, то будет удалено первое совпадение
removeIf(cb,isOne){
isOne=isOne||false
if(cb!=null){
var nums=[]
for (var i = 0; i < this.size; i++){
var r=cb(this[i])
if(r){
if(isOne==true){
this.del(i)
}else nums.push(i)
}
}

for(var i=0;i<nums.size;i++){
var index=nums[i]-i
this.del(index)
}
}
}



random(){
if(this is Array && this.size>0){
var vv=Math.floor(Math.random()*this.size)
return this[vv]
}
return null
}

shuffle(){
var th=this
for (var i=th.size-1; i > 0; i--){
var vv=th[i]
var rnd=Math.random()*(i+1)
var j=Math.floor(rnd)
var x=th[i]
th[i]=th[j]
th[j]=x
}
/*for(i=th.size;i;i--){
var j=Math.randomInt(i)
var x=th[i-1]
th[i-1]=th[j]
th[j]=x
}*/
}


indexOf(o){
for(var i=0;i<this.size;i++){
var ob=this[i]
if(ob==o)return i
}
return -1
}

}
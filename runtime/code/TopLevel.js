class %CURRENT_CLASSNAME% extends lang.display.Sprite{

%CURRENT_CLASSNAME%(){
}
}

class Class{
Class(){

}
}

class Uint8Array{
Uint8Array(){}
native clear(){}
native clone(){}
}

class String{
	String(){
		
	}
	
	native toLowerCase(){}
	native toUpperCase(){}
	
	native split(delim){}
	
	native indexOf(s){}
	native cut(start,end){}
	native fromCharCode(arr){}
	native fromCodePoint(arr){}
	native codePointAt(pos){}
	
	replaceAll(spl,v){
	var q=this.split(spl)
	q=q.join(v)
	return q
	}
	
}


class Function extends Object{

native call(obj,args){}
native apply(obj,args){}
native bind(obj){}

toString(){
return 'Функция'
}

}

class Boolean extends Object{
Boolean(){}
}

class int extends Object{
int(){}
}

class JSON {

static native encode(s){}
static native decode(o){}


}

class JSUtils{

static native loadScript(a,cb){}
static native callMethod(... args){}
}

class LogClass{
LogClass(){
}

static native trace(){}
static native alert(){}

}

class Number extends Object{

toString(){
return this;
}

}


class Object{
	
Object(args){
	/*if(args!=null){
		for(var i=0;i<args.size;i++){
			var ob=args[i]
			var k=ob[0]
			this[k]=ob[1]
		}
	}*/
}

/*del(k){
VM.callNative('delPropObject',this,k)
}*/

native defineProperties(o,props){}

defineProperty(o,prop,props){
if(o!=null){
var ob2={}
if(props!=null)ob2[prop]=props
Object.defineProperties(o,ob2)
}
}

static clone(o){
if(o is Array){
var a=[]
for (var i = 0; i < o.size; i++) {
var v=clone(o[i])
a.push(v)
}
o=a
}else if(o is Object){
var ob={}
for(var n in o){
var v=clone(o[n])
ob[n]=v
}
o=ob
}
return o
}

static copyProps(a,b){
for(var n in b)a[n]=b[n]
}

static assign(o){
var sz=arguments.size
if(sz>0){
for (var i = 1; i < sz; i++) {
var b=arguments[i]
for(var n in b)o[n]=b[n]
}
}
}

static keys(o){
var a=[]
if(o!=null){
for(var n in o)a.push(n)   
}
return a
}

static values(o){
var a=[]
if(o!=null){
for(var n in o)a.push(o[n])   
}
return a
}

static entries(o){
var a=[]
if(o!=null){
for(var n in o){
var vv=o[n]
a.push([n,vv])
}
}
return a
}
	
}
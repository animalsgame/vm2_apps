class URL{
URL(){
}

native get(link,cb){}
native binaryGet(link,cb){}
native binaryPost(link,o,cb){}
native post(link,o,cb){}
native getJSONP(link,cb){}

static native createURL(v,type){}
static native removeURL(v){}


static parseGETParams(url){
var o={}
if(url!=null){
var p1=url.indexOf('?')
var q=url
if(p1>-1){
q=url.cut(p1+1)
var spl=q.split('&')
if(spl.size>0){
for (var i = 0; i < spl.size; i++) {
var el=spl.at(i)
var q1=el.split('=')
o.put(q1[0],q1[1])
}
}
}
}
return o
}

}
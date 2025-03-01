class Body{
	
Body(bodyDef){
this.bodyDef=bodyDef
this.isSensor=false
this.defList=[]
this.massData=null
}

addBodyDef(o){
if(o!=null){
this.defList.push(o)
}
}

native GetLinearVelocity(){}
native SetLinearVelocity(vec){}
native ApplyForce(vec,center){}
native SetPosition(vec,center){}
native GetLocalCenter(){}
native GetPosition(){}
}
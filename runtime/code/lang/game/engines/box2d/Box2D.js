class Box2D extends lang.events.EventDispatcher{
	
Box2D(){
this.items=[]
this.jointsList=[]
this.step=0
this.gravity=null
this.scale=30
this.allowSleep=false
this.velocityIterations=10
this.positionIterations=10
this.box2d=lang.game.engines.box2d
}


init(_gravity,step,allowSleep){
this.gravity=_gravity
this.step=step
this.allowSleep=allowSleep
}

add(o){
var body=new this.box2d.Body(o)
body.isSensor=o.isSensor
this.items.push(body)
return body
}

addJoint(o){
this.jointsList.push(o)
return o
}

native start(){}
native destroy(){}
native remove(o){}
native update(){}
native setDebug(v){}
native clear(){}
native RayCastOne(orig,pos){}
native RayCast(orig,pos){}
native QueryPoint(pos){}
}
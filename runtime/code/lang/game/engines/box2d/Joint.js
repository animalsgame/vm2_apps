class Joint{
	
Joint(type){
this.type=type
this.lowerTranslation=0
this.upperTranslation=0
this.lowerAngle=0
this.upperAngle=0
this.maxMotorTorque=0
this.motorSpeed=0
this.enableMotor=false
this.enableLimit=false
}

native init(){}
}
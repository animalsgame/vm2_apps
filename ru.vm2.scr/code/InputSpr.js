class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(){
var th=this
th.tf=text('')
th.ti=new lang.text.TextInput
th.ti.on('input',()=>{
th.tf.text=th.ti.value
th.updText()
})
addChild(th.ti)
th.setSize(16)
}

setSize(v){
var th=this
var val=16+(v-4)
th.tf.fontSize=val
th.ti.fontSize=val
}

setColor(v){
this.ti.color=v
}

setText(v){
var th=this
th.ti.value=v
th.tf.text=v
th.updText()
}

updText(){
var th=this
var ww=Math.max(100,th.tf.width)
var hh=Math.max(20,th.tf.height)
var allW=$app.stageScale.w
if(ww>allW)ww=allW
th.ti.width=ww
th.ti.height=hh
}

}
class Graphics{
Graphics(w,h){
this.w=w
this.h=h
}

native beginGradientFill(type,colors,alphas,ratios,matrix){}

native translate(x,y){}
native scale(x,y){}

native setTarget(spr){}
native drawCircle(x,y,radius){}
native drawRect(x,y,w,h){}
native drawRoundRect(x,y,w,h,elw,elh){}
native drawEllipse(x,y,w,h){}
native lineStyle(_thickness,_color){}
native moveTo(x,y){}
native lineTo(x,y){}
native curveTo(controlX,controlY,anchorX,anchorY){}
native cubiqCurveTo(x1,y1,x2,y2,x3,y3){}
native beginFill(color,alpha){}
native endFill(){}
native render(){}
native paint(){}
native clear(){}

}
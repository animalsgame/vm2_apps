class TextField extends lang.display.DisplayObject{

TextField(){
}

static native splitTextInfo(s,maxW){}
native getTextInfoByWidth(startPos,w){}
native getTextSizeByPos(start,end){}
native setSelection(start,end){}
native getLineMetrics(index){}
native getCharIndexAtPoint(x,y){}
native getLineIndexAtPoint(x,y){}
native getCharRect(index){}
native getLineRect(index){}
native getLineText(line){}
native appendText(s){}
}

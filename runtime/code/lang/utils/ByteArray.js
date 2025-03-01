class ByteArray{

ByteArray(){}

/*private native _callRetMethod(t){}
private native _callVoidMethod(t,v){}
writeByte(v){this._callVoidMethod(1,v)}
writeInt(v){this._callVoidMethod(2,v)}
writeShort(v){this._callVoidMethod(3,v)}
writeBoolean(v){this._callVoidMethod(4,v)}
writeNumber(v){this._callVoidMethod(5,v)}
writeString(v){this._callVoidMethod(6,v)}
writeObject(v){this._callVoidMethod(7,v)}

readByte(){return this._callRetMethod(1)}
readInt(){return this._callRetMethod(2)}
readShort(){return this._callRetMethod(3)}
readBoolean(){return this._callRetMethod(4)}
readNumber(){return this._callRetMethod(5)}
readString(){return this._callRetMethod(6)}
readObject(){return this._callRetMethod(7)}

*/

native writeByte(v){}
native writeInt(v){}
native writeInt64(v){}
native writeShort(v){}
native writeBoolean(v){}
native writeNumber(v){}
native writeDouble(v){}
native writeFloat(v){}
native writeString(v){}
native writeObject(v){}
native readByte(){}
native readInt(){}
native readInt64(){}
native readShort(){}
native readBoolean(){}
native readNumber(){}
native readDouble(){}
native readFloat(){}
native readString(){}
native readObject(){}

native writeUTFBytes(s){}
native writeBytes(ba,offset,length){}
native cut(length){}

native readBytes(ba,offset,length){}

native readUTFBytes(sz){}
native compress(){}
native uncompress(){}

/*get size(){
return this._callRetMethod(10)
}

set position(v){
this._callVoidMethod(8,v)
}

get position(){
return this._callRetMethod(8)
}

get available(){
return this._callRetMethod(9)
}*/

native clone(){}

native clear(){
if(this.size>0)this.cut(this.size)
}

}
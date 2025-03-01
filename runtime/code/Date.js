class Date {

Date(a){
//trace('new Date class',a);
}

static native now(){}

static getTimestamp(){
var tm=Date.now()
var v=Math.floor(tm/1000)
return v
}

native setTime(v){}
native getTime(){}
native getFullYear(){} // Получить год (из 4 цифр)
native getMonth(){} // Получить месяц, от 0 до 11.
native getDate(){} // Получить число месяца, от 1 до 31.

native getHours(){}
native getMinutes(){}
native getSeconds(){}
native getMilliseconds(){}
}
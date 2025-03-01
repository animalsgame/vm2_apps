class SocketIO extends lang.events.EventDispatcher{

SocketIO(){
}

native connect(host,port){}
native send(o){}
}
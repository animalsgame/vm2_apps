class Socket extends lang.events.EventDispatcher{

Socket(){
}

native connect(host,port){}
native send(o){}
native close(){}
}
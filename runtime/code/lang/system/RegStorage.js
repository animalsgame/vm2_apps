class %CURRENT_CLASSNAME%{

static get DATA(){return 'DATA';}
static get SELECT(){return 1;}
static get LIST(){return 2;}
static get INSERT(){return 3;}
static get DELETE(){return 4;}

static get KEY(){return 1;}
static get VALUE(){return 2;}

%CURRENT_CLASSNAME%(){
}

native query(path,t,arg1,arg2,arg3,arg4){}

}
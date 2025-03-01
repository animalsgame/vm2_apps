class %CURRENT_CLASSNAME%{

constructor(){
}

static(){
this.borderColorV=0xB23067//0xff8500
this.headerBG=0xB23067
this.uploadURL='https://ag6.ru/mainApi.php?c=service.uploadSS'
this.colorpickerObj=null

this.itemsArr=[
{type:'select',name:'выделение / перемещение',icon:'resize1'},
{type:'pencil',name:'карандаш',icon:'pencil'},
{type:'eraser',name:'ластик - стирает карандаш',icon:'eraser'},
{type:'text',name:'текст',icon:'text'},
{type:'rect',name:'обводка',icon:'rectangle'},
{type:'rectfill',name:'прямоугольник',icon:'rectanglefill'}
]

}

}
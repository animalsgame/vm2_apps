class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(ob){
this.assetsObj={}
this.appObj=ob
}

init(){
var th=this

var def1={width:40,height:40}

var colorBut='#54DEF0'
//['#54DEF0','#03899C']

th.reg('icons/photo1','<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9C3 7.89543 3.89543 7 5 7H6.5C7.12951 7 7.72229 6.70361 8.1 6.2L9.15 4.8C9.52771 4.29639 10.1205 4 10.75 4H13.25C13.8795 4 14.4723 4.29639 14.85 4.8L15.9 6.2C16.2777 6.70361 16.8705 7 17.5 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V9Z" stroke="'+colorBut+'" stroke-width="2"/><circle cx="12" cy="13" r="4" stroke="'+colorBut+'" stroke-width="2"/></svg>',{width:24,height:24})

th.reg('icons/play','<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle stroke="#000000" stroke-opacity="0.5" stroke-width="2" cx="12" cy="12" r="10" style="fill:'+colorBut+'"></circle><path d="M14.75,12.83,11.55,15A1,1,0,0,1,10,14.13V9.87A1,1,0,0,1,11.55,9l3.2,2.13A1,1,0,0,1,14.75,12.83Z" style="fill:#000000;"></path></svg>',def1)

th.reg('icons/pause','<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#000000" stroke-opacity="0.5" stroke-width="2" d="M11.9707 22C17.4936 22 21.9707 17.5228 21.9707 12C21.9707 6.47715 17.4936 2 11.9707 2C6.44786 2 1.9707 6.47715 1.9707 12C1.9707 17.5228 6.44786 22 11.9707 22Z" fill="'+colorBut+'"/><path d="M10.72 15.0298V8.9698C10.72 8.4898 10.52 8.2998 10.01 8.2998H8.71C8.2 8.2998 8 8.4898 8 8.9698V15.0298C8 15.5098 8.2 15.6998 8.71 15.6998H10C10.52 15.6998 10.72 15.5098 10.72 15.0298Z" fill="#292D32"/><path d="M15.9991 15.0298V8.9698C15.9991 8.4898 15.7991 8.2998 15.2891 8.2998H13.9991C13.4891 8.2998 13.2891 8.4898 13.2891 8.9698V15.0298C13.2891 15.5098 13.4891 15.6998 13.9991 15.6998H15.2891C15.7991 15.6998 15.9991 15.5098 15.9991 15.0298Z" fill="#292D32"/></svg>',def1)

th.reg('icons/sound','<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.36,19.36a1,1,0,0,1-.7-.29,1,1,0,0,1,0-1.41,8,8,0,0,0,0-11.32,1,1,0,0,1,1.41-1.41,10,10,0,0,1,0,14.14A1,1,0,0,1,18.36,19.36Z" style="fill:'+colorBut+'"></path><path d="M15.54,16.54a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41,4,4,0,0,0,0-5.66,1,1,0,0,1,1.41-1.41,6,6,0,0,1,0,8.48A1,1,0,0,1,15.54,16.54Z" style="fill:'+colorBut+'"></path><path d="M11.38,4.08a1,1,0,0,0-1.09.21L6.59,8H4a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H6.59l3.7,3.71A1,1,0,0,0,11,20a.84.84,0,0,0,.38-.08A1,1,0,0,0,12,19V5A1,1,0,0,0,11.38,4.08Z" style="fill:'+colorBut+'"></path></svg>',{width:24,height:24})

th.reg('icons/fs','<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 2C2.89543 2 2 2.89543 2 4V8C2 8.55228 2.44772 9 3 9C3.55228 9 4 8.55228 4 8V4H8C8.55228 4 9 3.55228 9 3C9 2.44772 8.55228 2 8 2H4Z" fill="'+colorBut+'"/><path d="M20 2C21.1046 2 22 2.89543 22 4V8C22 8.55228 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V4H16C15.4477 4 15 3.55228 15 3C15 2.44772 15.4477 2 16 2H20Z" fill="'+colorBut+'"/><path d="M20 22C21.1046 22 22 21.1046 22 20V16C22 15.4477 21.5523 15 21 15C20.4477 15 20 15.4477 20 16V20H16C15.4477 20 15 20.4477 15 21C15 21.5523 15.4477 22 16 22H20Z" fill="'+colorBut+'"/><path d="M2 20C2 21.1046 2.89543 22 4 22H8C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20H4V16C4 15.4477 3.55228 15 3 15C2.44772 15 2 15.4477 2 16V20Z" fill="'+colorBut+'"/></svg>',{width:24,height:24})

th.reg('icons/soundMute','<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.38,4.08a1,1,0,0,0-1.09.21L6.59,8H4a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H6.59l3.7,3.71A1,1,0,0,0,11,20a.84.84,0,0,0,.38-.08A1,1,0,0,0,12,19V5A1,1,0,0,0,11.38,4.08Z" style="fill:'+colorBut+'"></path><path d="M16,15.5a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l5-5a1,1,0,0,1,1.42,1.42l-5,5A1,1,0,0,1,16,15.5Z" style="fill:#FF9100"></path><path d="M21,15.5a1,1,0,0,1-.71-.29l-5-5a1,1,0,0,1,1.42-1.42l5,5a1,1,0,0,1,0,1.42A1,1,0,0,1,21,15.5Z" style="fill:#FF9100"></path></svg>',{width:24,height:24})

}

getBitmap(path){
var th=this
var bm=null
if(path && path in th.assetsObj){
var ob=th.assetsObj[path]
//var koefV=th.win.panelH/th.win.panelHStart
var scaleSize={width:0,height:0}
var resolution=th.stage.devicePixelRatio
if('width' in ob)scaleSize.width=ob.width*resolution
if('height' in ob)scaleSize.height=ob.height*resolution
bm=new lang.display.Bitmap
bm.resolution=resolution
bm.scaleSize=scaleSize
bm.src=ob.data
}
if(bm){
bm.on('rollover',()=>{
if(th.appObj)th.appObj.isPanelOver=true
})
}
return bm
}

reg(path,data,obj){
var th=this
if(path && data){
var ob={data:data}
if(obj){
if('width' in obj && obj.width>0)ob.width=obj.width
if('height' in obj && obj.height>0)ob.height=obj.height
}
th.assetsObj[path]=ob
}
}

}
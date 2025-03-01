class %CURRENT_CLASSNAME%{

constructor(){
}

static(){
this.romsList=[]
}

static init(){
var th=this
var addRom=(title,rom)=>{
var romName=rom+'.nes'
var urlV=$app.domainV+'/'+$app.pathURL+'/'+romName
var ver=1
var imgURL=$app.domainV+'/'+$app.pathURL+'/'+rom+'.png?v='+ver
imgURL=imgURL.replace('_Rus','')
var path='nes/'+romName
th.romsList.push({name:title,url:urlV,img:imgURL,path:path,rom:romName})
}

addRom('Чип и Дейл','Chip_n_Dale_Rescue_Rangers_Rus')
addRom('Чип и Дейл Ломакс атакует','Chip_n_Dale_Lomax_Attacks')
addRom('Чип и Дейл 2','Chip_n_Dale_Rescue_Rangers_2_Rus')
addRom('Чёрный плащ','Darkwing_Duck_Rus')
addRom('Кот Феликс','Felix_the_Cat_Rus')
addRom('Том и Джерри','Tom_and_Jerry_Rus')
addRom('Бои на воздушных шарах','Balloon_Fight')
addRom('Танчики','Battle_City')
addRom('Контра','Contra')
addRom('Утиные истории 2','Duck_Tales_2_Rus')
addRom('Приключения Кирби','Kirby_s_Adventure_Rus')
addRom('Золотоискатель','Lode_Runner')
addRom('Приключения мышат','Mickey_Mouse')
addRom('Микки и цифры','Mickey_s_Adventures_in_Numberland')
addRom('Алфавит и Микки Маус','Mickey_s_Safari_in_Letterland')
addRom('Марио','Super_Mario_Bros')
addRom('Кролик и друзья спешат на помощь','Tiny_Toon_Adventures_Rus')
addRom('Кролик и друзья спешат на помощь 2','Tiny_Toon_Adventures_2')
addRom('Паника в ресторане','Panic_Restaurant')
addRom('Трёхглазый мальчик','Mitsume_ga_Tooru_Rus')
addRom('Безумные гонки','Wacky_Races_Rus')
}

}
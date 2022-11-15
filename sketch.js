

var canvas;
var p=[], Y=0
var m = [],mons,mL=[], buls = [], bulsD=[]
var r = 1
var dx=[],dy=[]
var score=0
var indexX=1,indexY=1,indexL=0
var qdm = 1, Round = 0, nl=1,Boss=0,X=-1
var database, gameState=-2;
var form, player, playerCount=0
var allPlayers,allMonsters, allBullets
var round
var pi
var monsterIndex, indexm=0
var mpy=[0,0,0],mpx=[0,0,0]
var d=1, tdd=500, vdb=2
var posix=0, posiy=0
var pC, gco=[], info1, info2, info3
var plca
var xx,yy
var pX,pY,lf,clr,bD,w,h
var P=1
var TPIB=0
var ba=0

//GameState : -2=Espera por jogadores; -1=PERDEU; 0=pause; 1=start
function preload() {
  
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
console.log(buls)
  
  if(gameState==-2){form.message();game.colora(playerCount)}
  background(200,200,200);
if(gameState==-2&&(form.prontos!=undefined && form.jogadores!=undefined)&&form.prontos===form.jogadores){game.update(0)}
  /*var monx = database.ref("monsters/monster"+a+"/positionX");monx.on("value",data=>{pX=data.val();});
    var mony = database.ref("monsters/monster"+a+"/positionY");mony.on("value",data=>{pY=data.val();});
    var monw = database.ref("monsters/monster"+a+"/width");monw.on("value",data=>{w=data.val();});
    var monh = database.ref("monsters/monster"+a+"/height");monh.on("value",data=>{h=data.val();});
    var monl = database.ref("monsters/monster"+a+"/life");monl.on("value",data=>{lf=data.val();});
    var monc = database.ref("monsters/monster"+a+"/color");monc.on("value",data=>{clr=data.val()})*/
  
  //Cor do personagem e Nome mostrados
  if(gameState==-2&&player.color==null){
    textSize(70)
    fill("red")
    text(form.inputN.value(),width/2 - textSize()*2, height/2-height/2.5)
    form.showColor()
    //Parar de mostrar
  }else{form.sprite.remove()}
  if(gameState!=-2){form.res()}
  //Pontuação
textSize(windowHeight/50)
if(gameState==1){
if(p[plca]!=undefined){
camera.position.x=p[plca][0].position.x
camera.position.y=p[plca][0].position.y
}
  if(m.length<9&&round.a>0){
    round.rounds()
  }
  //
  if(p[player.index-1][1]!=0){p[player.index-1][0].visible=true;plca=player.index-1}else{p[player.index-1][0].visible=false}

  //Movimento
  if(p[player.index-1][1]!=0){
  if(keyIsDown(RIGHT_ARROW)){player.positionX+=1;player.move(); }
  else if(keyIsDown(LEFT_ARROW)){player.positionX-=1;player.move(); }
  if(keyIsDown(DOWN_ARROW)){player.positionY+=1;player.move(); }
  else if(keyIsDown(UP_ARROW)){player.positionY-=1;player.move(); }
  }
  //Monstros
for (var i=0;i<m.length;i++){
  if(player.index!=null&&p.length>0){
  
  //Perseguir o jogador mais perto
  //O jogador atual X
  mpx[2]=p[player.index-1][0].position.x
    //O jogador atual Y
  mpy[2]=p[player.index-1][0].position.y
  var mxy
  if(playerCount>1&&(m[i].indexXY==player.index-1 || p[m[i].indexXY][1]==0)){mxy=m[i].indexXY
while(mxy+1>playerCount-1 || p[mxy][1]==0){mxy+=1; if(mxy>playerCount){mxy=0}}}
  else{mxy=m[i].indexXY}
//Outro jogador X
  mpx[1]=p[mxy][0].position.x
  //Outro jogador Y
  mpy[1]=p[mxy][0].position.y

  //Velocidade
  var dd = dist(m[i].sprite.position.x, m[i].sprite.position.y, mpx[2], mpy[2])
  var DD = dist(m[i].sprite.position.x, m[i].sprite.position.y, mpx[1], mpy[1])
    fill("red")
    //tela esta mais perto
  if(DD>=dd){m[i].speed(mpx[2], mpy[2],i)}
  //outro esta mais perto  
  else {m[i].speed(mpx[1], mpy[1],i)}
  fill("black")

    //Radar (distancia entre o cinza e o preto mais proximo)
    

    //Colisão com o jogador
    if(p[player.index-1][1]!=0 && m[i].sprite.collide(p[player.index-1][0])){m[i].indexXY=0;retirarJ(player.index-1);m[i].indexXY=0}
    else if(m[i].indexXY!=player.index-1 && p[m[i].indexXY][1]!=0 && m[i].sprite.collide(p[m[i].indexXY][0])){retirarJ(m[i].indexXY);m[i].indexXY=0}

    //Aumentar o indexXY
    if(m.length>0){
    if(m[i].indexXY>=playerCount-1){m[i].indexXY=0}
    else{m[i].indexXY+=1}
    }
}
}
//Balas
for (var i=0;i<buls.length;i++){
  if(buls.length>0){
  //Update da posição
  if(i<buls.length && buls.length>0){
  buls[i][1][0].update(buls[i][0][0],buls[i][0][1])}
  //Colisão bala <=> monstro
  if(m.length>0&&buls.length>0){
  
  // var bd = database.ref("Bullets/"+player.name+"/b"+i);bd.on("value",data=>{bD=data.val();})
    if(buls[i][1][0].sprite.collide(m[indexL].sprite)){
   m[indexL].Life(indexL,i)
    buls[i][1][0].Destroy(buls[i][0][0],buls[i][0][1],i)
    indexm-=1;indexL=0
    }
  //Overlaps(i)
  if(i>=(buls.length-1)){
    indexL+=1
  }
  if(indexL>(m.length-1)){
    indexL=0
  }
}
//Destruir balas
if(buls.length>0 && i<buls.length&&(buls[i][1][0].sprite.position.x>p[player.index-1][0].position.x+windowWidth/1.9 || buls[i][1][0].sprite.position.x<p[player.index-1][0].position.x-windowWidth/1.9 || buls[i][1][0].sprite.position.y>p[player.index-1][0].position.y+windowHeight/1.9 || buls[i][1][0].sprite.position.y<p[player.index-1][0].position.y-windowHeight/1.9)){
  buls[i][1][0].Destroy(buls[i][0][0],buls[i][0][1],i)}
  }
}
}
//gameState = 0/-1 => faça:

  if (gameState === 0||gameState==1){
    if(m.length==0){indexL=0;indexm=0;
      for(var b=0;b<buls.length;b+=1){buls[b][1][0].Destroy(buls[b][0][0],buls[b][0][1],b)}
    }
    game.play()
    //Pontuação
//text("Pontuação: "+score,p[player.index-1][0].position.x-width/16,p[player.index-1][0].position.y-height/2.2)
  //Interface\\
    if(r==1){text("Rodada: "+Round+"\nInimigos restantes: "+m.length+"\nBosses: "+Boss+"\nVida: "+nl.toFixed(2),p[plca][0].position.x-width/2,p[plca][0].position.y-height/2.2)}
    if(P==1){text("Taxa de disparo: "+(tdd/1000)+"\nDano: "+d+"\nVida: "+p[player.index-1][1]+"\nVelocidade da bala: "+vdb,p[plca][0].position.x+width/3,p[plca][0].position.y-height/2.2)}
text("Posição atual: "+(p[player.index-1][0].position.x-posix).toFixed(0)+" : "+(p[player.index-1][0].position.y-posiy).toFixed(0),p[plca][0].position.x-width/16,p[plca][0].position.y-height/2.1)}
  if(gameState==0){game.getQuant();game.getRound();game.r=0;text("Aperte A(←),W(↑),S(↓),D(→) para atirar\nAperte as setas ↓, ←, →, ↑ para andar\nAperte r para ativar/desativar algumas informações na tela\nAperte Z para ativar/desativar o tiro na diagonal (anti-horario)\nAssim: \tS(↓) => ↘, A(←) => ↙, D(→) => ↗, W(↑) => ↖\nAperte espaço para começar/terminar a rodada",p[plca][0].position.x-windowWidth/4,p[plca][0].position.y-windowHeight/4)}
   
  drawSprites()
  
  if(gameState==-3){reset()}
}

function keyPressed() {
  //Mudar o jogador observado
  if(p.length>0 && p[player.index-1][1]==0){
    if(keyCode==37){plca-=1;if(plca<0 || p[plca][1]==0){plca=playerCount}}
    if(keyCode==39){plca+=1;if(plca>playerCount-1 || p[plca][1]==0){plca=0}}
  }
  //Esc => recomeçar
  if(keyCode==27){
    game.update(-3)
  }
  //Enter
  if(gameState==-2&&keyCode==13){if(form.pronto<=0){form.pronto=1}else{form.pronto=-1};form.Prontosupdate(form.pronto)}
  //Espaço:
  
  //Sem monstro => gameState = 0
if(m.length==0&&keyCode==32&&gameState==1){qdm+=(qdm/((Round-0.5)*1.1));game.update(0)}
else if(gameState==0&&keyCode==32){game.update(1)}
  if(gameState==1){
    if(p[player.index-1][1]!=0){
  //W:
if(keyCode===87&&X!=1){setTimeout(()=>{if(player.index!=null){var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,0,-vdb,d,player.index,1);buls.push([[player.index-1,TPIB],[bul]]),TPIB+=1;}},500)}
  //S:
if(keyCode===83&&X!=1){setTimeout(()=>{if(player.index!=null){var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,0,vdb,d,player.index,1);buls.push([[player.index-1,TPIB],[bul]]),TPIB+=1}},500)}
  //A:
if(keyCode===65&&X!=1){setTimeout(()=>{if(player.index!=null){var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,-vdb,0,d,player.index,1);buls.push([[player.index-1,TPIB],[bul]]),TPIB+=1}},500)}
  //D:
if(keyCode===68&&X!=1){setTimeout(()=>{if(player.index!=null){var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,vdb,0,d,player.index,1);buls.push([[player.index-1,TPIB],[bul]]),TPIB+=1}},500)}

//Contrario do Relogio
//W:
if(keyCode===87&&X==1){setTimeout(()=>{if(player.index!=null){var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,-vdb,-vdb,d,player.index,1);buls.push([[player.index-1,TPIB],[bul]]),TPIB+=1}},500)}
  //S:
if(keyCode===83&&X==1){setTimeout(()=>{if(player.index!=null){var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,vdb,vdb,d,player.index,1);buls.push([[player.index-1,TPIB],[bul]]),TPIB+=1}},500)}
  //A:
if(keyCode===65&&X==1){setTimeout(()=>{if(player.index!=null){var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,-vdb,vdb,d,player.index,1);buls.push([[player.index-1,TPIB],[bul]]),TPIB+=1}},500)}
  //D:
if(keyCode===68&&X==1){setTimeout(()=>{if(player.index!=null){var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,vdb,-vdb,d,player.index,1);buls.push([[player.index-1,TPIB],[bul]]),TPIB+=1}},500)}
}}

//X: Ativar/Desativar tiro na diagonal
if(keyCode==90){X=-X}
//Informações da rodada
if(keyCode===82){r=-r}
//Informações do jogador
if(keyCode==80){P=-P}
}
/*function radar(mx,my){
fill("red");textSize(windowHeight/50);stroke(200,200,200);strokeWeight(0.5)
  text(Math.round(dx[0]*mx)+"  /  "+Math.round(dy[0]*my),windowWidth/2,windowHeight/2-windowHeight/2.25)
}*/
function retirarJ(i){
  if(playerCount==1){
    for(var b=0;b<m.length;b+=1){m[b].Destroy(b,0)}
    for(var b=0;b<buls.length;b+=1){buls[b][1][0].Destroy(buls[i][0][0],buls[i][0][1],b)}
    }
    console.log(i)
    console.log(p[i][0])
    p[i][1]=0
  while(plca==i){plca=Math.round(random(0,p.length-1));console.log("A")}

}
function reset(){
  
    //Recomeçando o jogo (chama o setup)
    database.ref("/").set({
      gameState:-2,
      playerCount:0,
      players:{},
      qdm:0,
      round:0,
      Bullets:{},
      monsters:{},
      prontos:0,
    })
    form.res();player.res()
    window.location.reload()
    setup()
}
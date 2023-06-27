let game={
 coppers:50,
 silvers:0,
 golds:0,
 platinums:0,//coins

 copperGrowth:1,//шахта
 coppersUpgLevel:0,//уровень апгрейда
 silverGrowth:1,//шахта
 silversUpgLevel:0,//уровень апгрейда
 goldGrowth:1,//шахта
 goldsUpgLevel:0,//уровень апгрейда
 bonusScores:1,//бонус очки
 /*
  Добавить покупку медной шахты,
  покупку нескольких шахт одного типа, 
  сделать апгрейд шахты до определеннго уровня.
  окно в окне увелечение уровня до определенного предела
  список элементов
  добавление нового элемента
  reset 
  
 */
}

 
myTimer=setInterval(endOfTurnCalc,1000);//0.2 секунды
let winCondition = 200;//Победа. Конец игры
let copperMineBasePriceCoppers = 10;
let silverMineBasePriceCoppers = 100;
let goldMineBasePriceSilvers = 100;

let countdown = 30;
let showExport = 0;


//сокращаем числа
function shortenNumber(number) {
  var abbrev = ["", "K", "M", "B", "T","q","Q","s","S","O","N","d","U","D","TD"];//Td qd Qd sd Sd Od Nd V Uv Dv Tv ...Nv Tg Ut
  var tier = Math.log10(Math.abs(number)) / 3 | 0;
  if (tier == 0) return number;
  var suffix = abbrev[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  return scaled.toFixed(2) + suffix;
}

//добываем монеты
   function endOfTurnCalc() {
      if (game.golds < winCondition) {
        game.coppers = game.coppers+game.copperGrowth*game.coppersUpgLevel*game.bonusScores;
        game.silvers = game.silvers+game.silverGrowth*game.silversUpgLevel*game.bonusScores;
        game.golds = game.golds+game.goldGrowth*game.goldsUpgLevel*game.bonusScores;
        updateUI();
        
      } else {
        winGame();
      }
    }
//победа
function winGame() {
      clearTimeout(myTimer);
      alert("Вы достигли цели! Вы накопили "+game.golds+" золотых, "
      	+game.silvers+" серебряных, "+game.coppers+" медных.");
      myRestartTimer = setInterval(restartGameDialog, myTimer);;
    }
    //рестарт
    function restartGameDialog() {
      if (confirm('Хотите сыграть еще раз с очками Престижа?')) {
        restartGame();
      } else {
        clearTimeout(myRestartTimer);
      }
    }
    function restartGame() {
      game.coppers = 50+game.bonusScores;
      game.bonusScores = game.bonusScores+1;
      game.coppersUpgLevel = 0;
      game.silvers = 0;
      game.silversUpgLevel = 0;
      game.golds = 0;
      game.goldsUpgLevel = 0;
      clearTimeout(myRestartTimer);
      myTimer = setInterval(endOfTurnCalc, 1000);
      updateUI();
    }
//апгрейд
    function coppersUpgCost() {
      return game.coppersUpgLevel*10;
    }

    function silversUpgCost() {
      return game.silversUpgLevel*20+10;
    }function goldsUpgCost() {
      return game.goldsUpgLevel*30+20;
    }

  function upgCopperMine() {

    if (game.coppersUpgLevel===0){
        if (game.coppers>=copperMineBasePriceCoppers){
          game.coppers = game.coppers-copperMineBasePriceCoppers;
          game.coppersUpgLevel = 1;

          updateUI();
        }
      }else{
      if (game.coppers >= coppersUpgCost()) {
        game.coppers = game.coppers-coppersUpgCost();
        game.coppersUpgLevel = game.coppersUpgLevel + 1;
        game.copperGrowth=game.copperGrowth+2
        updateUI();
      }
    }
}
    function upgSilverMine() {
      if (game.silversUpgLevel===0){
        if (game.coppers>=silverMineBasePriceCoppers){
          game.coppers = game.coppers-silverMineBasePriceCoppers;
          game.silversUpgLevel = 1;
          updateUI();
        }
      } else {
        if (game.silvers>=silversUpgCost()){
          game.silvers = game.silvers-silversUpgCost();
          game.silversUpgLevel = game.silversUpgLevel + 1;
          updateUI();
        }
      }
    }


    function upgGoldMine() {
      if (game.goldsUpgLevel===0){
        if (game.silvers>=goldMineBasePriceSilvers){
          game.silvers = game.silvers-goldMineBasePriceSilvers;
          game.goldsUpgLevel = 1;
          updateUI();
        }
      } else {
        if (game.golds>=goldsUpgCost()){
          game.golds = game.golds-goldsUpgCost();
          game.goldsUpgLevel = game.goldsUpgLevel + 1;
          updateUI();
        }
      }
    }


//обмен ресурсов
function buySilver() {
      if (game.coppers>=100) {
        game.coppers = game.coppers - 100;
        game.silvers = game.silvers + 1;
        updateUI();
      }
    }
function sellSilver() {
      if (game.silvers>=1) {
        game.coppers = game.coppers + 100;
        game.silvers = game.silvers - 1;
        updateUI();
      }
    }
 function buyGold() {
      if (game.silvers>=100) {
        game.silvers = game.silvers - 100;
        game.golds = game.golds + 1;
        updateUI();
      }
    }

    
 function sellGold() {
      if (game.golds>=1) {
        game.silvers = game.silvers + 100;
        game.golds = game.golds - 1;
        updateUI();
      }
    }
   //обновление значений
   function updateUI(){
   	    document.getElementById("winCondition").textContent = winCondition;
   	    document.getElementById("bonusScores").textContent = game.bonusScores;
   	    document.getElementById("spnCoppersValue").textContent   = shortenNumber(game.coppers);
        if (game.coppersUpgLevel===0) {
          document.getElementById("btnUpgCopperMine").textContent  = "Построить медную шахту, ";
        document.getElementById("btnUpgCopperMine").textContent += copperMineBasePriceCoppers.toString();
        document.getElementById("btnUpgCopperMine").textContent += " медных монет";
        }else {
        document.getElementById("btnUpgCopperMine").textContent  = "Улучшить медную шахту, ";
        document.getElementById("btnUpgCopperMine").textContent += shortenNumber(coppersUpgCost().toString());
        document.getElementById("btnUpgCopperMine").textContent += " медных монет";
      }
        document.getElementById("spnCoppersRate").textContent    =shortenNumber( game.copperGrowth*game.coppersUpgLevel*game.bonusScores);

        document.getElementById("spnSilversValue").textContent   = game.silvers;
        if (game.silversUpgLevel===0) {
        document.getElementById("btnUpgSilverMine").textContent  = "Построить серебряную шахту, ";
        document.getElementById("btnUpgSilverMine").textContent += silverMineBasePriceCoppers.toString();
        document.getElementById("btnUpgSilverMine").textContent += " медных монет";
      } else {
        document.getElementById("btnUpgSilverMine").textContent  = "Улучшить серебряную шахту, ";
        document.getElementById("btnUpgSilverMine").textContent += silversUpgCost().toString();
        document.getElementById("btnUpgSilverMine").textContent += " серебряных монет";
      }
      document.getElementById("spnSilversRate").textContent    = shortenNumber(game.silverGrowth*game.silversUpgLevel*game.bonusScores);

      document.getElementById("spnGoldsValue").textContent   = game.golds;
      if (game.goldsUpgLevel===0) {
        document.getElementById("btnUpgGoldMine").textContent  = "Построить золотую шахту, ";
        document.getElementById("btnUpgGoldMine").innerHTML += goldMineBasePriceSilvers.toString();
        document.getElementById("btnUpgGoldMine").innerHTML += " серебряных монет";
      } else {
        document.getElementById("btnUpgGoldMine").innerHTML  = "Улучшить золотую шахту, ";
        document.getElementById("btnUpgGoldMine").innerHTML += goldsUpgCost().toString();
        document.getElementById("btnUpgGoldMine").innerHTML += " золотых монет";
      }
      document.getElementById("spnGoldsRate").innerHTML    = shortenNumber(game.goldGrowth*game.goldsUpgLevel*game.bonusScores);


      if (showExport===1){
        document.getElementById("divLblExport").style.display = "block";
      } else {
        document.getElementById("divLblExport").style.display = "none";
      }

   } 

  //экспорт игры между браузерами 
function exportGame() {
      exportTimer = setInterval(exportCountdown, 1000);
      document.getElementById("divLblExport").textContent = btoa(JSON.stringify(game));
      showExport = 1;
      updateUI();
    }

    function exportCountdown() {
      if (countdown > 0) {
        countdown = countdown - 1;
      } else {
        clearTimeout(exportTimer);
        countdown = 30;
        showExport = 0;
        updateUI();
      }
    }
    //импорт игры между браузерами
   function importGame() {
      let importString = prompt('Введите длинную строку экспорта');
      gameTemp = JSON.parse(atob(importString));
      for (var propertyName in gameTemp) { game[propertyName] = gameTemp[propertyName]; }
      updateUI();
    }
  //сохранить игру  
function saveGame(){
	localStorage.setItem('gameTutorial',JSON.string(game));
}
//загружаем сохраненную игру
function loadGame(){
    gameTemp=JSON.parse(localStorage.getItem('gameTutorial'));
    for (var propertyName in gameTemp) { game[propertyName] = gameTemp[propertyName]; }
     updateUI();
 }


let game={
 coppers:1,
 silvers:0,
 golds:0,
 platinums:0,//coins

 copperGrowth:1,//шахта
 coppersUpgLevel:1,//уровень апгрейда
 silverGrowth:1,//шахта
 silversUpgLevel:0,//уровень апгрейда
 goldGrowth:1,//шахта
 goldsUpgLevel:0,//уровень апгрейда
 bonusScores:0,//бонус очки
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

 
myTimer=setInterval(endOfTurnCalc,200);//0.2 секунды
let winCondition = 200;//Победа. Конец игры

let silverMineBasePriceCoppers = 100;
let goldMineBasePriceSilvers = 100;


//добываем монеты
   function endOfTurnCalc() {
      if (game.golds < winCondition) {
        game.coppers = game.coppers+game.copperGrowth*game.coppersUpgLevel+game.bonusScores;
        game.silvers = game.silvers+game.silverGrowth*game.silversUpgLevel+game.bonusScores;
        game.golds = game.golds+game.goldGrowth*game.goldsUpgLevel+game.bonusScores;
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
      game.coppers = 1;
      game.bonusScores = game.bonusScores+1;
      game.coppersUpgLevel = 1;
      game.silvers = 0;
      game.silversUpgLevel = 0;
      game.golds = 0;
      game.goldsUpgLevel = 0;
      clearTimeout(myRestartTimer);
      myTimer = setInterval(endOfTurnCalc, 200);
      updateUI();
    }
//апгрейд
    function coppersUpgCost() {
      return game.coppersUpgLevel*10;
    }

    function silversUpgCost() {
      return game.silversUpgLevel*10+5;
    }function goldsUpgCost() {
      return game.goldsUpgLevel*10+10;
    }

  function upgCopperMine() {
      if (game.coppers >= coppersUpgCost()) {
        game.coppers = game.coppers-coppersUpgCost();
        game.coppersUpgLevel = game.coppersUpgLevel + 1;
        updateUI();
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
   	    document.getElementById("spnCoppersValue").textContent   = game.coppers;
        document.getElementById("btnUpgCopperMine").textContent  = "Улучшить медную шахту, ";
        document.getElementById("btnUpgCopperMine").textContent += coppersUpgCost().toString();
        document.getElementById("btnUpgCopperMine").textContent += " медных монет";
        document.getElementById("spnCoppersRate").textContent    = game.copperGrowth*game.coppersUpgLevel;

        document.getElementById("spnSilversValue").textContent   = game.silvers;
        if (game.silversUpgLevel===0) {
        document.getElementById("btnUpgSilverMine").innerHTML  = "Построить серебряную шахту, ";
        document.getElementById("btnUpgSilverMine").innerHTML += silverMineBasePriceCoppers.toString();
        document.getElementById("btnUpgSilverMine").innerHTML += " медных монет";
      } else {
        document.getElementById("btnUpgSilverMine").innerHTML  = "Улучшить серебряную шахту, ";
        document.getElementById("btnUpgSilverMine").innerHTML += silversUpgCost().toString();
        document.getElementById("btnUpgSilverMine").innerHTML += " серебряных монет";
      }
      document.getElementById("spnSilversRate").innerHTML    = game.silverGrowth*game.silversUpgLevel;

      document.getElementById("spnGoldsValue").textContent   = game.golds;
      if (game.goldsUpgLevel===0) {
        document.getElementById("btnUpgGoldMine").innerHTML  = "Построить золотую шахту, ";
        document.getElementById("btnUpgGoldMine").innerHTML += goldMineBasePriceSilvers.toString();
        document.getElementById("btnUpgGoldMine").innerHTML += " серебряных монет";
      } else {
        document.getElementById("btnUpgGoldMine").innerHTML  = "Улучшить золотую шахту, ";
        document.getElementById("btnUpgGoldMine").innerHTML += goldsUpgCost().toString();
        document.getElementById("btnUpgGoldMine").innerHTML += " золотых монет";
      }
      document.getElementById("spnGoldsRate").innerHTML    = game.goldGrowth*game.goldsUpgLevel;

   } 

   
  //сохранить игру  
function saveGame(){
	localStorage.setItem('gameTutorial',JSON.string(game));
}
//загружаем сохраненную игру
function loadGame(){
    game=JSON.parse(localStorage.getItem('gameTutorial'));
     updateUI();
 }


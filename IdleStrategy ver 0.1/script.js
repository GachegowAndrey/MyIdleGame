// variables
const game={
 food : {
  name: "food",
  amount: 0,
  increment: 0,
  max: 100,
  storage: 0,
  storageCost: {
    wood: 50,
    stone: 50 }, 
},
 wood : {
  name: "wood",
  amount: 0,
  increment: 0,
  max: 100,
  storage: 0,
  storageCost: {
    wood: 50,
    stone: 50 },
     },
 stone : {
  name: "stone",
  amount: 0,
  increment: 0,
  max: 100,
  storage: 0,
  storageCost: {
    wood: 50,
    stone: 50 
},
     },

     // Buildings
tent : {
  amount: 0,
  residents: 1,
  cost: {
    wood: 30 },
},

house : {
  amount: 0,
  residents: 5,
  cost: {
    wood: 75,
    stone: 25 },
 }, 
 
hostel : {
  amount: 0,
  residents: 10,
  cost: {
    wood: 200,
    stone: 215 },
     },
worker:{
	name:"worker",
	amount:0,

	hunter: {
    increment: 1,
    amount: 0,
    cost: 10 },

	lumberjack: {
    increment: 1,
    amount: 0,
    cost: 10 },

    miner: {
    increment: 1,
    amount: 0,
    cost: 10 },
},


};

var maxPop = game.tent.residents *game.tent.amount + 
 game.house.residents * game.house.amount +
 game.hostel.residents*game.hostel.amount;
    var clickIncrement = 1;
function updateValues() {
  document.getElementById("workerAmount").innerHTML = game.worker.amount;
  document.getElementById("hunterAmount").innerHTML = game.worker.hunter.amount;
  document.getElementById("maxPop").innerHTML = maxPop;
  
  //resourses
  document.getElementById("woodAmount").innerHTML = game.wood.amount;
  document.getElementById("maxWood").innerHTML = game.wood.max;
  document.getElementById("woodIncrement").innerHTML = game.wood.increment;
  document.getElementById("stoneAmount").innerHTML = game.stone.amount;
  document.getElementById("maxStone").innerHTML = game.stone.max;
  document.getElementById("stoneIncrement").innerHTML = game.stone.increment;
  document.getElementById("foodAmount").innerHTML = game.food.amount;
  document.getElementById("maxFood").innerHTML = game.food.max;
  document.getElementById("foodIncrement").innerHTML = game.food.increment;
 //buildings
 document.getElementById("houseAmount").innerHTML = game.house.amount;
  document.getElementById("tentAmount").innerHTML = game.tent.amount;
  document.getElementById("bigHouseAmount").innerHTML = game.hostel.amount;
  document.getElementById("woodStorageAmount").innerHTML = game.wood.storage;
  document.getElementById("foodStorageAmount").innerHTML = game.food.storage;
  document.getElementById("stoneStorageAmount").innerHTML = game.stone.storage;
  document.getElementById("tentCostWood").innerHTML = game.tent.cost.wood;
  document.getElementById("tentCountWorkers").innerHTML = game.tent.residents;
  
  document.getElementById("houseCostWood").innerHTML = game.house.cost.wood;
  document.getElementById("houseCostStone").innerHTML = game.house.cost.stone;
  document.getElementById("houseCountWorkers").innerHTML = game.house.residents;
  
  document.getElementById("BHCostWood").innerHTML = game.hostel.cost.wood;
  document.getElementById("BHCostStone").innerHTML = game.hostel.cost.stone;
  document.getElementById("BHCountWorkers").innerHTML = game.hostel.residents;
  
  document.getElementById("woodStorageCostWood").innerHTML = game.wood.storageCost.wood;
  document.getElementById("woodStorageCostStone").innerHTML = game.wood.storageCost.stone;
  
  document.getElementById("stoneStorageCostWood").innerHTML = game.stone.storageCost.wood;
  document.getElementById("stoneStorageCostStone").innerHTML = game.stone.storageCost.stone;
  
  document.getElementById("foodStorageCostWood").innerHTML = game.food.storageCost.wood;
  document.getElementById("foodStorageCostStone").innerHTML = game.food.storageCost.stone;

//workers
  document.getElementById("workerAmount").innerHTML = game.worker.amount; 
  
  document.getElementById("lumberjackAmount").innerHTML = game.worker.lumberjack.amount;
  document.getElementById("lumberjackCost").innerHTML = game.worker.lumberjack.cost;
  document.getElementById("minerAmount").innerHTML = game.worker.miner.amount;
  document.getElementById("minerCost").innerHTML = game.worker.miner.cost;
  document.getElementById("hunterAmount").innerHTML = game.worker.hunter.amount;
  document.getElementById("hunterCost").innerHTML = game.worker.hunter.cost;
}    
// All OnLoad Functions
// Modal Commented out during development

// Click to Chop, Mine, Gather
    $(function(){
	$('#chopWood').on("click",function(){
		game.wood.amount++;
		updateValues();
	});
});
$('#createWorker').click(function () {
  game.worker.amount++;
  updateValues();
 
});
$('#deleteWorker').click(function () {
  game.worker.amount--;
  updateValues();
 
});
$('#createHunter').click(function () {
  game.worker.amount--;
  game.worker.hunter.amount++;
  updateValues();
 
});
$('#deleteHunter').click(function () {
  game.worker.amount++;
  game.worker.hunter.amount--;
  updateValues();
 
});
$('#gatherFood').click(function () {
  game.food.amount++;
  updateValues();
 
});
$('#mineStone').click(function () {
  game.stone.amount++ ; 
 updateValues();
});
$('#buildTent').click(function () {
 game.tent.amount++;
 game.wood.amount=game.wood.amount-game.tent.cost.wood;
 game.tent.cost.wood = game.tent.cost.wood
 maxPop = maxPop+game.tent.residents ;
 updateValues();
});

$('#buildWoodStorage').click(function () {
  
    game.wood.storage++;
    game.wood.max = game.wood.max + 100;
    game.wood.amount=game.wood.amount-game.wood.storageCost.wood;
    game.stone.amount=game.stone.amount-game.wood.storageCost.stone;
    updateValues();
  });






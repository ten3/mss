var defaultWhite = 0.0f;
var defaultPrice = 100;
var defaultHardly = 10.0f;

private var whitePower = 0.0f;
private var price = 100;
private var hardly = 10.0f;


//var characterController : MyCharacterController;
//characterController = GetComponent(MyCharacterController);

function Awake(){

	ResetStatus();
}

function ResetStatus(){
	whitePower = defaultWhite;
	price      = defaultPrice;
	hardly     = defaultHardly;
}

function GetWhitePower() { return whitePower; }

function AddWhitePower(addWhite : float){
	whitePower += addWhite;
}

function GetPrice() { return price; }

function AddPrice(addPrice : int){
	price += addPrice;
}

function GetHardly() { return hardly; }

function AddHardly(addHardly : float){
	hardly += addHardly;
}

@script AddComponentMenu("MyCharacterStatus");
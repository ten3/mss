#pragma strict

var price = 10;

private var isPickedUp = false;

function OnTriggerEnter( collider: Collider ){

	var status : MyCharacterStatus = collider.GetComponent(MyCharacterStatus);
	
	if(status == null) return;
	
	if(isPickedUp) return;
	
	status.AddPrice(price);
	
	Destroy(gameObject);
}

function Reset(){
	if(collider == null){
		gameObject.AddComponent(SphereCollider);
	}
	
	collider.isTrigger = true;
}
#pragma strict

//	target position of camera
var target : Transform;

// distance of camera to target
var distance = 5.0;

// hight of camera from target
var height = 4.0;

// parameter of camera speed
// how fast to seek the target parameter
var heightDamping = 2.0;
var rotationDamping = 3.0;
var distanceDampingX = 1;
var distanceDampingZ = 1;

var camSpeed = 2.0;
var smoothed = true;

var awakeSearchCharacter = true;

function Awake(){
	//  check of target allocated by inspector
	if( !target ){
		return;
	} 
	
	if( !awakeSearchCharacter ){
		return;
	}
	var wantedRotationAngle = target.eulerAngles.y;
	var front = Quaternion.AngleAxis( wantedRotationAngle , Vector3.up ) * Vector3( 0 , 0 , 1 );
	
	var wantedHeight = target.position.y + height;
	var wantedDistanceZ = target.position.z - ( front.z * distance );
	var wantedDistanceX = target.position.x - ( front.x * distance );
	
	transform.position.x = wantedDistanceX;
	transform.position.y = wantedHeight;
	transform.position.z = wantedDistanceZ;
	
	transform.LookAt( target );
}

function LateUpdate(){
	//  check of target allocated by inspector
	if( !target ){
		return;
	} 
	var wantedRotationAngle = target.eulerAngles.y;

	var front = Quaternion.AngleAxis( wantedRotationAngle , Vector3.up ) * Vector3( 0 , 0 , 1 );

	var wantedHeight = target.position.y + height;
	var wantedDistanceZ = target.position.z - (front.z * distance );
	var wantedDistanceX = target.position.x - (front.x * distance );

	var currentRotationAngle = transform.eulerAngles.y;
	var currentHeight = transform.position.y;
	var currentDistanceZ = transform.position.z;
	var currentDistanceX = transform.position.x;

	// seek process of rotate y
	currentRotationAngle = Mathf.LerpAngle( currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime );
	

	currentHeight = Mathf.Lerp(
		currentHeight, wantedHeight, heightDamping * Time.deltaTime );

	currentDistanceZ = Mathf.Lerp(
		currentDistanceZ, wantedDistanceZ, distanceDampingZ * Time.deltaTime );
	currentDistanceX = Mathf.Lerp(
		currentDistanceX, wantedDistanceX, distanceDampingX * Time.deltaTime );
	// convert to parameter format of rotate camera angle parameter
	var currentRotation = Quaternion.Euler(0 , currentRotationAngle, 0 );
	// set to new camera position
	transform.position -= currentRotation * Vector3.forward * distance;

	transform.position.x = currentDistanceX;
	transform.position.y = currentHeight;
	transform.position.z = currentDistanceZ;

	LookAtMe();


}

function LookAtMe() {
	if( smoothed ) {
		var camRotation = Quaternion.LookRotation(
			target.position - transform.position );

		transform.rotation = Quaternion.Slerp(
			transform.rotation, camRotation, Time.deltaTime * camSpeed );
	}else{
		transform.LookAt(target);
	}
}
@script AddComponentMenu( "Player Follow Camera" )

var moveSpeed 		= 6.0;
var jumpSpeed 		= 8.0;
var gravity 		= 20.0;
var rotateSpeed 	= 4.0;

private var moveDirection		= Vector3.zero;
private var grounded : boolean 	= true;
private var moveHorz 			= 0.0;
private var normalHeight		= 2.0;
private var duckHeight			= 1.0;
private var rotateDirection		= Vector3.zero;

function IsMoving(){return moveDirection.magnitude > 0.5;}
function IsGrounded(){return grounded;}


var isControllable : boolean	= true;

var controller = null;
controller = GetComponent( CharacterController );

//var characterStatus : CharacterStatus;
//characterStatus = GetComponent( CharacterStatus );

function Awake(){
	if( !controller ){
		Debug.Log("Please assign a target to the camera that has a Third Person Controller script component.");
	}
}

function FixedUpdate(){

	if( !isControllable ){
		Input.ResetInputAxes();
	}else{
		if( grounded ){

			var x_axis = Input.GetAxis("Horizontal");
			var y_axis = Input.GetAxis("Vertical") * -1;
			
			// analog stick no asobi
			if( (x_axis < 0.3) && (x_axis >(-0.3)) ){
				x_axis = 0;
			}
			
			if( (y_axis < (0.3)) && (y_axis > (-0.3)) ){
				y_axis = 0;
			}
			
			moveDirection = new Vector3(
					x_axis, 0 , y_axis );

			moveDirection = transform.TransformDirection(moveDirection);
			moveDirection *= moveSpeed;
			
			
			//	default style setting
			controller.height = normalHeight;
			controller.center.y = 0;//controller.height / 2;
			
			moveHorz = x_axis;
			
			if( moveHorz > 0 ){
				rotateDirection = new Vector3( 0 , 1 , 0 );
			}else if( moveHorz < 0 ){
				rotateDirection = new Vector3( 0 , -1 , 0 );
			}else{
				rotateDirection = new Vector3(0 , 0 , 0);
			}
			
			if( Input.GetButton("Jump") ){
				moveDirection.y = jumpSpeed;
			}
		}else{
			moveDirection.y -= gravity * Time.deltaTime;
		}
	}
	var flags = controller.Move( moveDirection * Time.deltaTime );
	controller.transform.Rotate( rotateDirection * Time.deltaTime, rotateSpeed );
	grounded = ((flags & CollisionFlags.CollidedBelow) != 0 );
}


@script AddComponentMenu( "Player Controller" );



var customSkin: GUISkin;
var background: Texture2D;

private var characterStatus : MyCharacterStatus;

function Start(){
	characterStatus = FindObjectOfType( MyCharacterStatus );
}

function OnGUI(){

	if( customSkin )
		GUI.skin = customSkin;

	GUI.BeginGroup( Rect( 0 , 0 , 320 , 100 ) );
	GUI.Label( Rect( 0 , 0 , 320 , 100 ) , background );
	GUI.Label( Rect( 10 , 10 , 250 , 50 ) , "price:" + characterStatus.GetPrice() );
	GUI.EndGroup();
		
}

@script ExecuteInEditMode();
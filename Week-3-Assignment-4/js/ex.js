///Paul Coyte, HTML Events Assignment///

function init() 
{
	var bigBox = document.querySelector(".long-rect");
	var smallBox = document.querySelector(".short-rect");
	//Some variables to represent the two boxes
	var hasEnteredBox = false;
	//Variable to track if user has entered box or not
	
	bigBox.addEventListener("mouseover", function() 
										{
											smallBox.innerText = "Mouse has entered the box!";
											hasEnteredBox = true;
										}
						   );
	//Event listener to, on mouseover, update the small box text to "Mouse has entered the box!"
	
	bigBox.addEventListener("mouseout", function() 
										{
											smallBox.innerText = "Mouse has left the box!";

										}
						   );
	//Event listener to, on mouseout,  update the small box text to "Mouse has left the box!"
	
	smallBox.addEventListener("click", function()  
									   {
									  	   if(hasEnteredBox)
										   {
											   alert("Click!");
										   }
											//Sends a "Click!" alert to the user if they've done a mouseover of the large box.
									   }
							 );
	//Event listener to show an alert to the user if they click the small box after having moused over the large box 
	
}

document.addEventListener("DOMContentLoaded", init);
//Waits for the document to be fully loaded before calling the init function
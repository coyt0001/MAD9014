function init()
{
  var dataFile = "http://localhost:3000/users.json";
  //Var holding location of JSON user data
  var loadButton = document.getElementById("loadBtn");
  var showButton = document.getElementById("showBtn");
  //Vars for load and show buttons
  var mainOutput = document.getElementById("output1");
  var oldOutput = document.getElementById("output2");
  //Vars for output fields
  var req = new XMLHttpRequest();
  var userData = null;
  //Vars to fetch and hold user JSON data
  var mainImg = document.createElement("img");
  var mainName = document.createElement("h2");
  var mainEmail = document.createElement("a");
  var mainThumb = null;
  //Main content elements
  var shownImgOne = document.createElement("img");
  var shownImgTwo = document.createElement("img");
  var shownImgThree = document.createElement("img");
  var shownNameOne = document.createElement("a");
  var shownNameTwo = document.createElement("a");
  var shownNameThree = document.createElement("a");
  var spacer = [document.createElement("br"), document.createElement("br")];
  //Sidebar content elements
  
  var cycleCounter = 0;
  //variable to count how many times the show button has been clicked to cycle the data
  var firstCycle = true;
  //variable to determine if this is the first time cycling through the data
  
  loadButton.addEventListener
  (
    "click", function()
    {
      loadButton.className = "btn disabled";

      req.open("GET", dataFile, false);
      req.onreadystatechange = function()
      {
        if(req.readyState === 4 && req.status === 200)
        {
          showButton.className = "btn enabled";
          userData = JSON.parse(req.responseText);
        }
      }
      req.send();
      //Load JSON data with AJAX, disables load button and enables show button
        
      showButton.addEventListener
      (
        "click", function()
        {
          if (cycleCounter >= userData.length)
          {
            cycleCounter = 0;
            //reset the counter when the end of the json data is reached
            if (firstCycle)
            {
              firstCycle = false;
              //Sets flag to show that it's not longer the first time cycling the data
            }
          }
          
          if (cycleCounter === 0 && firstCycle)
          {
            //do nothing
          }
          else
          {
            shownImgThree.src = shownImgTwo.src;
            shownNameThree.href = shownNameTwo.href;
            shownNameThree.innerHTML = shownNameTwo.innerHTML;

            shownImgTwo.src = shownImgOne.src;
            shownNameTwo.href = shownNameOne.href;
            shownNameTwo.innerHTML = shownNameOne.innerHTML;
            
            shownImgOne.src = mainThumb;
            shownNameOne.href = mainEmail.href;
            shownNameOne.innerHTML = mainName.innerHTML;
            
            if(shownNameOne != null && shownImgOne != null && shownImgOne.src.indexOf(".jpg") >= 0)
            {
              oldOutput.appendChild(shownImgOne);
              oldOutput.appendChild(shownNameOne);
            }
            if(shownNameTwo != null && shownImgTwo != null && shownImgTwo.src.indexOf(".jpg") >= 0)
            {
              oldOutput.appendChild(spacer[0]);
              oldOutput.appendChild(shownImgTwo);
              oldOutput.appendChild(shownNameTwo);
            }
            if(shownNameThree != null && shownImgThree != null && shownImgThree.src.indexOf(".jpg") >= 0)
            {
              oldOutput.appendChild(spacer[1]);
              oldOutput.appendChild(shownImgThree);
              oldOutput.appendChild(shownNameThree);
            }
          }
          //Cycles the last 3 people shown through the right side div
          
          mainImg.src = userData[cycleCounter].image;
          mainThumb = userData[cycleCounter].thumbnail;
          mainName.innerHTML = userData[cycleCounter].firstName + " " + userData[cycleCounter].lastName;
          mainEmail.href = "mailto:" + userData[cycleCounter].email;
          mainEmail.innerHTML = userData[cycleCounter].email;

          mainOutput.appendChild(mainImg);
          mainOutput.appendChild(mainName);
          mainOutput.appendChild(mainEmail);
          //Updates the main output div with the next person.

          cycleCounter++;
          //Incriments the counter
        }
      );
      //When show button is clicked will show newest piece on left side and cycle the rest over to the right.
    }
  );
  //When load button is clicked will fetch data with AJAX, disable load button anad enable show button
}

document.addEventListener("DOMContentLoaded", init);
//initalization
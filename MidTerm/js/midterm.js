function init()
{
  var dataFile = "https://raw.githubusercontent.com/coyt0001/MAD9014/gh-pages/MidTerm/users.json";
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
  var shownImg = [document.createElement("img"), document.createElement("img"), document.createElement("img")];
  var shownName = [document.createElement("a"), document.createElement("a"), document.createElement("a")];
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
            for (c = 0; c <= 2; c++)
            {
              if (c === 0)
              {
                for (i = 0; i <= 2; i++)
                {
                  if (i < 2)
                  {
                    shownImg[i].src = shownImg[i+1].src;
                    shownName[i].href = shownName[i+1].href;
                    shownName[i].innerHTML = shownName[i+1].innerHTML;
                  }
                  else
                  {
                    shownImg[i].src = mainThumb;
                    shownName[i].href = mainEmail.href;
                    shownName[i].innerHTML = mainName.innerHTML;
                  }
                }
              }
              
              if (c != 0)
              {
                oldOutput.appendChild(spacer[c-1]);
              }
              
              if(shownName[c] != null && shownImg[c] != null && shownImg[c].src.indexOf(".jpg") >= 0)
              {
                oldOutput.appendChild(shownImg[c]);
                oldOutput.appendChild(shownName[c]);
              }
            }
          }
          //Cycles the last 3 people shown through the right side div
          
          mainImg.src = userData[cycleCounter].image;
          mainThumb = userData[cycleCounter].thumbnail;
          mainName.innerHTML = userData[cycleCounter].firstName + " " + userData[cycleCounter].lastName;
          mainEmail.innerHTML = userData[cycleCounter].email;
          mainEmail.href = "mailto:" + userData[cycleCounter].email;

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

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#index').on('pageinit', function(){

		var myForm = $('#addItem');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			saveData(data);
		}
		
	});
	
	//Get the value of the checkInputs when clicked.
	function getChecks(){
		var checkInputs = document.forms[0].installed;
		var storeChecks = [];
		for(var i=0; i<checkInputs.length; i++){
			if(checkInputs[i].checked){
				installedValue = checkInputs[i].value;
				storeChecks.push(installedValue);
			}
		}
		if(storeChecks.length === 0){
			installedValue = "There are no items installed.";
			storeChecks.push(installedValue);
		}
		return storeChecks;
	}
		
	//Saves the form data into local storage.
	function saveData(key){
	//If there is no key this means it is brand new item and we need a new key.
		var id;
		if(!key){
			id = Math.floor(Math.random()*100000001);
		}else{
		//Set the item to a existing key so we can edit.
			id = key;
		}
		getRadio();
		var item 				= {};
			item.id				= ["Client ID:", id];
			item.group 			= ["Install:", $("#groups").value];
			item.compname		= ["Company Name:", $("#compname").value];
			item.contname		= ["Contact Name:", $("#contname").value];
			item.contphone		= ["Contact Phone #:", $("#contphone").value];
			item.contemail		= ["Contact Email:", $("#contemail").value];
			item.date			= ["Install Date:", $("#date").value];
			item.ipaddress		= ["Ip Address:", $("#ipaddress").value];
			item.sysuser		= ["System Username:", $("#sysuser").value];
			item.syspass		= ["System Password:", $("#syspass").value];
			item.installed 		= ["The client has these systems installed:", getChecks()];
			item.warranty 		= ["The client has this warranty:", warrantyValue];
			item.quanity 		= ["Quantity (# of Cameras, TV's, POS Terminals, etc):", $("#quanity").value];
			item.price			= ["Price:", $("#price").value];
			item.notes			= ["Notes:", $("#notes").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Client Information is Saved!");
		console.log(id);
	}
	
	function autofillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}		 
	};
		
	//Get image for getData.
	function chooseImage(installCat, chooseSubList){
		var imgLi = document.createElement("li");
		chooseSubList.appendChild(imgLi);
		var nextImg = document.createElement("img");
		var insertImg = nextImg.setAttribute("src", "img/"+ installCat + ".png");
		nextImg.setAttribute("class", "installIcon");
		imgLi.appendChild(nextImg);	
	};
	
	//Create the edit and delete links for eash stored item in local storage
	function makeItemLinks(key, linksLi){
			
		//add editClientLink
		var editClientLink = document.createElement("a");
		editClientLink.href = "#";
		editClientLink.key = key;
		var editClientText = "Edit Client";
		editClientLink.addEventListener("click", editItem);
		editClientLink.innerHTML = editClientText;
		linksLi.appendChild(editClientLink);
			
		//add line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
			
		//Add a delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Client";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);	
	};
	
	function getData(){
		if(localStorage.length === 0){
			autoFillData();
			alert("No Clients have been entered yet.  Here is some sample data.");
		}
		//Insert data from Local Storage to the browser window.
		var chooseDiv = document.createElement("div");
		chooseDiv.setAttribute("id", "items");
		var chooseList = document.createElement("ul");
		chooseDiv.appendChild(chooseList);
		document.body.appendChild(chooseDiv);
		for (var i=0, len=localStorage.length; i<len; i++) {
			var chooseli = document.createElement("li");
			var linksLi = document.createElement("li");
			chooseList.appendChild(chooseli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Change the string from Local Storage back to an object by using JSON.parse()
			var obj = JSON.parse(value);
			var chooseSubList = document.createElement("ul");
			chooseli.appendChild(chooseSubList);
			chooseImage(obj.group[1], chooseSubList);
			for (var n in obj){
				var chooseSubli = document.createElement("li");
				chooseSubList.appendChild(chooseSubli);
				var optSubText = obj[n][0] +" "+ obj [n][1];
				chooseSubli.innerHTML = optSubText;
				chooseSubList.appendChild(linksLi);
			}
			//Create edit and delete buttons for items in local storage.
			makeItemLinks(localStorage.key(i), linksLi); 		
		}
	};
		
	function editItem(){
		//Grab the data from our item from local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
	    
		//populate the form fields with current local storage values
		$("#groups").value = item.group[1];
		$("#compname").value = item.compname[1];
		$("#contname").value = item.contname[1];
		$("#contphone").value = item.contphone[1];
		$("#contemail").value = item.contemail[1];    
		$("#date").value = item.date[1];
		$("#ipaddress").value = item.ipaddress[1];
		$("#sysuser").value = item.sysuser[1];
		$("#syspass").value = item.syspass[1];
		var checkBoxes = document.forms[0].installed;
		var storeCheckBoxes = [];
		for(var j=0; j<checkBoxes.length; j++){
			for(var k=0; k<item.installed[1].length; k++){
				if(checkBoxes[j].value === item.installed[1][k]){
					checkBoxes[j].setAttribute("checked", "checked");
				}
			}	
		}  
		var radios = document.forms[0].warranty;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "90 Days" && item.warranty[1] == "90 Days"){
				radios[i].setAttribute("checked", "checked");
			}
			if(radios[i].value == "1 Year" && item.warranty[1] == "1 Year"){
				radios[i].setAttribute("checked", "checked");
			}
			if(radios[i].value == "3 Year" && item.warranty[1] == "3 Year"){
				radios[i].setAttribute("checked", "checked");
			}
			if(radios[i].value == "5 Year" && item.warranty[1] == "5 Year"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		$("#quanity").value = item.quanity[1];
		$("#price").value = item.price[1];
		$("#notes").value = item.notes[1];
	    
		var save = document.getElementById(submitButton);
		//remove the initial listener from the input save contact button
		save.removeEventListener("click", saveData);
		//change Submit button value to edit button
		document.getElementById(submitButton).src = document.getElementById(editClientButton);
		//var editSubmit = get("editClientButton").src;
		//save the key value established in this function as a property of the edit submit event
		//so we can use that value when we save the data we edited
		document.getElementById(submitButton).addEventListener("click", validate);
		document.getElementById(submitButton).key = this.key;
	};
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this client?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Client has been deleted!");
			window.location.reload();
		}else{
			alert("Client was not Deleted!");
		}			
	};
	
	function clearStorage(){
		if(localStorage.length === 0){
			alert("You have no Clients to Clear.");
		}else{
			localStorage.clear();
			alert("All clients have been deleted.");
			window.location.reload();
			return false;
		}
	};
	
//Set Link & Submit Click Events
var displayData = $("#displayData");
displayData.addEventListener("click", showData);
var clearData = $("#clear");
clearData.addEventListener("click", clearStorage);
var save = $("#submitButton");
save.addEventListener("click", validate);
		
});



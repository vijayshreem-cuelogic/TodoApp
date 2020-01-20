(function(){
	//"use strict"; 
	var inputs = document.getElementsByClassName('validateLogin');
	Array.prototype.forEach.call(inputs, (input) => {
		input.addEventListener('keyup', (element) => {
			try 
			{
				if(!element.target.checkValidity())
					{
						element.target.classList.remove('is-valid')
						element.target.classList.add('is-invalid')
						document.getElementsByClassName("btn-primary")[0].disabled= true
					}
				else
				{
					element.target.classList.remove('is-invalid')
					element.target.classList.add('is-valid')
					document.getElementsByClassName("btn-primary")[0].disabled= false
				}
			} catch (error) {
				document.getElementsByClassName(element.target.name+"_feedback")[0].innerHTML = error;
			}
			finally
			{
				debugger
				document.getElementsByClassName(element.target.name+"_feedback")[0].innerHTML = element.target.validationMessage;
			}
		})
	});
})();

var registration = (function(){
  var loginForm = document.getElementById("registrationForm"), userData=[]
	var profileIcon = document.getElementById("profile_image")
  loginForm.onsubmit = function(event){
		try
		{
			event.preventDefault();
			event.stopPropagation();
			usersItem = JSON.parse(localStorage.getItem("users")) || []
			Array.from(event.target.elements).map(function(element){
				{ userData.push({[element.name]: element.value}) }
			})
			usersItem.push(userData)
			localStorage.setItem("users", JSON.stringify(usersItem))
			alert("Signup successfully!")
			location.replace('/public/index.html')
		}
		catch(e)
		{
			alert(e)
			loginForm.reset();
		}
	}
	
	profileIcon.onchange = function(){
		var reader = new FileReader();
		reader.onload = function () {
			var thisImage = reader.result;
			document.getElementById("avatarImg").value = thisImage
			document.getElementById("preview").src = thisImage
		};
		reader.readAsDataURL(this.files[0]);
	}
})();
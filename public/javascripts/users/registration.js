var registration = (function(){
	var signupForm = document.getElementById("registrationForm"), userData=[]
	var profileIcon = document.getElementById("profile_image")
	signupForm.onsubmit = function(event){
		try
		{
			event.preventDefault();
			event.stopPropagation();
			usersItem = JSON.parse(TodoStorage.fetch(localStorage, "users")) || []
			Array.from(event.target.elements).map(function(element){
				{ userData.push({[element.name]: element.value}) }
			})
			usersItem.push(userData)
			TodoStorage.set(localStorage, "users", JSON.stringify(usersItem))
			alert("Signup successfully!")
			location.replace('/public/src/users/login.html')
		}
		catch(e)
		{
			alert(e)
			signupForm.reset();
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

	(function(){
		//"use strict"; 
		var inputs = document.getElementsByClassName('validateSignup');
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
				} 
				catch (error) {
					document.getElementsByClassName(element.target.name+"_feedback")[0].innerHTML = error;
				}
				finally
				{
					document.getElementsByClassName(element.target.name+"_feedback")[0].innerHTML = element.target.validationMessage;
				}
			})
		});
	})();
})();
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
				document.getElementById(element.target.id+"_feedback").innerHTML = error;
			}
			finally
			{
				document.getElementById(element.target.id+"_feedback").innerHTML = element.target.validationMessage;
			}
		})
	});
})();

var registration = (function(){
  var loginForm = document.getElementById("registrationForm"), userData=[]

  loginForm.onsubmit = function(event){
    usersItem = JSON.parse(localStorage.getItem("users"))
    Array.from(event.target.elements).map(function(element){
      { userData.push({[element.name]: element.value}) }
    })
    usersItem.push(userData)
    localStorage.setItem("users", JSON.stringify(usersItem))
  }
})();
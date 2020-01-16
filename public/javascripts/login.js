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

(function(){
  var form = document.getElementById('loginForm');
  form.addEventListener('submit', (event) => {
    email = event.target.elements[0].value
    //check users available in the list
    //email === localStorage
    if(email)
    {
			localStorage.setItem("loggedIn", true);
			localStorage.setItem("current_user", email)
			localStorage.setItem("Categories",["Personal", "Professional", "Technical", "General"])
			newUrl = window.location.origin + '/public/dashboard.html'
			window.location = "www.google.com" //newUrl
			window.location.replace("www.google.com") //newUrl
    }
  })
})();

function    QueryTypeStyling (clickedRadio,ParentOfRadio) {
    let input = document.querySelector(clickedRadio);
    let inputRadio = document.querySelector(ParentOfRadio);
    input.addEventListener('click',function()
    {    
        // Remove "color" class from all radio button parents
     document.querySelectorAll('.input-radio').forEach( function(radioParent){
        radioParent.classList.remove('color');
      });

        inputRadio.classList.add("color");
    });

}
QueryTypeStyling ('.radio1','.Genralradio');
QueryTypeStyling ('.radio2','.supportradio');

let btn = document.querySelector('button');

function validation() {
    let validate = document.querySelectorAll('.validate');
    
    validate.forEach(function(inputForm) {
        let placedMessage = inputForm.getAttribute('ShowedMsg');    
        
        if (!placedMessage) {
            console.warn(`No ShowedMsg attribute found for input: ${inputForm.className}`);
            return;
        }

        let messageElement = document.querySelector(placedMessage);
        
        if (inputForm.classList.contains('fname-input') || inputForm.classList.contains('lname-input') || inputForm.classList.contains('message') || inputForm.classList.contains('email')) {
            if (inputForm.value.trim() === '') {
                messageElement.innerHTML = `<span style="color: red">This Field is required</span>`;
                inputForm.classList.add('colorborder');
            } else {
                messageElement.innerHTML = ''; // Clear the error message if valid
                inputForm.classList.remove('colorborder');
            }
        }

        if (inputForm.classList.contains('email')) {
            if (!inputForm.value.includes('@') || !inputForm.value.includes('.')) {
                messageElement.innerHTML = `<span style="color: red">Please enter a valid email address</span>`;
                inputForm.classList.add('colorborder');
            } else {
                messageElement.innerHTML = ''; // Clear the error message if valid
                inputForm.classList.remove('colorborder');
            }
        }

        if (inputForm.classList.contains('checkbox')) {
            if (!inputForm.checked) {
                messageElement.innerHTML = `<p style="color: red;margin-top:-6px;" >To submit this form, please consent to be contacted</p>`;
            } else {
                messageElement.innerHTML = ''; // Clear the error message if valid
            }
        }

        if (inputForm.type === 'radio') {
            let flag = false; 
            document.querySelectorAll(`input[name="${inputForm.name}"]`).forEach(function(radioParent) {
                if (radioParent.checked) {
                    flag = true;
                }
            });

            if (!flag) {
                messageElement.innerHTML = `<span style="color: red;display:block;margin-top:-10;">Please select a query type</span>`;
                inputForm.classList.add('colorborder');
            } else {
                messageElement.innerHTML = ''; // Clear the error message if valid
                inputForm.classList.remove('colorborder');
            }
        }
    });
}

btn.addEventListener('click', function() {
    validation();
});









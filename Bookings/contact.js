$(function () {

    window.verifyRecaptchaCallback = function (response) {
        $('input[data-recaptcha]').val(response).trigger('change');
    }

    window.expiredRecaptchaCallback = function () {
        $('input[data-recaptcha]').val("").trigger('change');
    }

	
	function isFormAvailable(){
		var email = document.getElementById("form_email").value;
		return (email != null && email != "");
	}

    function initPayPalButton() {
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'horizontal',
          label: 'paypal',
          
        },

        createOrder: function(data, actions) {
		  var readingType = document.getElementById("readingType").value;
		  var price = 60;
		  if (readingType === "1") price = 30;
			  
			  
          return actions.order.create({
		     purchase_units: [{"amount":{"currency_code":"GBP","value": price }}]
          });
        },

        onApprove: function(data, actions) {
		  		  
          return actions.order.capture().then(function(details, data) {
			
			document.getElementById("email").value = details.payer.email_address;
			
			var $form = $('#booking-form');
			

			// Use Ajax to submit form data
			var url = 'https://script.google.com/macros/s/AKfycbxIGFA-DE92Zw6JgyTJzuyJhtnzWeBhphgjXUCRo_HEp73UZEZjfd8h6A/exec';			

			var jqxhr = $.post(url, $form.serialize(), function(data) {
				console.log("Success! Data: " + data.statusText);		
			}).done(function (){
				document.getElementById("booking-form").style.display="none";
				document.getElementById("success-box").style.display="block";
			}).fail(function(data) {
				console.warn("Error! Data: " + data.statusText);
				// HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
				if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
					//alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
					$(location).attr('href',redirectUrl);   
				}
			});

          });
        },

        onError: function(err) {
          console.log(err);
        }
      }).render('#paypal-button-container');
    }
    initPayPalButton();

    
});
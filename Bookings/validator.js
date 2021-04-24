+function ($) {
  'use strict';
  $('#smart-button-container').hide();
  var form = $( "#booking-form" );

  var isFormValid = function (){
	  return ($("#form_email").val().length > 0 &&
			  $("#form_message").val().length > 0);
	  
  }

  $("#form_name").keyup(function() {

	var validator = $( "#booking-form" ).validate();
	validator.element( "#form_name" );
	  if (isFormValid()) {
		$('#smart-button-container').show();
		$('#paypal-conintener').hide();
	  } else {
		$('#smart-button-container').hide();
		$('#paypal-conintener').show();
	  }
   });
  $("#form_zodiac").keyup(function() {
	  var validator = $( "#booking-form" ).validate();
	  validator.element( "#form_zodiac" );
	  if (isFormValid()) {
		$('#smart-button-container').show();
		$('#paypal-conintener').hide();
	  } else {validator.element( "#form_zodiac" )
		$('#smart-button-container').hide();
		$('#paypal-conintener').show();
	  }
   });
  $("#form_message").keyup(function() {
	  var validator = $( "#booking-form" ).validate();
	  validator.element( "#form_message" );
	  
	  if (isFormValid()) {
		$('#smart-button-container').show();
		$('#paypal-conintener').hide();		
	  } else {
		$('#smart-button-container').hide();
		$('#paypal-conintener').show();
	  }
   });  
   
}(jQuery);

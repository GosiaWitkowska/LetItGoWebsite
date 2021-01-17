$(function () {

    window.verifyRecaptchaCallback = function (response) {
        $('input[data-recaptcha]').val(response).trigger('change');
    }

    window.expiredRecaptchaCallback = function () {
        $('input[data-recaptcha]').val("").trigger('change');
    }

    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
		
        if (!e.isDefaultPrevented()) {
			e.preventDefault();

			// Get the form instance
			var $form = $(e.target);

			// Get the BootstrapValidator instance
			var bv = $form.data('bootstrapValidator');

			// Use Ajax to submit form data
			var url = 'https://script.google.com/macros/s/AKfycbxIGFA-DE92Zw6JgyTJzuyJhtnzWeBhphgjXUCRo_HEp73UZEZjfd8h6A/exec';
			var redirectUrl = 'success-page.html';
			// show the loading 
			$('#postForm').prepend($('<span></span>').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate'));
			var jqxhr = $.post(url, $form.serialize(), function(data) {
				console.log("Success! Data: " + data.statusText);
				$(location).attr('href',redirectUrl);
				grecaptcha.reset();
			})
			.fail(function(data) {
				console.warn("Error! Data: " + data.statusText);
				// HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
				if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
					//alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
					$(location).attr('href',redirectUrl);   
				}
			});
        }
    })
});
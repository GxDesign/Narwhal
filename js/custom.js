$(function(){
	var menu_ht = $(".navbar-collapse").offsetHeight;

	// Toggle navbar
    var toggleNav = function(){
    	$(".navbar-collapse").slideToggle();
    	if(window.matchMedia("(max-width: 767px)").matches) {
	    	$("body").toggleClass("collapsed");
			if($(document).scrollTop() === 0){
				$("header").toggleClass("down");
				$("body").toggleClass("locked");
			}
		}
	}

	$(".navbar-toggle").click(function(){
		toggleNav()
	});
    
    // Close on menu item click 

	$(".nav li").click(function(){
		toggleNav()
	});

	// Minimize Navbar

	$(window).scroll(function(){
		var position = $(document).scrollTop();
		if(window.matchMedia("(max-width: 767px)").matches) {
			if(position === 0) {
				$(".navbar-header").removeClass("smaller");
			} else {
				$(".navbar-header").addClass("smaller");
			}
		}


	});

    $(window).resize(function(){
    	if(window.matchMedia("(min-width: 768px)").matches) {
    		if($("body").hasClass("collapsed")){
	    		$(".navbar-collapse").slideUp();
	    		$("body").removeClass("collapsed, locked");
	    		$("header").removeClass("down");
	    	}
    	}
    });
	

	// Smooth Scroll

	$('a[href*="#"]:not([href="#"])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return true;
	      }
	    }
	});

	var validateForm = function(form_id) {
	  var isValid = true;
	  var form = $(document.getElementById(form_id));
	  var fields = form.find(".form-control");
	  $(fields).each(function() {
	    if (($(this).val().trim() === '') && $(this).hasClass("required")) {
	        isValid = false;
	        $(this).addClass("invalid");
	    } else if($(this).attr('type') === "email") {
	    	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(!(regex.test($(this).val()))){
				isValid = false;
		        $(this).addClass("invalid");
		    } else {
		    	$(this).removeClass("invalid");
		    }
	    } else {
	    	$(this).removeClass("invalid");
	    }
	  });

	  // Create error message 

	  if(!isValid) {
	  	var invalid_fields = [];
	  	$(".form-control.invalid").map(function () {
		  var name = $(this).attr("name");
		  invalid_fields.push(name);
		});

		if(invalid_fields.length > 1) { 
			var relative_to_qty = " are " 
		} else {
			var relative_to_qty = " is "
		}
 
	  	var msg = "Your " + invalid_fields.join(" and ") + relative_to_qty + "invalid.";
	  	form.find(".invalid-msg").text(msg)
	  } else {
	  	form.find(".invalid-msg").css("display","none");
	  	form.find(".form-control").val("");
	  	$(".contact-thanks").fadeIn();

	  	setTimeout(function(){
	  		$(".contact-thanks").fadeOut();
	  	}, 3000)
	  }
	  return isValid;
	}

	$(".submit").click(function(e){
		e.preventDefault();
		validateForm($(this).data("for"));
	});

    

})
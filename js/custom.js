$(function(){
	var menu_ht = $(".navbar-collapse").offsetHeight;
	$(".navbar-toggle").click(function(){
		$(".navbar-collapse").slideToggle();
		$("body").toggleClass("collapsed");
	});

	$(".nav li").click(function(){
		$(".navbar-toggle").trigger("click");
	})
})
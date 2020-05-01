jQuery(document).ready(function(){
  jQuery(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    });
    
    jQuery(".zoom").hover(function(){
		
		jQuery(this).addClass('transition');
	}, function(){
        
		jQuery(this).removeClass('transition');
	});
});

// Open/Close ToolBar
jQuery(document).ready (function () {
    jQuery('#toggle_quick_options').on('click', function(e) {
        var wrap = jQuery(this).parents('.trx_addons_demo_options_wrapper');
        if( wrap.hasClass('open') ){
            jQuery(this).parents('.trx_addons_demo_options_wrapper').removeClass('open');
        } else {
            jQuery(this).parents('.trx_addons_demo_options_wrapper').toggleClass('open');
        }
        e.preventDefault();
        return false;
    });
});



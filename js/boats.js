/* global jQuery:false */
/* global TRX_ADDONS_STORAGE:false */

// Init boats functionality
jQuery(document).on('action.ready_trx_addons', function() {

	"use strict";
	
	// Single Property's page: Change featured image on click on the gallery image
	jQuery('.boats_page_gallery:not(.inited)')
		.addClass('inited')
		.on('click', '.boats_page_gallery_item', function(e) {
			if (jQuery(this).hasClass('boats_page_gallery_item_active')) return;
			jQuery(this).siblings().removeClass('boats_page_gallery_item_active');
			jQuery(this).addClass('boats_page_gallery_item_active');
			var image = jQuery(this).data('image');
			if (!image) return;
			var featured = jQuery(this).parent().prev('.boats_page_featured');
			var img_old = featured.find('img');
			var h = img_old.height();
			featured.height(h);
			img_old.animate({'opacity': 0}, 300, function() {
				jQuery(this).attr({
					'src': image,
					'srcset': ''
					}).animate({'opacity': 1}, 400, function() {
						featured.height('auto');
					});
				setTimeout(function() {
					featured.height(img_old.height());
				}, 100);
			});
			e.preventDefault();
			return false;
		});
	
	// boats Compare: add item
	function trx_addons_boats_compare_list_add(id, cmp_icon) {
		var title = cmp_icon.siblings('.sc_boats_item_title').text();
		var list = trx_addons_get_cookie('trx_addons_boats_compare_list');
		if (!list) list = {};
		else list = JSON.parse(list);
		list['id_'+id] = encodeURIComponent(title);
		trx_addons_set_cookie('trx_addons_boats_compare_list', JSON.stringify(list), 365);
		cmp_icon.addClass('in_compare_list');
		var widget_list = jQuery('.widget_boats_compare .boats_compare_list');
		if (widget_list.length > 0) {
			widget_list.append('<li data-property-id="'+id+'">'+title+'</li>');
			if (widget_list.find('li').length < 2)
				widget_list.addClass('boats_compare_list_empty');
			else
				widget_list.toggleClass('boats_compare_list_empty', false);
		}
	}
	
	// boats Compare: remove item
	function trx_addons_boats_compare_list_remove(id) {
		var list = trx_addons_get_cookie('trx_addons_boats_compare_list');
		if (!list) list = {};
		else list = JSON.parse(list);
		if (typeof list['id_'+id] != 'undefined') {
			delete list['id_'+id];
		}
		trx_addons_set_cookie('trx_addons_boats_compare_list', JSON.stringify(list), 365);
		jQuery('.sc_boats_item_compare.in_compare_list[data-property-id="'+id+'"]').removeClass('in_compare_list');
		var widget_list = jQuery('.widget_boats_compare .boats_compare_list');
		widget_list.find('li[data-property-id="'+id+'"]').remove();
		if (widget_list.find('li').length < 2)
			widget_list.addClass('boats_compare_list_empty');
		else
			widget_list.toggleClass('boats_compare_list_empty', false);
	}
	
	// boats archive: Compare button
	jQuery('.sc_boats:not(.inited)')
		.addClass('inited')
		.on('click', '.sc_boats_item_compare', function(e) {
			// Remove item from the Compare list
			if (jQuery(this).hasClass('in_compare_list')) {
				trx_addons_boats_compare_list_remove(jQuery(this).data('property-id'));

			// Add item to the Compare list
			} else {
				trx_addons_boats_compare_list_add(jQuery(this).data('property-id'), jQuery(this));
			}
			e.preventDefault();
			return false;
		});

	// Widget "boats Compare": Remove item from the list
	jQuery('.widget_boats_compare .boats_compare_list:not(.inited)')
		.addClass('inited')
		.on('click', 'li', function(e) {
			trx_addons_boats_compare_list_remove(jQuery(this).data('property-id'));
			e.preventDefault();
			return false;
		});
	
	// Widget "boats Order": Submit form on change sorting field
	jQuery('select[name="boats_order"]:not(.inited)')
		.addClass('inited')
		.on('change', function(e) {
			jQuery(this).parents('form').submit();
			e.preventDefault();
			return false;
		});
	
	// Widget "boats Advanced Search": Show/Hide Advanced fields
	jQuery('.boats_search_show_advanced:not(.inited)')
		.addClass('inited')
		.on('click', function () {
			jQuery(this).parents('.boats_search').toggleClass('boats_search_opened');
		});
	
	// Widget "boats Advanced Search": Field "Country" is changed - refresh states
	jQuery('select[name="boats_country"]:not(.inited)')
		.addClass('inited')
		.on('change', function () {
			var fld = jQuery(this);
			var slave_fld = fld.parents('form').find('select[name="boats_state"]');
			if (slave_fld.length > 0) {
				var slave_lbl = slave_fld.parents('label');
				trx_addons_refresh_list('states', fld.val(), slave_fld, slave_lbl);
			}
		});

	// Widget "boats Advanced Search": Field "State" is changed - refresh cities
	jQuery('select[name="boats_state"]:not(.inited)')
		.addClass('inited')
		.on('change', function () {
			var fld = jQuery(this);
			var slave_fld = fld.parents('form').find('select[name="boats_city"]');
			if (slave_fld.length > 0) {
				var slave_lbl = slave_fld.parents('label');
				var country = 0;
				if (fld.val() == 0) country = fld.parents('form').find('select[name="boats_country"]').val();
				trx_addons_refresh_list('cities', {'state': fld.val(), 'country': country}, slave_fld, slave_lbl);
			}
		});

	// Widget "boats Advanced Search": Field "City" is changed - refresh neighborhoods
	jQuery('select[name="boats_city"]:not(.inited)')
		.addClass('inited')
		.on('change', function () {
			var fld = jQuery(this);
			var slave_fld = fld.parents('form').find('select[name="boats_neighborhood"]');
			if (slave_fld.length > 0) {
				var slave_lbl = slave_fld.parents('label');
				trx_addons_refresh_list('neighborhoods', fld.val(), slave_fld, slave_lbl);
			}
		});

});
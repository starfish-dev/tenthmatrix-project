jQuery(document).ready(function($) {

	function slick_init() {

		$('.works-slider').on('init', function(slick){
			$(this).fadeIn(1000);
		}).slick({
			dots: true,
			infinite: true,
			arrows: false,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true
		});

		$('.catalogue-slider').on('init', function(slick){
			$(this).fadeIn(1000);
		}).slick({
			dots: true,
			infinite: true,
			arrows: false,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});

		$('.directories-slider').on('init', function(slick){
			$(this).fadeIn(1000);
		}).slick({
			dots: true,
			infinite: true,
			arrows: false,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});

		$('.price-list-slider').on('init', function(slick){
			$(this).fadeIn(1000);
		}).slick({
			dots: true,
			infinite: true,
			arrows: false,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});
	}
	slick_init();


	function fancybox_init() {
		$('.fancybox').fancybox({
			// Options will go here
		});
	}
	fancybox_init();

	function check_read_more_text() {
		$('.read-more').click(function(e){
			e.preventDefault();
			if ( !$(this).closest('.card-body').find('.full-text').text() ) {
				$(this).closest('.card-body').find('.read-more').remove();
			}
		});
		$(".read-more").trigger( "click" );
		$(".read-more").trigger( "click" );
		$('.client-testimonials .card').show();
	}
	check_read_more_text();

	function view_more_init() {
		$('.read-more').click(function(e){
			e.preventDefault();
			if ( !$(this).closest('.card-body').find('.full-text').text() ) {
				$(this).closest('.card-body').find('.read-more').remove();
			}
			$(this).closest('.card-body').find('.full-text').toggle(function () {
			    $(this).closest('.card-body').find('.full-text').addClass("show");
			}, function () {
			    $(this).closest('.card-body').find('.full-text').removeClass("show");
			});
		});
	}
	view_more_init();

	function multiple_dropdown() {
		$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
			if (!$(this).next().hasClass('show')) {
				$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
			}
			var $subMenu = $(this).next(".dropdown-menu");
			$subMenu.toggleClass('show');

			$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
				$('.dropdown-submenu .show').removeClass("show");
			});
			return false;
		});
	}
	multiple_dropdown();
});

function topNavToSelect() {
	// building select menu
	$('<select class="upper-nav" />').appendTo('.upperHeader .container');

	// building an option for select menu
	$('<option />', {
		'selected': 'selected',
		'value' : '',
		'text': 'Choise Page...'
	}).appendTo('.upperHeader .container select');

	$('.upperHeader ul.inline li a').each(function(){
		var target = $(this);

		$('<option />', {
			'value' : target.attr('href'),
			'text': target.text()
		}).appendTo('.upperHeader .container select');
	});
	// on clicking on link
	$('.upperHeader .container select').on('change',function(){
		window.location = $(this).find('option:selected').val();
	});
}

// building select .navbar for mobile width only
function NavToSelect() {

	// building select menu
	$('<select />').appendTo('.navbar');

	// building an option for select menu
	$('<option />', {
		'selected': 'selected',
		'value' : '',
		'text': 'Choise Page...'
	}).appendTo('.navbar select');

	$('.navbar ul li a').each(function(){
		var target = $(this);

		$('<option />', {
			'value' : target.attr('href'),
			'text': target.text()
		}).appendTo('.navbar select');
	});
	// on clicking on link
	$('.navbar select').on('change',function(){
		window.location = $(this).find('option:selected').val();
	});

}


// bootstrap tooltip invocking
function showtooltip() {
	$('a[data-toggle=tooltip], button[data-toggle=tooltip], input[data-toggle=tooltip]')
	.tooltip({
		animation:false
	});
}

function cartContent() {
	var $cartContent = $('.cart-content');
	$cartContent.find('table').click(function(e){
		e.stopPropagation();
	});
}

// flexslider on home page
function flexSlideShow() {
	$('.flexslider').flexslider({
		 animation: "slide",
		 slideshowSpeed: 4000,
		 directionNav: false,
		 pauseOnHover: true,
		 directionNav: false
	});
}

// bootstrap carousel in caregories grid and list
function productSlider() {
	$('.carousel').carousel();
}


// link fancybox plugin on product detail
function productFancyBox() {
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});
}

// dropdown mainnav
function dropdownMainNav() {
	var navLis = $('div.navbar > ul.nav > li');
	navLis.hover(
		function () {
			// hide the css default behavir
			$(this).children('div').css('display', 'none');
			//show its submenu
			$(this).children('div').slideDown(150);
		}, 
		function () {
			//hide its submenu
			$(this).children('div').slideUp(350);		
		}
	);

}

// display your twiter feed here
function latestTweets() {
	
    $(".tweet").tweet({
        username: "seaofclouds",
        join_text: "auto",
        avatar_size: 0,
        count: 3,
        auto_join_text_default: "we said,", 
        auto_join_text_ed: "we",
        auto_join_text_ing: "we were",
        auto_join_text_reply: "we replied to",
        auto_join_text_url: "we were checking out",
        loading_text: "loading tweets..."
    });
}

// open and hide the side panel
function openSidePanel() {
	var widgetToggleLink = $('a.Widget-toggle-link'),
		$switcher = $(".switcher");

	widgetToggleLink.on('click', function(e){
		e.preventDefault();
		var left = $switcher.css('left');
		if(left <= '-170px'){
			$switcher.animate({
				left: 0
			}, 200, function(){
				$(this).find(widgetToggleLink).text('-');
			});
		}else{
			$switcher.animate({
				left: '-170px'
			}, 200, function(){
				$(this).find(widgetToggleLink).text('+');
			});
		}
	});
}


// change background pattern
function changeBackgroundPattern() {
	/* cookie vars */
	var cookie_name1 = "site_pattern";
	var cookie_options1 = { path: '/', expires: 30 };
	var get_cookie1 = $.cookie('site_pattern');
	if(get_cookie1 == null){get_cookie1 = 'retina_wood'}
	// backgrounds
	$('head')
	.append('<link rel="stylesheet" id="active-bg" href="css/backgrounds/'+get_cookie1+'.css">');

	$(".switcher > .switcher-content > .pattern-switch").find('a').bind('click', function(e) {
		$('#active-bg').remove();
		e.preventDefault();
		var bgName = $(this).text();
		$.cookie(cookie_name1, bgName, cookie_options1);
		$('head')
		.append('<link rel="stylesheet" id="active-bg" href="css/backgrounds/'+bgName+'.css">');
	});
}


// change layoutStyle
function changeLayoutStyle() {
	/* cookie vars */
	var cookie_name2 = "site_layout";
	var cookie_options2 = { path: '/', expires: 30 };
	var get_cookie2 = $.cookie('site_layout');
	if(get_cookie2 == null){get_cookie2 = 'Wide'}
	//layout
	$('head')
	.append('<link rel="stylesheet" id="active-bg" href="css/layout/'+get_cookie2+'.css">');
	$(".switcher > .switcher-content > .layout-switch").find('a').bind('click', function(e){
		$('#active-layout').remove();
		e.preventDefault();
		var layoutName = $(this).text();
		$.cookie(cookie_name2, layoutName, cookie_options2);
		$('head')
		.append('<link rel="stylesheet" id="active-layout" href="css/layout/'+layoutName+'.css">');

	});
}


// change site color
function changeColorStyle() {
	/* cookie vars */
	var cookie_name3 = "site_color";
	var cookie_options3 = { path: '/', expires: 30 };
	var get_cookie3 = $.cookie('site_color');
	if(get_cookie3 == null){get_cookie3 = 'orange'}
	//layout
	$('head')
	.append('<link rel="stylesheet" id="active-bg" href="css/color/'+get_cookie3+'.css">');
	$(".switcher > .switcher-content > .color-switch").find('a').bind('click', function(e){
		$('#active-color').remove();
		e.preventDefault();
		var colorName = $(this).text();
		$.cookie(cookie_name3, colorName, cookie_options3);
		$('head')
		.append('<link rel="stylesheet" id="active-color" href="css/color/'+colorName+'.css">');

	});
}


// range price product
function rangePriceSlider() {
	var $slideRange = $("#slider-range"),
		amount = $( "#amount" );
	$slideRange.slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        amount.val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    amount.val( "$" + $slideRange.slider( "values", 0 ) +
      " - $" + $slideRange.slider( "values", 1 ) );
}


$(document).ready(function(){
	topNavToSelect();
	NavToSelect();
	showtooltip();
	cartContent();
	flexSlideShow();
	productSlider();
	productFancyBox();
	dropdownMainNav();
	latestTweets();
	openSidePanel();
	changeBackgroundPattern();
	changeLayoutStyle();
	changeColorStyle();
	rangePriceSlider();

	// $("#stars").mouseout(function(){
 //    	currentStarState("2", "5");
	// });
});

//we pass id of star where mouse cursor is
//and change class for every previous star
function star(rate){
    for(var i = 1; i <= rate; i++){
        document.getElementById("rate_" + i).setAttribute("class", "staron");
    }
}
//we change class of all stars back to empty star
function unstar(max){
	console.log("unstar");
    for(var i = 1; i <= max; i++){
    	document.getElementById("rate_" + i).setAttribute("class", "staroff");
    }
}
function currentStarState(currentRating, max){
	console.log("outOFstar");
    for(var i = 1; i <= max; i++){
        if(i>currentRating) document.getElementById("rate_" + i).setAttribute("class", "staroff");
        else document.getElementById("rate_" + i).setAttribute("class", "staron");
    }
}
//generate stars
//first param - amount of stars
//second param - id of div where to attach stars
function generate_stars(resId, currentRating, max, attach){
    //get div container
    var container = document.getElementById(attach);
    console.log(container);
    for(var i = 1; i <= max; i++){
        //create star
        var div = document.createElement("div");
        if(i>currentRating) div.setAttribute("class", "staroff");
        else div.setAttribute("class", "staron");
        div.setAttribute("id", "rate_" + i);
        //set events
        div.setAttribute("onmouseover", "star(" + i + ")");
        div.setAttribute("onmouseout", "unstar(" + max + ")");
        div.setAttribute("onclick", "updateRating(" + resId + ", " + i + ")");
        //append child to contaner
        container.appendChild(div);
    }
    // container.setAttribute("onmouseout", "currentStarState(" + currentRating + ", " + max + ")");
}

function generate_static_stars(resId, currentRating, max, attach){
    //get div container
    var container = document.getElementById(attach);
    console.log(container);
    for(var i = 1; i <= max; i++){
        //create star
        var div = document.createElement("div");
        if(i>currentRating) div.setAttribute("class", "staroff");
        else div.setAttribute("class", "staron");
        //append child to contaner
        container.appendChild(div);
    }
}



function updateRating(resId, r){
    console.log(resId + " -> " + r);
    $.post("updateRating", {"resId":resId, "r":r}, function(data){$("#rate").html(data)}, "json");
}

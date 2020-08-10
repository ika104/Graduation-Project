function openModal()
{
  $('#modal-btn').on('click', function(e){
  $('#myModal').modal('show');
  e.preventDefault();
});
}

const DATABASE_URL = "http://invittus.com/project-1/";
const ADD_USER_URL = DATABASE_URL+"/api/user/addUser/";
const QR_URL=DATABASE_URL+"QR/"+"Create"

$(document).ready(function() {
	'use strict';
	/*-----------------------------------------------------------------------------------*/
	/*	STICKY HEADER
	/*-----------------------------------------------------------------------------------*/
	if ($(".navbar").length) {
		var options = {
			offset: 350,
			offsetSide: 'top',
			classes: {
				clone: 'banner--clone fixed',
				stick: 'banner--stick',
				unstick: 'banner--unstick'
			},
			onStick: function() {
				$($.SmartMenus.Bootstrap.init);
			},
			onUnstick: function() {
				$('.search-dropdown .dropdown-menu').collapse('hide');
			}
		};
		var banner = new Headhesive('.navbar', options);
	}
	/*-----------------------------------------------------------------------------------*/
	/*	MENU SLIDER
	/*-----------------------------------------------------------------------------------*/
	$('#main-slider').revolution({
		sliderType: "standard",
		sliderLayout: "fullwidth",
		fullScreenOffsetContainer: ".navbar:not(.fixed)",
		spinner: "spinner",
		dottedOverlay: '',
		delay: 9000,
		shadow: 0,
		gridwidth: [1240, 1024, 778, 480],
		gridheight: [750, 750, 850, 750],
		responsiveLevels: [1240, 1124, 778, 480],
		navigation: {
			keyboardNavigation: 'on',
			keyboard_direction: 'horizontal',
			arrows: {
				enable: false
			},
			touch: {
				touchenabled: 'on',
				swipe_threshold: 75,
				swipe_min_touches: 1,
				swipe_direction: 'horizontal',
				drag_block_vertical: true
			},
			bullets: {
				enable: false
			}
		}
	});
	
	$('#qr-submit').on("click",function()
    {
        let name = $("#qr-name").val();
        let workPosition = $("#qr-workPosition").val();
		let bloodType = $("#qr-bloodType").val();
		let cuuAddress = $("#qr-address").val();
		let closePerName = $("#qr-closeName1").val();
		let closePerAddress = $("#qr-closeAddress1").val();
		let closePerPhone = $("#qr-closeNumber1").val();
		let closePerName2 = $("#qr-closeName2").val();
		let closePerAddress2 = $("#qr-closeAddress2").val();
		let closePerPhone2 = $("#qr-closeNumber2").val();
		let userId = sessionStorage.getItem("userId");
        alert(name +" "+ workPosition +" "+ bloodType +" "+ userId);
        $.ajax({
            accept:"application/json",
            type:"POST",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: ADD_USER_URL+userId,
			data: JSON.stringify({"name":name,"workPosition":workPosition,"bloodType":bloodType,"currentAddress":cuuAddress,
			                      "nameClosePerson":closePerName,"numberClosePerson":closePerPhone,
								  "adderssClosePerson":closePerAddress,"secNameClosePerson":closePerName2,
								  "secNumberClosePerson":closePerPhone2,"secAdderssClosePerson":closePerAddress2}),
            success: function(data) {
				$.ajax({
					accept:"application/json",
					type:"POST",
					contentType:'application/json; charset=utf-8',
					dataType: 'json',
					url: QR_URL,
					data: JSON.stringify(data),
					success: function() {
						
						alert("User added Successfully");
					},
					error: function(){
						alert("Oops, Something went wrong");
					}
				});



                alert("welcome "+ data["id"]);
            },
            error: function(){
                alert("errrrrrrrrrrrrrrrrrrror");
            }
        });

        alert("2y 7aga");
    })
	/*-----------------------------------------------------------------------------------*/
	/*	PROGRESSBAR
	/*-----------------------------------------------------------------------------------*/
	var $pline = $('.progressbar.line');
	var $pcircle = $('.progressbar.circle');
	$pline.each(function(i) {
		var line = new ProgressBar.Line(this, {
			strokeWidth: 3,
			trailWidth: 3,
			duration: 3000,
			easing: 'easeInOut',
			text: {
				style: {
					color: 'inherit',
					position: 'absolute',
					right: '0',
					top: '-30px',
					padding: 0,
					margin: 0,
					transform: null
				},
				autoStyleContainer: false
			},
			step: function(state, line, attachment) {
				line.setText(Math.round(line.value() * 100) + ' %');
			}
		});
		var value = ($(this).attr('data-value') / 100);
		$pline.waypoint(function() {
			line.animate(value);
		}, {
			offset: "100%"
		})
	});
	$pcircle.each(function(i) {
		var circle = new ProgressBar.SemiCircle(this, {
			strokeWidth: 5,
			trailWidth: 5,
			duration: 2000,
			easing: 'easeInOut',
			step: function(state, circle, attachment) {
				circle.setText(Math.round(circle.value() * 100));
			}
		});
		var value = ($(this).attr('data-value') / 100);
		$pcircle.waypoint(function() {
			circle.animate(value);
		}, {
			offset: "100%"
		})
	});

	/*-----------------------------------------------------------------------------------*/
	/*	OWL CAROUSEL
	/*-----------------------------------------------------------------------------------*/
	$('.basic-slider').each(function() {
		var $bslider = $(this);
		$bslider.owlCarousel({
			items: 1,
			nav: false,
			dots: true,
			dotsEach: true,
			autoHeight: true,
			loop: true,
			margin: $bslider.data("margin")
		});
	});
	$('.carousel').each(function() {
		var $carousel = $(this);
		$carousel.owlCarousel({
			autoHeight: false,
			nav: false,
			dots: $carousel.data("dots"),
			dotsEach: true,
			loop: $carousel.data("loop"),
			margin: $carousel.data("margin"),
			autoplay: $carousel.data("autoplay"),
			autoplayTimeout: $carousel.data("autoplay-timeout"),
			responsive: $carousel.data("responsive")
		});
	});

});
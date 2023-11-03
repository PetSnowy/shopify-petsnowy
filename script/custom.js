$(document).ready(function () {

	function debounce(func, delay) {
		let timeoutId;
		return function () {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func.apply(this, arguments);
			}, delay);
		};
	}

	//获取价格单位
	const currencyTemp = document.querySelectorAll('.price_with_discount .money').length ? document.querySelectorAll('.price_with_discount .money') : document.querySelectorAll('.price_with_discount')
	const currency = currencyTemp[0]?.innerHTML || currencyTemp[0]?.innerText
	const monetaryUnit = currency && currency.replace(/[\d.]/g, '')

	$(".slide_arrow svg").click(function () {
		document.querySelector('.new-index-litter').scrollIntoView({ behavior: "smooth", block: "center" })
	});

	function onCloseButtonClick(event) {
		const detailsElement = event.currentTarget.closest('details');
		closeSubmenu(detailsElement);
	}

	function closeSubmenu(detailsElement) {
		const parentMenuElement = detailsElement.closest('.submenu-open');
		parentMenuElement && parentMenuElement.classList.remove('submenu-open');
		detailsElement.classList.remove('menu-opening');
		detailsElement.querySelector('summary').setAttribute('aria-expanded', false);
		removeTrapFocus(detailsElement.querySelector('summary'));
		closeAnimation(detailsElement);
	}

	function closeAnimation(detailsElement) {
		let animationStart;
		const handleAnimation = (time) => {
			if (animationStart === undefined) {
				animationStart = time;
			}
			const elapsedTime = time - animationStart;

			if (elapsedTime < 400) {
				window.requestAnimationFrame(handleAnimation);
			} else {
				detailsElement.removeAttribute('open');
				if (detailsElement.closest('details[open]')) {
					trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
				}
			}
		}
		window.requestAnimationFrame(handleAnimation);
	}

	//Contact scroll js 
	$("span.itg_contact_details_nav").click(function (e) {
		const target = document.body
		var windowSize = $(window).width();
		if (windowSize <= 990) {
			onCloseButtonClick(e)
			target.classList.remove('overflow-hidden-tablet')
		}
		// document.querySelector('.footer__blocks-wrapper').scrollIntoView({ behavior: "smooth", block: "end" })
		window.location.assign('/pages/contact')
	});


	$(".close_announcement").click(function () {
		$(".announcement-bar").hide();
	});

	$(".accordion_head").click(function () {
		if ($(".accordion_body").is(":visible")) {
			$(".accordion_body").slideUp(400);
			$(".plusminus").text("+");
		}
		if ($(this).next(".accordion_body").is(":visible")) {
			$(this).next(".accordion_body").slideUp(400);
			$(this).children(".plusminus").text("+");
		} else {
			$(this).next(".accordion_body").slideDown(400);
			$(this).children(".plusminus").text("-");
		}
	});

	// Q-and-A section ...jquery....
	$(".answer_txt").hide();
	$("span.onc_arrow").css("transform", "rotate(180deg)");
	$(".ques_title").click(function () {
		if ($(".answer_txt").is(":visible")) {
			$(".answer_txt").slideUp();
			$("span.onc_arrow").css("transform", "rotate(180deg)");
		}

		if ($(this).next(".answer_txt").is(":visible")) {
			$(this).next(".answer_txt").slideUp();
			$(this).children("span.onc_arrow").css("transform", "rotate(180deg)");

		} else {
			$(this).next(".answer_txt").slideDown();
			$(this).children("span.onc_arrow").css("transform", "rotate(0deg)");
		}
	});

	//popup redirect js
	$('.button.order_bannr_btn').on("click", function () {
		$('button.needsclick.kl-teaser-WbBgwU').trigger('click');
	});

	//video popup slider
	$('.cs_video_big').owlCarousel({
		loop: true,
		margin: 0,
		nav: false,
		dots: false,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	});

	// youtube popup js 
	$('.img_icon_svg').on("click", function () {
		$('.top_inno_iframe').css('display', 'block');
	});

	$('span.close_popup').on("click", function () {
		$('.top_inno_iframe').css('display', 'none');
	});

	$('.img_icon_svg').click(function () {
		var data_url = $(this).closest('.img_icon_svg').attr('data-video-url');
		$('.modal_popup .top_inno_iframe iframe').attr('src', data_url);
	});


	// Custom Bundle Functionlity

	//custom-cart-image-chnage
	var searchParams = new URLSearchParams(window.location.search);
	var paramhandle = searchParams.get('customcart');

	var product_handle = localStorage.getItem("product_handle");

	if (product_handle !== null) {
		localStorage.removeItem("product_handle");
		localStorage.removeItem("addons_data");
	}
	if (product_handle == null) {

		if (paramhandle != undefined) {
			$(".main_prodcut_contain").each(function () {
				var mainhandle = $(this).attr('data-handle');
				if (mainhandle == paramhandle) {
					$(this).show().addClass('active');
				} else {
					$(this).hide().removeClass('active');
				}
			});
			$(".main_product_summary ul li").each(function () {
				var checkhandle = $(this).attr('replace_data');
				if (checkhandle == paramhandle) {
					$(this).show();
					$(this).find('.quantity__input').addClass('finalproduct_qty');
				} else {
					$(this).hide();
				}
			});
		}
	}

	//end-custom-cart-image-chnage

	$(document).on("click", ".headr_odr_now", function () {
		localStorage.removeItem("product_handle");
		localStorage.removeItem("addons_data");
	});

	$(document).on("click", "button.btn_change_product", function () {
		$('.tabcontent_first').addClass('minified_layout');
	});

	$(document).on("click", ".main_product_label", function () {
		localStorage.removeItem("product_handle");
		localStorage.removeItem("addons_data");

		localStorage.removeItem("variant_main_title");
		localStorage.removeItem("variant_main_id");
		localStorage.removeItem("variant_main_price");
		localStorage.removeItem("variant_main_compareprice");
		localStorage.removeItem("variant_main_image");
		localStorage.removeItem("variant_main_lablename");

		var origin = window.location.origin;
		var pro_url = $(this).attr('for');
		var cart_url_final = origin + '/cart' + pro_url;
		var obj = { Title: 'ChangeUrl', Url: cart_url_final };
		history.pushState(obj, obj.Title, obj.Url);
		window.location.assign(cart_url_final);
		window.location.href = cart_url_final;
	});

	$(document).on("click", ".main_productvaraint_label", function () {
		localStorage.removeItem("product_handle");
		localStorage.removeItem("addons_data");

		localStorage.removeItem("variant_main_title");
		localStorage.removeItem("variant_main_id");
		localStorage.removeItem("variant_main_price");
		localStorage.removeItem("variant_main_compareprice");
		localStorage.removeItem("variant_main_image");
		localStorage.removeItem("variant_main_lablename");

		var variant_main_title = $(this).attr('variant-main-title');
		var variant_main_id = $(this).attr('variant-main-id');
		var variant_main_price = $(this).attr('variant-main-price');
		var variant_main_compareprice = $(this).attr('variant-main-compareprice');
		var variant_main_image = $(this).attr('variant-main-image');
		var variant_main_lablename = $(this).attr('variant-main-lablename');
		localStorage.setItem('variant_main_title', variant_main_title);
		localStorage.setItem('variant_main_id', variant_main_id);
		localStorage.setItem('variant_main_price', variant_main_price);
		localStorage.setItem('variant_main_compareprice', variant_main_compareprice);
		localStorage.setItem('variant_main_image', variant_main_image);
		localStorage.setItem('variant_main_lablename', variant_main_lablename);

		var origin = window.location.origin;
		var pro_url = $(this).attr('for');
		var cart_url_final = origin + '/cart' + pro_url;
		var obj = { Title: 'ChangeUrl', Url: cart_url_final };
		history.pushState(obj, obj.Title, obj.Url);
		window.location.assign(cart_url_final);
		window.location.href = cart_url_final;
	});

	var product_varaint_title = localStorage.getItem("variant_main_title");
	if (product_varaint_title != null) {
		$('.itg_drop_var input').attr('checked', false);
		$('.itg_drop_var input').each(function () {
			var thsid = $(this).attr('data-value');
			if (thsid == product_varaint_title) {
				$(this).attr("checked", true);
				$(this).click();
			}
		});

		var option_namelabel = localStorage.getItem("variant_main_lablename");
		$('.variant_data_loop.active').find('.variant-label__value').text(option_namelabel);
		var option_image = localStorage.getItem("variant_main_image");
		$('.product_details_show').find(".prod_cus_images img").attr('src', option_image);

		var price_option = parseFloat(localStorage.getItem("variant_main_price"));
		var comapre_price_option = parseFloat(localStorage.getItem("variant_main_compareprice"));

		$('.main_prodcut_contain.active .total_price_add').text(monetaryUnit + price_option);
		$('.main_prodcut_contain.active .total_price_add').attr('data_price', price_option);
		$('.main_prodcut_contain.active .total_price_add').attr('data-addon', price_option);

		var price_varaintid = localStorage.getItem("variant_main_id");

		var searchParams = new URLSearchParams(window.location.search);
		var carthandle = searchParams.get('customcart');
		if (carthandle != undefined) {
			$('.price_without_discount span').text('');
			$(".main_product_summary ul li").each(function () {
				var checkhandle = $(this).attr('replace_data');
				if (checkhandle == carthandle) {
					$(this).attr('value', price_varaintid);
					$(this).find('span.money').text(monetaryUnit + price_option);
					$(this).find('.price_without_discount span').text(monetaryUnit + comapre_price_option);
					$(this).find('.quantity__input').addClass('finalproduct_qty');
				}
			});
		}

		var sum_data = 0;
		$('.main_addons_product.main_prodcut_contain.active input[type=checkbox]').each(function () {
			if (this.checked) {
				var price = parseFloat($(this).attr('data-addonprice'));
				var qty = $(this).closest('.first_addons_qty').find('.quantity__input').val();
				var finalPrice = price * qty;
				sum_data += finalPrice;
			}
		});
		$('.insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]').each(function () {
			if (this.checked) {
				var price = parseFloat($(this).attr('data-replaceprice'));
				sum_data += price;
			}
		});

		var mina_qty = $(document).find(".finalproduct_qty").val();
		var price_option = price_option * mina_qty;
		var final_price = price_option + sum_data;
		var final_price = final_price.toFixed(2);
		$(document).find(".main_prodcut_contain.active .total_price_add").text(monetaryUnit + final_price);
		$(document).find(".main_prodcut_contain.active .total_price_add").attr('data-addon', final_price);
	}

	$(document).on("click", ".itg_drop_var input", function () {
		var option_value = $(this).val();
		$(this).closest('.variant_data_loop.active').find('.variant-label__value').text(option_value);
	});
	const shoppingUrl = new Map([[0, "HalloweenSpecial"], [1, 'odorFree'], [2, 'scoopFree'], [3, 'smartPetCare']])

	function updateQueryStringParameter(uri, key, value) {
		if (!value) { return uri }
		var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
		var separator = uri.indexOf('?') !== -1 ? "&" : "?";
		if (uri.match(re)) {
			return uri.replace(re, '$1' + key + "=" + value + '$2');
		}
		else {
			return uri + separator + key + "=" + value;
		}
	}
	$(".itg_drop_var > .itg_drop_var_align_div").click(function () {
		const newUrl = updateQueryStringParameter(window.location.href, 'id', `${shoppingUrl.get($(this).index())}`);
		window.history.replaceState({
			path: newUrl
		}, '', newUrl);
	})
	// First-tab-Qty
	$(document).on("click", ".itg_drop_var label", function () {

		var option_image = $(this).find('img').attr('src');
		$(this).closest('.product_details_show').find(".prod_cus_images img").attr('src', option_image);

		var price_option = parseFloat($(this).attr('data_var_price').replace(/,/g, ''));
		var comapre_price_option = parseFloat($(this).attr('main-compare').replace(/,/g, ''));

		$('.main_prodcut_contain.active .total_price_add').text(monetaryUnit + price_option);
		$('.main_prodcut_contain.active .total_price_add').attr('data_price', price_option);
		$('.main_prodcut_contain.active .total_price_add').attr('data-addon', price_option);

		var price_varaintid = $(this).attr('main-id');
		var searchParams = new URLSearchParams(window.location.search);
		var carthandle = searchParams.get('customcart');
		if (carthandle != undefined) {
			$('.price_without_discount span').text('');
			$(".main_product_summary ul li").each(function () {
				var checkhandle = $(this).attr('replace_data');
				if (checkhandle == carthandle) {
					$(this).attr('value', price_varaintid);
					$(this).find('span.money').text(monetaryUnit + price_option);
					$(this).find('.price_without_discount span').text(monetaryUnit + comapre_price_option);
					$(this).find('.quantity__input').addClass('finalproduct_qty');
				}
			});
		}

		var sum_data = 0;
		$('.main_addons_product.main_prodcut_contain.active input[type=checkbox]').each(function () {
			if (this.checked) {
				var price = parseFloat($(this).attr('data-addonprice'));
				var qty = $(this).closest('.first_addons_qty').find('.quantity__input').val();
				var finalPrice = price * qty;
				sum_data += finalPrice;
			}
		});
		$('.insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]').each(function () {
			if (this.checked) {
				var price = parseFloat($(this).attr('data-replaceprice'));
				sum_data += price;
			}
		});

		var mina_qty = $(document).find(".finalproduct_qty").val();
		var price_option = price_option * mina_qty;

		var final_price = price_option + sum_data;
		var final_price = final_price.toFixed(2);
		$(document).find(".main_prodcut_contain.active .total_price_add").text(monetaryUnit + final_price);
		$(document).find(".main_prodcut_contain.active .total_price_add").attr('data-addon', final_price);

	});

	// second-tab-Qty-click
	$(document).on("click", ".first_addons input", function () {

		var main_product = parseFloat($(document).find(".main_prodcut_contain.active .total_price_add").attr('data_price'));
		var sum_data = 0;

		$('.main_addons_product.main_prodcut_contain.active input[type=checkbox]').each(function () {
			if (this.checked) {
				var price = parseFloat($(this).attr('data-addonprice'));
				var qty = $(this).closest('.first_addons_qty').find('.quantity__input').val();
				var finalPrice = price * qty;
				sum_data += finalPrice;
			}
		});
		$('.insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]').each(function () {
			if (this.checked) {
				var price = parseFloat($(this).attr('data-replaceprice'));
				sum_data += price;
			}
		});
		var mina_qty = $(document).find(".finalproduct_qty").val();
		var main_product = main_product * mina_qty;

		var final_price = main_product + sum_data;
		var final_price = final_price.toFixed(2);
		$(document).find(".main_prodcut_contain.active .total_price_add").text(monetaryUnit + final_price);
		$(document).find(".main_prodcut_contain.active .total_price_add").attr('data-addon', final_price);

		var GetId = $(this).attr("value");
		$("ul.summary_productlist.second_addons.main_prodcut_contain.active li.add_list_product .summarylist_product_data").each(function () {
			var matchId = $(this).attr("data-finlid");
			if (GetId == matchId) {
				$(this).toggleClass("show_product");
			}
		});

	});

	// second-tab-Qty-chnage
	$(document).on("click", ".first_addons .qty_itg", function () {

		var main_product = parseFloat($(document).find(".main_prodcut_contain.active .total_price_add").attr('data_price'));
		var sum_data = 0;

		$('.main_addons_product.main_prodcut_contain.active input[type=checkbox]').each(function () {
			if (this.checked) {
				var price = parseFloat($(this).attr('data-addonprice'));
				var qty = $(this).closest('.first_addons_qty').find('.quantity__input').val();
				var finalPrice = price * qty;
				sum_data += finalPrice;
			}
		});

		$('.insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]').each(function () {
			if (this.checked) {
				var price = parseFloat($(this).attr('data-replaceprice'));
				sum_data += price;
			}
		});

		var mina_qty = $(document).find(".finalproduct_qty").val();
		var main_product = main_product * mina_qty;
		var final_price = main_product + sum_data;
		var final_price = final_price.toFixed(2);

		$(document).find(".main_prodcut_contain.active .total_price_add").text(monetaryUnit + final_price);
		$(document).find(".main_prodcut_contain.active .total_price_add").attr('data-addon', final_price);

		var first_addons_id = $(this).closest('.first_addons_qty').find('.addons_input').attr('value');

		var qty = $(this).closest('.first_addons_qty').find('.quantity__input').val();
		var price_qty = parseFloat($(this).closest('.first_addons_qty').find('.quantity__input').attr('qty-price'));
		var same_row_price = price_qty * qty;
		var same_row_price = same_row_price.toFixed(2);

		$("ul.summary_productlist.second_addons.main_prodcut_contain.active li.add_list_product .summarylist_product_data").each(function () {
			var matchId = $(this).attr("data-finlid");
			if (matchId == first_addons_id) {
				$(this).find('.quantity__input').val(qty);
				$(this).find('.price_with_discount span').text(monetaryUnit + same_row_price);
			}
		});

	});


	// thired-tab-qty-warranty
	$(document).on("click", ".insurance_product_first input", function () {

		var main_product = parseFloat($(document).find(".main_prodcut_contain.active .total_price_add").attr('data_price'));

		setTimeout(function () {
			var sum_data = 0;
			$('.first_addons input[type=checkbox]').each(function () {
				if (this.checked) {
					var price = parseFloat($(this).attr('data-addonprice'));
					var qty = $(this).closest('.first_addons_qty').find('.quantity__input').val();
					var finalPrice = price * qty;
					sum_data += finalPrice;
				}
			});
			$('.insurance_product_first input[type=checkbox]').each(function () {
				if (this.checked) {
					var price = parseFloat($(this).attr('data-replaceprice'));
					sum_data += price;
				}
			});

			var mina_qty = $(document).find(".finalproduct_qty").val();
			var main_product = main_product * mina_qty;
			var final_price = main_product + sum_data;
			var final_price = final_price.toFixed(2);
			$(document).find(".total_price_add").text(monetaryUnit + final_price);
			$(document).find(".total_price_add").attr('data-addon', final_price);

		}, 1000);

	});

	// forth-tab-qty-product
	$(document).on("click", ".main_product_summary .qty_itg", function () {

		var main_product = parseFloat($(document).find(".main_prodcut_contain.active .total_price_add").attr('data_price'));
		var qty = $(this).closest('.replace_products_li').find('.quantity__input').val();
		var main_product = main_product * qty;

		setTimeout(function () {
			var sum_data = 0;
			$('.main_addons_product.main_prodcut_contain.active input[type=checkbox]').each(function () {
				if (this.checked) {
					var price = parseFloat($(this).attr('data-addonprice'));
					var qty = $(this).closest('.first_addons_qty').find('.quantity__input').val();
					var finalPrice = price * qty;
					sum_data += finalPrice;
				}
			});
			$('.insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]').each(function () {
				if (this.checked) {
					var price = parseFloat($(this).attr('data-replaceprice'));
					sum_data += price;
				}
			});
			var final_price = main_product + sum_data;
			var final_price = final_price.toFixed(2);
			$(document).find(".main_prodcut_contain.active .total_price_add").text(monetaryUnit + final_price);
			$(document).find(".main_prodcut_contain.active .total_price_add").attr('data-addon', final_price);

		}, 1000);
	});

	// forth-tab-qty-addons
	$(document).on("click", ".second_addons .qty_itg", function () {

		var price = parseFloat($.trim($(this).closest('.second_addons_qty').find('.second_adones_price').text()));
		var qty = $(this).closest('.second_addons_qty').find('.quantity__input').val();
		var same_row_price = price * qty;
		var same_row_price = same_row_price.toFixed(2);
		$(this).closest('.second_addons_qty').find('.price_with_discount span').text(monetaryUnit + same_row_price);

		setTimeout(function () {
			var main_product = parseFloat($(document).find(".main_prodcut_contain.active .total_price_add").attr('data_price'));
			var sum_data = 0;
			$('.main_addons_product.main_prodcut_contain.active input[type=checkbox]').each(function () {
				if (this.checked) {
					var price = parseFloat($(this).attr('data-addonprice'));
					var qty = $(this).closest('.first_addons_qty').find('.quantity__input').val();
					var finalPrice = price * qty;
					sum_data += finalPrice;
				}
			});
			$('.insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]').each(function () {
				if (this.checked) {
					var price = parseFloat($(this).attr('data-replaceprice'));
					sum_data += price;
				}
			});

			var mina_qty = $(document).find(".finalproduct_qty").val();
			var main_product = main_product * mina_qty;
			var final_price = main_product + sum_data;
			var final_price = final_price.toFixed(2);
			$(document).find(".main_prodcut_contain.active .total_price_add").text(monetaryUnit + final_price);
			$(document).find(".main_prodcut_contain.active .total_price_add").attr('data-addon', final_price);

		}, 1000);

		var first_addons_id = $(this).closest('.second_addons_qty').find('.summarylist_product_data').attr('data-finlid');
		$(".main_addons_product.main_prodcut_contain.active .add_list_product").each(function () {
			var matchId = $(this).find('.addons_input').attr('value');
			if (matchId == first_addons_id) {
				$(this).find('.quantity__input').val(qty);
			}
		});

	});


	$(document).on("click", "#edit_step-nav-trigger", function () {
		var match_contain = 'first_step';

		$(document).find("#btn_change_product").click();
		$(".tab_buttons .tablinks").each(function () {
			var step_content = $(this).attr('data-tab');
			if (step_content == match_contain) {
				$(this).addClass('active');
				$(this).click();
			} else {

			}
		});
		$("ul.addons_pagination li").each(function () {
			var step_content = $(this).attr('data-tab');
			if (step_content == match_contain) {
				$(this).show();
			}
		});

	});

	function activeItem(thisIndex) {
		$('.tab_buttons .tablinks').removeClass('active');
		$('.tab_buttons .tablinks').each((index, item) => {
			if (index <= thisIndex) $(item).addClass('active');
		})
	}

	$(document).on("click", "ul.previous_pagination_addons li.next", function () {
		var match_text = '';
		var ths_text = $(this).attr('data-tab');

		if (ths_text == 'prv_step_second') {
			$(document).find("li.next").hide();
			$(document).find("li.next_four").hide();
			$(document).find("li.first_step").show();
			match_text = $(document).find("li.next.prv_step_second").attr('data-step');
		}

		if (ths_text == 'prv_step_fourth') {
			$(document).find("li.next").hide();
			$(document).find("li.second_step").show();
			$(document).find("li.prv_step_second").show();
			$(document).find("li.next_four").hide();
			match_text = $(document).find("li.next.prv_step_fourth").attr('data-step');
		}
		$(".tab_button_contents .tabcontent").hide().eq($(this).index()).show()
		activeItem($(this).index())

	});


	$(document).on("click", "ul.next_pagination_addons li.next", function () {
		var match_text = '';
		var ths_text = $(this).attr('data-tab');
		if (ths_text == 'first_step') {
			$(document).find("li.next").hide();
			$(document).find("li.next_four").hide();
			$(document).find("li.prv_step_second").show();
			$(document).find("li.next.second_step").show();
			var match_text = $(document).find("li.next.second_step").attr('data-tab');
		}
		if (ths_text == 'second_step') {
			$(document).find("li.next").hide();
			$(document).find("li.prv_step_second").hide();
			$(document).find("li.prv_step_fourth").show();
			$(document).find("li.next_four").show();
			var match_text = $(document).find("li.next_four").attr('data-tab');
		}

		$(".tab_button_contents .tabcontent").each(function () {
			var step_content = $(this).attr('data-content');
			if (step_content == match_text) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
		$(".tab_buttons .tablinks").each(function () {
			var step_content = $(this).attr('data-tab');
			if (step_content == match_text) {
				$(this).addClass('active');
			}
		});

	});

	$(document).on("click", ".tab_buttons .tablinks", function () {

		var this_step = $(this).attr('data-tab');
		const thisIndex = $(this).index();
		activeItem(thisIndex)

		$(".tab_button_contents .tabcontent").each(function () {
			var step_content = $(this).attr('data-content');
			if (step_content == this_step) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
		$("ul.addons_pagination li").each(function () {
			var step_content = $(this).attr('data-tab');
			if (step_content == this_step) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});


		if (this_step != 'first_step') {
			if (this_step == 'fourth_step') {
				$(document).find("li.prv_step_fourth").show();
			} else {
				$("ul.previous_pagination_addons li").each(function () {
					var step_content = $(this).attr('data-step');
					if (step_content == this_step) {
						$(this).show();
					} else {
						$(this).hide();
					}
				});
			}
		}


		$("ul.next_pagination_addons li").each(function () {
			var step_content = $(this).attr('data-tab');
			if (step_content == this_step) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	});


	$(document).on("click", "#main_product_remove", function () {

		localStorage.removeItem("product_handle");
		localStorage.removeItem("addons_data");
		var searchParams = new URLSearchParams(window.location.search);
		var product_handle = searchParams.get('customcart');
		var origin = window.location.origin;
		var cart_url_final = origin + '/cart?customcart=' + product_handle;
		var obj = { Title: 'ChangeUrl', Url: cart_url_final };
		history.pushState(obj, obj.Title, obj.Url);
		window.location.assign(cart_url_final);
		window.location.href = cart_url_final;

	});

	// remove Functionlity
	$(document).on("click", ".bin_icon", function () {

		var id_delete = $(this).attr('data-del');
		$(this).closest('.summarylist_product_data').removeClass("show_product");

		$(".main_addons_product.main_prodcut_contain.active .addons_input").each(function () {

			var matchId = $(this).attr('value');
			if (matchId == id_delete) {

				$(this).prop('checked', false);
				var main_product = parseFloat($(document).find(".main_prodcut_contain.active .total_price_add").attr('data_price'));
				var sum_data = 0;
				$('.main_addons_product.main_prodcut_contain.active input[type=checkbox]').each(function () {
					if (this.checked) {
						var price = parseFloat($(this).attr('data-addonprice'));
						var qty = $(this).closest('.first_addons_qty').find('.quantity__input').val();
						var finalPrice = price * qty;
						sum_data += finalPrice;
					}
				});
				$('.insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]').each(function () {
					if (this.checked) {
						var price = parseFloat($(this).attr('data-replaceprice'));
						sum_data += price;
					}
				});
				var final_price = main_product + sum_data;
				var final_price = final_price.toFixed(2);
				$(document).find(".main_prodcut_contain.active .total_price_add").text(monetaryUnit + final_price);
				$(document).find(".main_prodcut_contain.active .total_price_add").attr('data-addon', final_price);

			}

		});
	});



	$(document).on("click", ".service_remove_items", function () {
		var id_delete = $(this).attr('data-del');
		$(this).closest('.insurance_product_li').removeClass("show_product");
		$(".insurance_product_first .insurance_product_input").each(function () {
			var matchId = $(this).attr('value');
			if (matchId == id_delete) {
				$(this).prop('checked', false);

				var main_product = parseFloat($(document).find(".total_price_add").attr('data_price'));
				var sum_data = 0;
				$('.first_addons input[type=checkbox]').each(function () {
					if (this.checked) {
						var price = parseFloat($(this).attr('data-addonprice'));
						var qty = $(this).closest('.first_addons_qty').find('.quantity__input').val();
						var finalPrice = price * qty;
						sum_data += finalPrice;
					}
				});
				$('.insurance_product_first input[type=checkbox]').each(function () {
					if (this.checked) {
						var price = parseFloat($(this).attr('data-replaceprice'));
						sum_data += price;
					}
				});
				var final_price = main_product + sum_data;
				var final_price = final_price.toFixed(2);
				$(document).find(".total_price_add").text(monetaryUnit + final_price);
				$(document).find(".total_price_add").attr('data-addon', final_price);
			}
		});
	});

	function addToCart() {
		localStorage.removeItem("product_handle");
		localStorage.removeItem("addons_data");
		var urlParams = new URLSearchParams(window.location.search);
		var product_info = urlParams.get('customcart');
		localStorage.setItem('product_handle', product_info);
		var choose_feature = $(document).find("#custom_product_data").html();
		localStorage.setItem('addons_data', choose_feature);

		var available_ids = [];
		var main_cart_product = '';
		var main_cart_product_find = $(document).find(".variant_data_loop.main_prodcut_contain.active .itg_drop_var input:checked+label").attr('main-id');
		if (main_cart_product_find == undefined) {
			var main_cart_product = $(document).find(".variant_data_loop.main_prodcut_contain.active #first_product").attr('data-first');
		} else {
			var main_cart_product = main_cart_product_find;
		}
		var mina_qty = $(document).find(".finalproduct_qty").val();

		$("ul.summary_productlist.second_addons.main_prodcut_contain.active .summarylist_product_data.show_product").each(function () {
			var var_id = $(this).attr('data-finlid');
			var var_qty = $(this).find('.quantity__input').val();
			var toPushItem = var_id + '-' + var_qty;
			available_ids.push(toPushItem);
		});

		if (available_ids.length == 0) {
			var dataarr = {
				"id": main_cart_product,
				"quantity": mina_qty,
			}
			jQuery.ajax({
				type: 'POST',
				url: '/cart/add.js',
				data: dataarr,
				dataType: 'json',
				success: function () {
					window.location.href = '/checkout';
				}
			});
		} else {
			for (var i = 0; i < available_ids.length; i++) {
				(function (i) {
					setTimeout(function () {
						var formContents = available_ids[i].split('-');
						var params = {
							type: 'POST',
							url: '/cart/add.js',
							data: 'quantity=' + formContents[1] + '&id=' + formContents[0],
							dataType: 'json',
							success: function (line_item) {
								var iteration_length = i + 1;
								if (iteration_length == available_ids.length) {
									var dataarr = {
										"id": main_cart_product,
										"quantity": mina_qty,
									}
									jQuery.ajax({
										type: 'POST',
										url: '/cart/add.js',
										data: dataarr,
										dataType: 'json',
										success: function () {
											window.location.href = '/checkout';
										}
									});
								}
							},
							error: function () {
								console.log("fail");
							}
						};
						$.ajax(params);
					}, 1000 * i);
				}(i));
			}
		}
	}
	//Custom_addToCart
	$(document).on("click", "ul.addons_pagination li#final_order", debounce(addToCart, 1000))
});



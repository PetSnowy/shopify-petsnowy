$(document).ready(function(){var t=document.querySelectorAll(".price_with_discount .money").length?document.querySelectorAll(".price_with_discount .money"):document.querySelectorAll(".price_with_discount"),t=t[0]?.innerHTML||t[0]?.innerText;const c=t&&t.replace(/[\d.]/g,"");function i(t){var a,t=t.currentTarget.closest("details");(a=(t=t).closest(".submenu-open"))&&a.classList.remove("submenu-open"),t.classList.remove("menu-opening"),t.querySelector("summary").setAttribute("aria-expanded",!1),removeTrapFocus(t.querySelector("summary"));{var i=t;let a;const n=t=>{t-(a=void 0===a?t:a)<400?window.requestAnimationFrame(n):(i.removeAttribute("open"),i.closest("details[open]")&&trapFocus(i.closest("details[open]"),i.querySelector("summary")))};window.requestAnimationFrame(n)}}$(".slide_arrow svg").click(function(){document.querySelector(".new-index-litter").scrollIntoView({behavior:"smooth",block:"center"})}),$("span.itg_contact_details_nav").click(function(t){var a=document.body;$(window).width()<=990&&(i(t),a.classList.remove("overflow-hidden-tablet")),window.location.assign("/pages/contact")}),$(".close_announcement").click(function(){$(".announcement-bar").hide()}),$(".accordion_head").click(function(){$(".accordion_body").is(":visible")&&($(".accordion_body").slideUp(400),$(".plusminus").text("+")),$(this).next(".accordion_body").is(":visible")?($(this).next(".accordion_body").slideUp(400),$(this).children(".plusminus").text("+")):($(this).next(".accordion_body").slideDown(400),$(this).children(".plusminus").text("-"))}),$(".answer_txt").hide(),$("span.onc_arrow").css("transform","rotate(180deg)"),$(".ques_title").click(function(){$(".answer_txt").is(":visible")&&($(".answer_txt").slideUp(),$("span.onc_arrow").css("transform","rotate(180deg)")),$(this).next(".answer_txt").is(":visible")?($(this).next(".answer_txt").slideUp(),$(this).children("span.onc_arrow").css("transform","rotate(180deg)")):($(this).next(".answer_txt").slideDown(),$(this).children("span.onc_arrow").css("transform","rotate(0deg)"))}),$(".button.order_bannr_btn").on("click",function(){$("button.needsclick.kl-teaser-WbBgwU").trigger("click")}),$(".cs_video_big").owlCarousel({loop:!0,margin:0,nav:!1,dots:!1,responsive:{0:{items:1},600:{items:1},1e3:{items:1}}}),$(".img_icon_svg").on("click",function(){$(".top_inno_iframe").css("display","block")}),$("span.close_popup").on("click",function(){$(".top_inno_iframe").css("display","none")}),$(".img_icon_svg").click(function(){var t=$(this).closest(".img_icon_svg").attr("data-video-url");$(".modal_popup .top_inno_iframe iframe").attr("src",t)});var a,n,e,o,d,r=new URLSearchParams(window.location.search).get("customcart"),t=localStorage.getItem("product_handle"),s=(null!==t&&(localStorage.removeItem("product_handle"),localStorage.removeItem("addons_data")),null==t&&null!=r&&($(".main_prodcut_contain").each(function(){$(this).attr("data-handle")==r?$(this).show().addClass("active"):$(this).hide().removeClass("active")}),$(".main_product_summary ul li").each(function(){$(this).attr("replace_data")==r?($(this).show(),$(this).find(".quantity__input").addClass("finalproduct_qty")):$(this).hide()})),$(document).on("click",".headr_odr_now",function(){localStorage.removeItem("product_handle"),localStorage.removeItem("addons_data")}),$(document).on("click","button.btn_change_product",function(){$(".tabcontent_first").addClass("minified_layout")}),$(document).on("click",".main_product_label",function(){localStorage.removeItem("product_handle"),localStorage.removeItem("addons_data"),localStorage.removeItem("variant_main_title"),localStorage.removeItem("variant_main_id"),localStorage.removeItem("variant_main_price"),localStorage.removeItem("variant_main_compareprice"),localStorage.removeItem("variant_main_image"),localStorage.removeItem("variant_main_lablename");var t=window.location.origin+"/cart"+$(this).attr("for"),a={Title:"ChangeUrl",Url:t};history.pushState(a,a.Title,a.Url),window.location.assign(t),window.location.href=t}),$(document).on("click",".main_productvaraint_label",function(){localStorage.removeItem("product_handle"),localStorage.removeItem("addons_data"),localStorage.removeItem("variant_main_title"),localStorage.removeItem("variant_main_id"),localStorage.removeItem("variant_main_price"),localStorage.removeItem("variant_main_compareprice"),localStorage.removeItem("variant_main_image"),localStorage.removeItem("variant_main_lablename");var t=$(this).attr("variant-main-title"),a=$(this).attr("variant-main-id"),i=$(this).attr("variant-main-price"),n=$(this).attr("variant-main-compareprice"),e=$(this).attr("variant-main-image"),o=$(this).attr("variant-main-lablename");localStorage.setItem("variant_main_title",t),localStorage.setItem("variant_main_id",a),localStorage.setItem("variant_main_price",i),localStorage.setItem("variant_main_compareprice",n),localStorage.setItem("variant_main_image",e),localStorage.setItem("variant_main_lablename",o);t=window.location.origin+"/cart"+$(this).attr("for"),a={Title:"ChangeUrl",Url:t};history.pushState(a,a.Title,a.Url),window.location.assign(t),window.location.href=t}),localStorage.getItem("variant_main_title"));null!=s&&($(".itg_drop_var input").attr("checked",!1),$(".itg_drop_var input").each(function(){$(this).attr("data-value")==s&&($(this).attr("checked",!0),$(this).click())}),t=localStorage.getItem("variant_main_lablename"),$(".variant_data_loop.active").find(".variant-label__value").text(t),t=localStorage.getItem("variant_main_image"),$(".product_details_show").find(".prod_cus_images img").attr("src",t),d=parseFloat(localStorage.getItem("variant_main_price")),a=parseFloat(localStorage.getItem("variant_main_compareprice")),$(".main_prodcut_contain.active .total_price_add").text(c+d),$(".main_prodcut_contain.active .total_price_add").attr("data_price",d),$(".main_prodcut_contain.active .total_price_add").attr("data-addon",d),n=localStorage.getItem("variant_main_id"),null!=(e=new URLSearchParams(window.location.search).get("customcart"))&&($(".price_without_discount span").text(""),$(".main_product_summary ul li").each(function(){$(this).attr("replace_data")==e&&($(this).attr("value",n),$(this).find("span.money").text(c+d),$(this).find(".price_without_discount span").text(c+a),$(this).find(".quantity__input").addClass("finalproduct_qty"))})),o=0,$(".main_addons_product.main_prodcut_contain.active input[type=checkbox]").each(function(){var t,a;this.checked&&(t=parseFloat($(this).attr("data-addonprice")),a=$(this).closest(".first_addons_qty").find(".quantity__input").val(),o+=t*a)}),$(".insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]").each(function(){var t;this.checked&&(t=parseFloat($(this).attr("data-replaceprice")),o+=t)}),t=$(document).find(".finalproduct_qty").val(),t=(t=(d=d*t)+o).toFixed(2),$(document).find(".main_prodcut_contain.active .total_price_add").text(c+t),$(document).find(".main_prodcut_contain.active .total_price_add").attr("data-addon",t)),$(document).on("click",".itg_drop_var input",function(){var t=$(this).val();$(this).closest(".variant_data_loop.active").find(".variant-label__value").text(t)});const _=new Map([[0,"HalloweenSpecial"],[1,"odorFree"],[2,"scoopFree"],[3,"smartPetCare"]]);function u(i){$(".tab_buttons .tablinks").removeClass("active"),$(".tab_buttons .tablinks").each((t,a)=>{t<=i&&$(a).addClass("active")})}$(".itg_drop_var > .itg_drop_var_align_div").click(function(){t=window.location.href,a="id";var t,a,i,n,e=(i=""+_.get($(this).index()))?(e=new RegExp("([?&])"+a+"=.*?(&|$)","i"),n=-1!==t.indexOf("?")?"&":"?",t.match(e)?t.replace(e,"$1"+a+"="+i+"$2"):t+n+a+"="+i):t;window.history.replaceState({path:e},"",e)}),$(document).on("click",".itg_drop_var label",function(){var t=$(this).find("img").attr("src"),a=($(this).closest(".product_details_show").find(".prod_cus_images img").attr("src",t),parseFloat($(this).attr("data_var_price").replace(/,/g,""))),i=parseFloat($(this).attr("main-compare").replace(/,/g,"")),n=($(".main_prodcut_contain.active .total_price_add").text(c+a),$(".main_prodcut_contain.active .total_price_add").attr("data_price",a),$(".main_prodcut_contain.active .total_price_add").attr("data-addon",a),$(this).attr("main-id")),e=new URLSearchParams(window.location.search).get("customcart"),o=(null!=e&&($(".price_without_discount span").text(""),$(".main_product_summary ul li").each(function(){$(this).attr("replace_data")==e&&($(this).attr("value",n),$(this).find("span.money").text(c+a),$(this).find(".price_without_discount span").text(c+i),$(this).find(".quantity__input").addClass("finalproduct_qty"))})),0),t=($(".main_addons_product.main_prodcut_contain.active input[type=checkbox]").each(function(){var t,a;this.checked&&(t=parseFloat($(this).attr("data-addonprice")),a=$(this).closest(".first_addons_qty").find(".quantity__input").val(),o+=t*a)}),$(".insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]").each(function(){var t;this.checked&&(t=parseFloat($(this).attr("data-replaceprice")),o+=t)}),$(document).find(".finalproduct_qty").val()),t=(t=(a=a*t)+o).toFixed(2);$(document).find(".main_prodcut_contain.active .total_price_add").text(c+t),$(document).find(".main_prodcut_contain.active .total_price_add").attr("data-addon",t)}),$(document).on("click",".first_addons input",function(){var t=parseFloat($(document).find(".main_prodcut_contain.active .total_price_add").attr("data_price")),i=0;$(".main_addons_product.main_prodcut_contain.active input[type=checkbox]").each(function(){var t,a;this.checked&&(t=parseFloat($(this).attr("data-addonprice")),a=$(this).closest(".first_addons_qty").find(".quantity__input").val(),i+=t*a)}),$(".insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]").each(function(){var t;this.checked&&(t=parseFloat($(this).attr("data-replaceprice")),i+=t)});var t=(t=t*$(document).find(".finalproduct_qty").val()+i).toFixed(2),a=($(document).find(".main_prodcut_contain.active .total_price_add").text(c+t),$(document).find(".main_prodcut_contain.active .total_price_add").attr("data-addon",t),$(this).attr("value"));$("ul.summary_productlist.second_addons.main_prodcut_contain.active li.add_list_product .summarylist_product_data").each(function(){var t=$(this).attr("data-finlid");a==t&&$(this).toggleClass("show_product")})}),$(document).on("click",".first_addons .qty_itg",function(){var t=parseFloat($(document).find(".main_prodcut_contain.active .total_price_add").attr("data_price")),i=0;$(".main_addons_product.main_prodcut_contain.active input[type=checkbox]").each(function(){var t,a;this.checked&&(t=parseFloat($(this).attr("data-addonprice")),a=$(this).closest(".first_addons_qty").find(".quantity__input").val(),i+=t*a)}),$(".insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]").each(function(){var t;this.checked&&(t=parseFloat($(this).attr("data-replaceprice")),i+=t)});var t=(t=t*$(document).find(".finalproduct_qty").val()+i).toFixed(2),a=($(document).find(".main_prodcut_contain.active .total_price_add").text(c+t),$(document).find(".main_prodcut_contain.active .total_price_add").attr("data-addon",t),$(this).closest(".first_addons_qty").find(".addons_input").attr("value")),n=$(this).closest(".first_addons_qty").find(".quantity__input").val(),t=parseFloat($(this).closest(".first_addons_qty").find(".quantity__input").attr("qty-price")),e=(e=t*n).toFixed(2);$("ul.summary_productlist.second_addons.main_prodcut_contain.active li.add_list_product .summarylist_product_data").each(function(){$(this).attr("data-finlid")==a&&($(this).find(".quantity__input").val(n),$(this).find(".price_with_discount span").text(c+e))})}),$(document).on("click",".insurance_product_first input",function(){parseFloat($(document).find(".main_prodcut_contain.active .total_price_add").attr("data_price"));setTimeout(function(){var i=0;$(".first_addons input[type=checkbox]").each(function(){var t,a;this.checked&&(t=parseFloat($(this).attr("data-addonprice")),a=$(this).closest(".first_addons_qty").find(".quantity__input").val(),i+=t*a)}),$(".insurance_product_first input[type=checkbox]").each(function(){var t;this.checked&&(t=parseFloat($(this).attr("data-replaceprice")),i+=t)});var t=(t=void 0*$(document).find(".finalproduct_qty").val()+i).toFixed(2);$(document).find(".total_price_add").text(c+t),$(document).find(".total_price_add").attr("data-addon",t)},1e3)}),$(document).on("click",".main_product_summary .qty_itg",function(){var a=parseFloat($(document).find(".main_prodcut_contain.active .total_price_add").attr("data_price")),t=$(this).closest(".replace_products_li").find(".quantity__input").val(),a=a*t;setTimeout(function(){var i=0;$(".main_addons_product.main_prodcut_contain.active input[type=checkbox]").each(function(){var t,a;this.checked&&(t=parseFloat($(this).attr("data-addonprice")),a=$(this).closest(".first_addons_qty").find(".quantity__input").val(),i+=t*a)}),$(".insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]").each(function(){var t;this.checked&&(t=parseFloat($(this).attr("data-replaceprice")),i+=t)});var t=(t=a+i).toFixed(2);$(document).find(".main_prodcut_contain.active .total_price_add").text(c+t),$(document).find(".main_prodcut_contain.active .total_price_add").attr("data-addon",t)},1e3)}),$(document).on("click",".second_addons .qty_itg",function(){var t=parseFloat($.trim($(this).closest(".second_addons_qty").find(".second_adones_price").text())),a=$(this).closest(".second_addons_qty").find(".quantity__input").val(),t=(t=t*a).toFixed(2),i=($(this).closest(".second_addons_qty").find(".price_with_discount span").text(c+t),setTimeout(function(){var t=parseFloat($(document).find(".main_prodcut_contain.active .total_price_add").attr("data_price")),i=0;$(".main_addons_product.main_prodcut_contain.active input[type=checkbox]").each(function(){var t,a;this.checked&&(t=parseFloat($(this).attr("data-addonprice")),a=$(this).closest(".first_addons_qty").find(".quantity__input").val(),i+=t*a)}),$(".insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]").each(function(){var t;this.checked&&(t=parseFloat($(this).attr("data-replaceprice")),i+=t)});t=(t=t*$(document).find(".finalproduct_qty").val()+i).toFixed(2);$(document).find(".main_prodcut_contain.active .total_price_add").text(c+t),$(document).find(".main_prodcut_contain.active .total_price_add").attr("data-addon",t)},1e3),$(this).closest(".second_addons_qty").find(".summarylist_product_data").attr("data-finlid"));$(".main_addons_product.main_prodcut_contain.active .add_list_product").each(function(){$(this).find(".addons_input").attr("value")==i&&$(this).find(".quantity__input").val(a)})}),$(document).on("click","#edit_step-nav-trigger",function(){var t="first_step";$(document).find("#btn_change_product").click(),$(".tab_buttons .tablinks").each(function(){$(this).attr("data-tab")==t&&($(this).addClass("active"),$(this).click())}),$("ul.addons_pagination li").each(function(){$(this).attr("data-tab")==t&&$(this).show()})}),$(document).on("click","ul.previous_pagination_addons li.next",function(){var t=$(this).attr("data-tab");"prv_step_second"==t&&($(document).find("li.next").hide(),$(document).find("li.next_four").hide(),$(document).find("li.first_step").show(),$(document).find("li.next.prv_step_second").attr("data-step")),"prv_step_fourth"==t&&($(document).find("li.next").hide(),$(document).find("li.second_step").show(),$(document).find("li.prv_step_second").show(),$(document).find("li.next_four").hide(),$(document).find("li.next.prv_step_fourth").attr("data-step")),$(".tab_button_contents .tabcontent").hide().eq($(this).index()).show(),u($(this).index())}),$(document).on("click","ul.next_pagination_addons li.next",function(){var t="",a=$(this).attr("data-tab");"first_step"==a&&($(document).find("li.next").hide(),$(document).find("li.next_four").hide(),$(document).find("li.prv_step_second").show(),$(document).find("li.next.second_step").show(),t=$(document).find("li.next.second_step").attr("data-tab")),"second_step"==a&&($(document).find("li.next").hide(),$(document).find("li.prv_step_second").hide(),$(document).find("li.prv_step_fourth").show(),$(document).find("li.next_four").show(),t=$(document).find("li.next_four").attr("data-tab")),$(".tab_button_contents .tabcontent").each(function(){$(this).attr("data-content")==t?$(this).show():$(this).hide()}),$(".tab_buttons .tablinks").each(function(){$(this).attr("data-tab")==t&&$(this).addClass("active")})}),$(document).on("click",".tab_buttons .tablinks",function(){var t=$(this).attr("data-tab");u($(this).index()),$(".tab_button_contents .tabcontent").each(function(){$(this).attr("data-content")==t?$(this).show():$(this).hide()}),$("ul.addons_pagination li").each(function(){$(this).attr("data-tab")==t?$(this).show():$(this).hide()}),"first_step"!=t&&("fourth_step"==t?$(document).find("li.prv_step_fourth").show():$("ul.previous_pagination_addons li").each(function(){$(this).attr("data-step")==t?$(this).show():$(this).hide()})),$("ul.next_pagination_addons li").each(function(){$(this).attr("data-tab")==t?$(this).show():$(this).hide()})}),$(document).on("click","#main_product_remove",function(){localStorage.removeItem("product_handle"),localStorage.removeItem("addons_data");var t=new URLSearchParams(window.location.search).get("customcart"),t=window.location.origin+"/cart?customcart="+t,a={Title:"ChangeUrl",Url:t};history.pushState(a,a.Title,a.Url),window.location.assign(t),window.location.href=t}),$(document).on("click",".bin_icon",function(){var a=$(this).attr("data-del");$(this).closest(".summarylist_product_data").removeClass("show_product"),$(".main_addons_product.main_prodcut_contain.active .addons_input").each(function(){var i,t;$(this).attr("value")==a&&($(this).prop("checked",!1),t=parseFloat($(document).find(".main_prodcut_contain.active .total_price_add").attr("data_price")),i=0,$(".main_addons_product.main_prodcut_contain.active input[type=checkbox]").each(function(){var t,a;this.checked&&(t=parseFloat($(this).attr("data-addonprice")),a=$(this).closest(".first_addons_qty").find(".quantity__input").val(),i+=t*a)}),$(".insurance_product.insurance_product_first.main_prodcut_contain.active input[type=checkbox]").each(function(){var t;this.checked&&(t=parseFloat($(this).attr("data-replaceprice")),i+=t)}),t=(t=t+i).toFixed(2),$(document).find(".main_prodcut_contain.active .total_price_add").text(c+t),$(document).find(".main_prodcut_contain.active .total_price_add").attr("data-addon",t))})}),$(document).on("click",".service_remove_items",function(){var a=$(this).attr("data-del");$(this).closest(".insurance_product_li").removeClass("show_product"),$(".insurance_product_first .insurance_product_input").each(function(){var i,t;$(this).attr("value")==a&&($(this).prop("checked",!1),t=parseFloat($(document).find(".total_price_add").attr("data_price")),i=0,$(".first_addons input[type=checkbox]").each(function(){var t,a;this.checked&&(t=parseFloat($(this).attr("data-addonprice")),a=$(this).closest(".first_addons_qty").find(".quantity__input").val(),i+=t*a)}),$(".insurance_product_first input[type=checkbox]").each(function(){var t;this.checked&&(t=parseFloat($(this).attr("data-replaceprice")),i+=t)}),t=(t=t+i).toFixed(2),$(document).find(".total_price_add").text(c+t),$(document).find(".total_price_add").attr("data-addon",t))})}),$(document).on("click","ul.addons_pagination li#final_order",function(t,a){let i;return function(){clearTimeout(i),i=setTimeout(()=>{t.apply(this,arguments)},a)}}(function(){localStorage.removeItem("product_handle"),localStorage.removeItem("addons_data");var t=new URLSearchParams(window.location.search).get("customcart"),t=(localStorage.setItem("product_handle",t),$(document).find("#custom_product_data").html()),n=(localStorage.setItem("addons_data",t),[]),e="",t=$(document).find(".variant_data_loop.main_prodcut_contain.active .itg_drop_var input:checked+label").attr("main-id"),o=(e=null==t?$(document).find(".variant_data_loop.main_prodcut_contain.active #first_product").attr("data-first"):t,$(document).find(".finalproduct_qty").val());if($("ul.summary_productlist.second_addons.main_prodcut_contain.active .summarylist_product_data.show_product").each(function(){var t=$(this).attr("data-finlid"),a=$(this).find(".quantity__input").val();n.push(t+"-"+a)}),0==n.length){t={id:e,quantity:o};jQuery.ajax({type:"POST",url:"/cart/add.js",data:t,dataType:"json",success:function(){window.location.href="/checkout"}})}else for(var a=0;a<n.length;a++)!function(i){setTimeout(function(){var t=n[i].split("-"),t={type:"POST",url:"/cart/add.js",data:"quantity="+t[1]+"&id="+t[0],dataType:"json",success:function(t){var a;i+1==n.length&&(a={id:e,quantity:o},jQuery.ajax({type:"POST",url:"/cart/add.js",data:a,dataType:"json",success:function(){window.location.href="/checkout"}}))},error:function(){console.log("fail")}};$.ajax(t)},1e3*i)}(a)},1e3))});
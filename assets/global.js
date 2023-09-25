function getFocusableElements(e){return Array.from(e.querySelectorAll("summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"))}document.querySelectorAll('[id^="Details-"] summary').forEach(e=>{e.setAttribute("role","button"),e.setAttribute("aria-expanded",e.parentNode.hasAttribute("open")),e.nextElementSibling.getAttribute("id")&&e.setAttribute("aria-controls",e.nextElementSibling.id),e.addEventListener("click",e=>{e.currentTarget.setAttribute("aria-expanded",!e.currentTarget.closest("details").hasAttribute("open"))}),e.closest("header-drawer")||e.parentElement.addEventListener("keyup",onKeyUpEscape)});const trapFocusHandlers={};function trapFocus(t,e=t){var i=getFocusableElements(t),s=i[0],n=i[i.length-1];removeTrapFocus(),trapFocusHandlers.focusin=e=>{e.target!==t&&e.target!==n&&e.target!==s||document.addEventListener("keydown",trapFocusHandlers.keydown)},trapFocusHandlers.focusout=function(){document.removeEventListener("keydown",trapFocusHandlers.keydown)},trapFocusHandlers.keydown=function(e){"TAB"===e.code.toUpperCase()&&(e.target!==n||e.shiftKey||(e.preventDefault(),s.focus()),e.target===t||e.target===s)&&e.shiftKey&&(e.preventDefault(),n.focus())},document.addEventListener("focusout",trapFocusHandlers.focusout),document.addEventListener("focusin",trapFocusHandlers.focusin),e.focus()}try{document.querySelector(":focus-visible")}catch(e){focusVisiblePolyfill()}function focusVisiblePolyfill(){const t=["ARROWUP","ARROWDOWN","ARROWLEFT","ARROWRIGHT","TAB","ENTER","SPACE","ESCAPE","HOME","END","PAGEUP","PAGEDOWN"];let e=null,i=null;window.addEventListener("keydown",e=>{t.includes(e.code.toUpperCase())&&(i=!1)}),window.addEventListener("mousedown",e=>{i=!0}),window.addEventListener("focus",()=>{e&&e.classList.remove("focused"),i||(e=document.activeElement).classList.add("focused")},!0)}function pauseAllMedia(){document.querySelectorAll(".js-youtube").forEach(e=>{e.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")}),document.querySelectorAll(".js-vimeo").forEach(e=>{e.contentWindow.postMessage('{"method":"pause"}',"*")}),document.querySelectorAll("video").forEach(e=>e.pause()),document.querySelectorAll("product-model").forEach(e=>{e.modelViewerUI&&e.modelViewerUI.pause()})}function removeTrapFocus(e=null){document.removeEventListener("focusin",trapFocusHandlers.focusin),document.removeEventListener("focusout",trapFocusHandlers.focusout),document.removeEventListener("keydown",trapFocusHandlers.keydown),e&&e.focus()}function onKeyUpEscape(e){var t;"ESCAPE"===e.code.toUpperCase()&&(e=e.target.closest("details[open]"))&&(t=e.querySelector("summary"),e.removeAttribute("open"),t.setAttribute("aria-expanded",!1),t.focus())}class QuantityInput extends HTMLElement{constructor(){super(),this.input=this.querySelector("input"),this.changeEvent=new Event("change",{bubbles:!0}),this.querySelectorAll("button").forEach(e=>e.addEventListener("click",this.onButtonClick.bind(this)))}onButtonClick(e){e.preventDefault();var t=this.input.value;"plus"===e.target.name?this.input.stepUp():this.input.stepDown(),t!==this.input.value&&this.input.dispatchEvent(this.changeEvent)}}function debounce(t,i){let s;return(...e)=>{clearTimeout(s),s=setTimeout(()=>t.apply(this,e),i)}}function fetchConfig(e="json"){return{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/"+e}}}customElements.define("quantity-input",QuantityInput),void 0===window.Shopify&&(window.Shopify={}),Shopify.bind=function(e,t){return function(){return e.apply(t,arguments)}},Shopify.setSelectorByValue=function(e,t){for(var i=0,s=e.options.length;i<s;i++){var n=e.options[i];if(t==n.value||t==n.innerHTML)return e.selectedIndex=i}},Shopify.addListener=function(e,t,i){e.addEventListener?e.addEventListener(t,i,!1):e.attachEvent("on"+t,i)},Shopify.postLink=function(e,t){var i,s=(t=t||{}).method||"post",n=t.parameters||{},r=document.createElement("form");for(i in r.setAttribute("method",s),r.setAttribute("action",e),n){var o=document.createElement("input");o.setAttribute("type","hidden"),o.setAttribute("name",i),o.setAttribute("value",n[i]),r.appendChild(o)}document.body.appendChild(r),r.submit(),document.body.removeChild(r)},Shopify.CountryProvinceSelector=function(e,t,i){this.countryEl=document.getElementById(e),this.provinceEl=document.getElementById(t),this.provinceContainer=document.getElementById(i.hideElement||t),Shopify.addListener(this.countryEl,"change",Shopify.bind(this.countryHandler,this)),this.initCountry(),this.initProvince()},Shopify.CountryProvinceSelector.prototype={initCountry:function(){var e=this.countryEl.getAttribute("data-default");Shopify.setSelectorByValue(this.countryEl,e),this.countryHandler()},initProvince:function(){var e=this.provinceEl.getAttribute("data-default");e&&0<this.provinceEl.options.length&&Shopify.setSelectorByValue(this.provinceEl,e)},countryHandler:function(e){var t=(s=this.countryEl.options[this.countryEl.selectedIndex]).getAttribute("data-provinces"),i=JSON.parse(t);if(this.clearOptions(this.provinceEl),i&&0==i.length)this.provinceContainer.style.display="none";else{for(var s,n=0;n<i.length;n++)(s=document.createElement("option")).value=i[n][0],s.innerHTML=i[n][1],this.provinceEl.appendChild(s);this.provinceContainer.style.display=""}},clearOptions:function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},setOptions:function(e,t){var i=0;for(t.length;i<t.length;i++){var s=document.createElement("option");s.value=t[i],s.innerHTML=t[i],e.appendChild(s)}}};class MenuDrawer extends HTMLElement{constructor(){super(),this.mainDetailsToggle=this.querySelector("details"),this.addEventListener("keyup",this.onKeyUp.bind(this)),this.addEventListener("focusout",this.onFocusOut.bind(this)),this.bindEvents()}bindEvents(){this.querySelectorAll("summary").forEach(e=>e.addEventListener("click",this.onSummaryClick.bind(this))),this.querySelectorAll("button").forEach(e=>e.addEventListener("click",this.onCloseButtonClick.bind(this)))}onKeyUp(e){var t;"ESCAPE"===e.code.toUpperCase()&&(t=e.target.closest("details[open]"))&&(t===this.mainDetailsToggle?this.closeMenuDrawer(e,this.mainDetailsToggle.querySelector("summary")):this.closeSubmenu(t))}onSummaryClick(e){const t=e.currentTarget,i=t.parentNode,s=i.closest(".has-submenu");var n=i.hasAttribute("open");const r=window.matchMedia("(prefers-reduced-motion: reduce)");function o(){trapFocus(t.nextElementSibling,i.querySelector("button")),t.nextElementSibling.removeEventListener("transitionend",o)}i===this.mainDetailsToggle?(n&&e.preventDefault(),n?this.closeMenuDrawer(e,t):this.openMenuDrawer(t),window.matchMedia("(max-width: 990px)")&&document.documentElement.style.setProperty("--viewport-height",window.innerHeight+"px")):setTimeout(()=>{i.classList.add("menu-opening"),t.setAttribute("aria-expanded",!0),s&&s.classList.add("submenu-open"),!r||r.matches?o():t.nextElementSibling.addEventListener("transitionend",o)},100)}openMenuDrawer(e){setTimeout(()=>{this.mainDetailsToggle.classList.add("menu-opening")}),e.setAttribute("aria-expanded",!0),trapFocus(this.mainDetailsToggle,e),document.body.classList.add("overflow-hidden-"+this.dataset.breakpoint)}closeMenuDrawer(e,t=!1){void 0!==e&&(this.mainDetailsToggle.classList.remove("menu-opening"),this.mainDetailsToggle.querySelectorAll("details").forEach(e=>{e.removeAttribute("open"),e.classList.remove("menu-opening")}),this.mainDetailsToggle.querySelectorAll(".submenu-open").forEach(e=>{e.classList.remove("submenu-open")}),document.body.classList.remove("overflow-hidden-"+this.dataset.breakpoint),removeTrapFocus(t),this.closeAnimation(this.mainDetailsToggle))}onFocusOut(e){setTimeout(()=>{this.mainDetailsToggle.hasAttribute("open")&&!this.mainDetailsToggle.contains(document.activeElement)&&this.closeMenuDrawer()})}onCloseButtonClick(e){e=e.currentTarget.closest("details");this.closeSubmenu(e)}closeSubmenu(e){var t=e.closest(".submenu-open");t&&t.classList.remove("submenu-open"),e.classList.remove("menu-opening"),e.querySelector("summary").setAttribute("aria-expanded",!1),removeTrapFocus(e.querySelector("summary")),this.closeAnimation(e)}closeAnimation(t){let i;const s=e=>{e-(i=void 0===i?e:i)<400?window.requestAnimationFrame(s):(t.removeAttribute("open"),t.closest("details[open]")&&trapFocus(t.closest("details[open]"),t.querySelector("summary")))};window.requestAnimationFrame(s)}}customElements.define("menu-drawer",MenuDrawer);class HeaderDrawer extends MenuDrawer{constructor(){super()}openMenuDrawer(e){this.header=this.header||document.getElementById("shopify-section-header"),this.borderOffset=this.borderOffset||this.closest(".header-wrapper").classList.contains("header-wrapper--border-bottom")?1:0,document.documentElement.style.setProperty("--header-bottom-position",parseInt(this.header.getBoundingClientRect().bottom-this.borderOffset)+"px"),this.header.classList.add("menu-open"),setTimeout(()=>{this.mainDetailsToggle.classList.add("menu-opening")}),e.setAttribute("aria-expanded",!0),trapFocus(this.mainDetailsToggle,e),document.body.classList.add("overflow-hidden-"+this.dataset.breakpoint)}closeMenuDrawer(e,t){super.closeMenuDrawer(e,t),this.header.classList.remove("menu-open")}}customElements.define("header-drawer",HeaderDrawer);class ModalDialog extends HTMLElement{constructor(){super(),this.querySelector('[id^="ModalClose-"]').addEventListener("click",this.hide.bind(this,!1)),this.addEventListener("keyup",e=>{"ESCAPE"===e.code.toUpperCase()&&this.hide()}),this.classList.contains("media-modal")?this.addEventListener("pointerup",e=>{"mouse"!==e.pointerType||e.target.closest("deferred-media, product-model")||this.hide()}):this.addEventListener("click",e=>{e.target===this&&this.hide()})}connectedCallback(){this.moved||(this.moved=!0,document.body.appendChild(this))}show(e){this.openedBy=e;e=this.querySelector(".template-popup");document.body.classList.add("overflow-hidden"),this.setAttribute("open",""),e&&e.loadContent(),trapFocus(this,this.querySelector('[role="dialog"]')),window.pauseAllMedia()}hide(){document.body.classList.remove("overflow-hidden"),document.body.dispatchEvent(new CustomEvent("modalClosed")),this.removeAttribute("open"),removeTrapFocus(this.openedBy),window.pauseAllMedia()}}customElements.define("modal-dialog",ModalDialog);class ModalOpener extends HTMLElement{constructor(){super();const t=this.querySelector("button");t&&t.addEventListener("click",()=>{var e=document.querySelector(this.getAttribute("data-modal"));e&&e.show(t)})}}customElements.define("modal-opener",ModalOpener);class DeferredMedia extends HTMLElement{constructor(){super();var e=this.querySelector('[id^="Deferred-Poster-"]');e&&e.addEventListener("click",this.loadContent.bind(this))}loadContent(e=!0){var t;window.pauseAllMedia(),this.getAttribute("loaded")||((t=document.createElement("div")).appendChild(this.querySelector("template").content.firstElementChild.cloneNode(!0)),this.setAttribute("loaded",!0),t=this.appendChild(t.querySelector("video, model-viewer, iframe")),e&&t.focus())}}customElements.define("deferred-media",DeferredMedia);class SliderComponent extends HTMLElement{constructor(){super(),this.slider=this.querySelector('[id^="Slider-"]'),this.sliderItems=this.querySelectorAll('[id^="Slide-"]'),this.enableSliderLooping=!1,this.currentPageElement=this.querySelector(".slider-counter--current"),this.pageTotalElement=this.querySelector(".slider-counter--total"),this.prevButton=this.querySelector('button[name="previous"]'),this.nextButton=this.querySelector('button[name="next"]'),this.slider&&this.nextButton&&(this.initPages(),new ResizeObserver(e=>this.initPages()).observe(this.slider),this.slider.addEventListener("scroll",this.update.bind(this),{passive:!0}),this.prevButton.addEventListener("click",this.onButtonClick.bind(this)),this.nextButton.addEventListener("click",this.onButtonClick.bind(this)))}initPages(){this.sliderItemsToShow=Array.from(this.sliderItems).filter(e=>0<e.clientWidth),this.sliderItemsToShow.length<2||(this.sliderItemOffset=this.sliderItemsToShow[1].offsetLeft-this.sliderItemsToShow[0].offsetLeft,this.slidesPerPage=Math.floor((this.slider.clientWidth-this.sliderItemsToShow[0].offsetLeft)/this.sliderItemOffset),this.totalPages=this.sliderItemsToShow.length-this.slidesPerPage+1,this.update())}resetPages(){this.sliderItems=this.querySelectorAll('[id^="Slide-"]'),this.initPages()}update(){var e=this.currentPage;this.currentPage=Math.round(this.slider.scrollLeft/this.sliderItemOffset)+1,this.currentPageElement&&this.pageTotalElement&&(this.currentPageElement.textContent=this.currentPage,this.pageTotalElement.textContent=this.totalPages),this.currentPage!=e&&this.dispatchEvent(new CustomEvent("slideChanged",{detail:{currentPage:this.currentPage,currentElement:this.sliderItemsToShow[this.currentPage-1]}})),this.enableSliderLooping||(this.isSlideVisible(this.sliderItemsToShow[0])&&0===this.slider.scrollLeft?this.prevButton.setAttribute("disabled","disabled"):this.prevButton.removeAttribute("disabled"),this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length-1])?this.nextButton.setAttribute("disabled","disabled"):this.nextButton.removeAttribute("disabled"))}isSlideVisible(e,t=0){t=this.slider.clientWidth+this.slider.scrollLeft-t;return e.offsetLeft+e.clientWidth<=t&&e.offsetLeft>=this.slider.scrollLeft}onButtonClick(e){e.preventDefault();var t=e.currentTarget.dataset.step||1;this.slideScrollPosition="next"===e.currentTarget.name?this.slider.scrollLeft+t*this.sliderItemOffset:this.slider.scrollLeft-t*this.sliderItemOffset,this.slider.scrollTo({left:this.slideScrollPosition})}}customElements.define("slider-component",SliderComponent);class SlideshowComponent extends SliderComponent{constructor(){super(),this.sliderControlWrapper=this.querySelector(".slider-buttons"),this.enableSliderLooping=!0,this.sliderControlWrapper&&(this.sliderFirstItemNode=this.slider.querySelector(".slideshow__slide"),0<this.sliderItemsToShow.length&&(this.currentPage=1),this.sliderControlLinksArray=Array.from(this.sliderControlWrapper.querySelectorAll(".slider-counter__link")),this.sliderControlLinksArray.forEach(e=>e.addEventListener("click",this.linkToSlide.bind(this))),this.slider.addEventListener("scroll",this.setSlideVisibility.bind(this),{passive:!0}),this.setSlideVisibility(),"true"===this.slider.getAttribute("data-autoplay"))&&this.setAutoPlay()}setAutoPlay(){this.sliderAutoplayButton=this.querySelector(".slideshow__autoplay"),this.autoplaySpeed=1e3*this.slider.dataset.speed,this.sliderAutoplayButton.addEventListener("click",this.autoPlayToggle.bind(this)),this.addEventListener("mouseover",this.focusInHandling.bind(this)),this.addEventListener("mouseleave",this.focusOutHandling.bind(this)),this.addEventListener("focusin",this.focusInHandling.bind(this)),this.addEventListener("focusout",this.focusOutHandling.bind(this)),this.play(),this.autoplayButtonIsSetToPlay=!0}onButtonClick(e){super.onButtonClick(e);var t=1===this.currentPage,i=this.currentPage===this.sliderItemsToShow.length;(t||i)&&(t&&"previous"===e.currentTarget.name?this.slideScrollPosition=this.slider.scrollLeft+this.sliderFirstItemNode.clientWidth*this.sliderItemsToShow.length:i&&"next"===e.currentTarget.name&&(this.slideScrollPosition=0),this.slider.scrollTo({left:this.slideScrollPosition}))}update(){super.update(),this.sliderControlButtons=this.querySelectorAll(".slider-counter__link"),this.prevButton.removeAttribute("disabled"),this.sliderControlButtons.length&&(this.sliderControlButtons.forEach(e=>{e.classList.remove("slider-counter__link--active"),e.removeAttribute("aria-current")}),this.sliderControlButtons[this.currentPage-1].classList.add("slider-counter__link--active"),this.sliderControlButtons[this.currentPage-1].setAttribute("aria-current",!0))}autoPlayToggle(){this.togglePlayButtonState(this.autoplayButtonIsSetToPlay),this.autoplayButtonIsSetToPlay?this.pause():this.play(),this.autoplayButtonIsSetToPlay=!this.autoplayButtonIsSetToPlay}focusOutHandling(e){e=e.target===this.sliderAutoplayButton||this.sliderAutoplayButton.contains(e.target);this.autoplayButtonIsSetToPlay&&!e&&this.play()}focusInHandling(e){(e.target===this.sliderAutoplayButton||this.sliderAutoplayButton.contains(e.target))&&this.autoplayButtonIsSetToPlay?this.play():this.autoplayButtonIsSetToPlay&&this.pause()}play(){this.slider.setAttribute("aria-live","off"),clearInterval(this.autoplay),this.autoplay=setInterval(this.autoRotateSlides.bind(this),this.autoplaySpeed)}pause(){this.slider.setAttribute("aria-live","polite"),clearInterval(this.autoplay)}togglePlayButtonState(e){e?(this.sliderAutoplayButton.classList.add("slideshow__autoplay--paused"),this.sliderAutoplayButton.setAttribute("aria-label",window.accessibilityStrings.playSlideshow)):(this.sliderAutoplayButton.classList.remove("slideshow__autoplay--paused"),this.sliderAutoplayButton.setAttribute("aria-label",window.accessibilityStrings.pauseSlideshow))}autoRotateSlides(){var e=this.currentPage===this.sliderItems.length?0:this.slider.scrollLeft+this.slider.querySelector(".slideshow__slide").clientWidth;this.slider.scrollTo({left:e})}setSlideVisibility(){this.sliderItemsToShow.forEach((e,t)=>{var i=e.querySelectorAll("a");t===this.currentPage-1?(i.length&&i.forEach(e=>{e.removeAttribute("tabindex")}),e.setAttribute("aria-hidden","false"),e.removeAttribute("tabindex")):(i.length&&i.forEach(e=>{e.setAttribute("tabindex","-1")}),e.setAttribute("aria-hidden","true"),e.setAttribute("tabindex","-1"))})}linkToSlide(e){e.preventDefault();e=this.slider.scrollLeft+this.sliderFirstItemNode.clientWidth*(this.sliderControlLinksArray.indexOf(e.currentTarget)+1-this.currentPage);this.slider.scrollTo({left:e})}}customElements.define("slideshow-component",SlideshowComponent);class VariantSelects extends HTMLElement{constructor(){super(),this.addEventListener("change",this.onVariantChange)}onVariantChange(){this.updateOptions(),this.updateMasterId(),this.toggleAddButton(!0,"",!1),this.updatePickupAvailability(),this.removeErrorMessage(),this.currentVariant?(this.updateMedia(),this.updateURL(),this.updateVariantInput(),this.renderProductInfo(),this.updateShareUrl()):(this.toggleAddButton(!0,"",!0),this.setUnavailable())}updateOptions(){this.options=Array.from(this.querySelectorAll("select"),e=>e.value)}updateMasterId(){this.currentVariant=this.getVariantData().find(e=>!e.options.map((e,t)=>this.options[t]===e).includes(!1))}updateMedia(){var e,t;this.currentVariant&&this.currentVariant.featured_media&&(document.querySelectorAll(`[id^="MediaGallery-${this.dataset.section}"]`).forEach(e=>e.setActiveMedia(this.dataset.section+"-"+this.currentVariant.featured_media.id,!0)),e=document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`))&&(t=e.querySelector(`[data-media-id="${this.currentVariant.featured_media.id}"]`),e.prepend(t))}updateURL(){this.currentVariant&&"false"!==this.dataset.updateUrl&&window.history.replaceState({},"",this.dataset.url+"?variant="+this.currentVariant.id)}updateShareUrl(){var e=document.getElementById("Share-"+this.dataset.section);e&&e.updateUrl&&e.updateUrl(""+window.shopUrl+this.dataset.url+"?variant="+this.currentVariant.id)}updateVariantInput(){document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-`+this.dataset.section).forEach(e=>{e=e.querySelector('input[name="id"]');e.value=this.currentVariant.id,e.dispatchEvent(new Event("change",{bubbles:!0}))})}updatePickupAvailability(){var e,t=document.querySelector("pickup-availability");t&&((e=document.querySelector("product-form"))&&e.updateOption(),this.currentVariant&&this.currentVariant.available&&t.fetchAvailability?t.fetchAvailability(this.currentVariant.id):(t.removeAttribute("available"),t.innerHTML=""))}removeErrorMessage(){var e=this.closest("section");e&&(e=e.querySelector("product-form"))&&e.handleErrorMessage()}renderProductInfo(){fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=`+(this.dataset.originalSection||this.dataset.section)).then(e=>e.text()).then(e=>{var e=(new DOMParser).parseFromString(e,"text/html"),t=document.getElementById("price-"+this.dataset.section),e=e.getElementById("price-"+(this.dataset.originalSection||this.dataset.section)),t=(e&&t&&(t.innerHTML=e.innerHTML),document.getElementById("price-"+this.dataset.section));t&&t.classList.remove("visibility-hidden"),this.toggleAddButton(!this.currentVariant.available,window.variantStrings.soldOut)})}toggleAddButton(e=!0,t,i){var s,n=document.getElementById("product-form-"+this.dataset.section);n&&(s=n.querySelector('[name="add"]'),n=n.querySelector('[name="add"] > span'),s)&&(e?(s.setAttribute("disabled","disabled"),t&&(n.textContent=t)):(s.removeAttribute("disabled"),n.textContent=window.variantStrings.addToCart))}setUnavailable(){var e=document.getElementById("product-form-"+this.dataset.section),t=e.querySelector('[name="add"]'),e=e.querySelector('[name="add"] > span'),i=document.getElementById("price-"+this.dataset.section);t&&(e.textContent=window.variantStrings.unavailable,i)&&i.classList.add("visibility-hidden")}getVariantData(){return this.variantData=this.variantData||JSON.parse(this.querySelector('[type="application/json"]').textContent),this.variantData}}customElements.define("variant-selects",VariantSelects);class VariantRadios extends VariantSelects{constructor(){super()}updateOptions(){var e=Array.from(this.querySelectorAll("fieldset"));this.options=e.map(e=>Array.from(e.querySelectorAll("input")).find(e=>e.checked).value)}}customElements.define("variant-radios",VariantRadios);class ProductRecommendations extends HTMLElement{constructor(){super()}connectedCallback(){new IntersectionObserver(((e,t)=>{e[0].isIntersecting&&(t.unobserve(this),fetch(this.dataset.url).then(e=>e.text()).then(e=>{var t=document.createElement("div"),e=(t.innerHTML=e,t.querySelector("product-recommendations"));e&&e.innerHTML.trim().length&&(this.innerHTML=e.innerHTML),!this.querySelector("slideshow-component")&&this.classList.contains("complementary-products")&&this.remove(),t.querySelector(".grid__item")&&this.classList.add("product-recommendations--loaded")}).catch(e=>{console.error(e)}))}).bind(this),{rootMargin:"0px 0px 400px 0px"}).observe(this)}}customElements.define("product-recommendations",ProductRecommendations);
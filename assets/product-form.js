customElements.get("product-form")||customElements.define("product-form",class extends HTMLElement{constructor(){super(),this.submitButton=this.querySelector(".product-form__submit"),this.productId=this.querySelector('input[name="id"]').value,this.querySelector("[name=id]").disabled=!1,this.submitButton?.addEventListener("click",this.onSubmitHandler.bind(this)),this.cart=document.querySelector("cart-notification")||document.querySelector("cart-drawer"),this.checkoutButton=document.querySelector(".checkout-button"),this.checkoutButton&&this.checkoutButton.addEventListener("click",this.onCheckoutHandler.bind(this)),document.querySelector("cart-drawer")&&this.submitButton?.setAttribute("aria-haspopup","dialog")}async onSubmitHandler(e){if("true"!==this.submitButton.getAttribute("aria-disabled"))if(!this.inspectSelectedProduct()&&document.querySelector(".product-fieldset"))document.querySelector(".product-fieldset").scrollIntoView({behavior:"smooth",block:"start"}),document.querySelector(".required").style.display="block";else{document.querySelector(".required").style.display="none",this.handleErrorMessage(),this.submitButton.setAttribute("aria-disabled",!0),this.submitButton.classList.add("loading"),this.querySelector(".loading-overlay__spinner").classList.remove("hidden");var t=fetchConfig("javascript"),r=(t.headers["X-Requested-With"]="XMLHttpRequest",delete t.headers["Content-Type"],Array.from(document.querySelectorAll(".product-form__input.product-form__quantity")).map(e=>parseInt(e.querySelector("input").value))),r=Math.max(...r),o=new FormData;this.cart&&(o.append("sections",this.cart.getSectionsToRender().map(e=>e.id)),o.append("sections_url",window.location.pathname),o.append("id",this.updateOption()??this.productId),o.append("quantity",parseInt(r)),o.append("form_type","product"),this.cart.setActiveElement(document.activeElement));try{await this.getAttachmentList(),await this.getGiftProduct()}catch(e){console.log(e)}await fetch(""+routes.cart_add_url,{...t,body:o}).then(e=>e.json()).then(e=>{var t;if(e.status)return this.handleErrorMessage(e.description),(t=this.submitButton.querySelector(".sold-out-message"))?(this.submitButton.setAttribute("aria-disabled",!0),this.submitButton.querySelector("span").classList.add("hidden"),t.classList.remove("hidden"),void(this.error=!0)):void 0;this.cart?(this.error=!1,(t=this.closest("quick-add-modal"))?(document.body.addEventListener("modalClosed",()=>{setTimeout(()=>{this.cart.renderContents(e)})},{once:!0}),t.hide(!0)):this.cart.renderContents(e)):window.location=window.routes.cart_url}).catch(e=>{console.error(e)}).finally(()=>{this.submitButton.classList.remove("loading"),this.cart&&this.cart.classList.contains("is-empty")&&this.cart.classList.remove("is-empty"),this.error||this.submitButton.removeAttribute("aria-disabled"),this.querySelector(".loading-overlay__spinner").classList.add("hidden")})}}updateOption(){var e=new URL(""+window.location.href);return new URLSearchParams(e.search).get("variant")}handleErrorMessage(e=!1){this.errorMessageWrapper=this.errorMessageWrapper||this.querySelector(".product-form__error-message-wrapper"),this.errorMessageWrapper&&(this.errorMessage=this.errorMessage||this.errorMessageWrapper.querySelector(".product-form__error-message"),this.errorMessageWrapper.toggleAttribute("hidden",!e),e)&&(this.errorMessage.textContent=e)}inspectSelectedProduct(){let t=!0;var e=document.querySelector("variant-radios .product-fieldset");if(e){var r=e.querySelectorAll(".product-set");for(let e=0;e<r.length;e++){if(r[e].querySelector("input").checked)return!0;r[e].querySelector("input").checked||(t=!1)}return t}}async getGiftProduct(){var e=document.querySelector(".product-gift");if(e){var t,e=Array.from(e.querySelectorAll(".add_list_product")),r=fetchConfig("javascript");r.headers["X-Requested-With"]="XMLHttpRequest",delete r.headers["Content-Type"];for(const o of e)o.querySelector(".addons_input").checked&&((t=new FormData).append("id",o.querySelector(".addons_input").value),t.append("quantity",1),t.append("form_type","product"),await fetch(""+routes.cart_add_url,{...r,body:t}))}}async getAttachmentList(){var e=document.querySelector(".product_acessories-wrapper");if(e){var t,e=Array.from(e.querySelectorAll(".add_list_product")),r=fetchConfig("javascript");r.headers["X-Requested-With"]="XMLHttpRequest",delete r.headers["Content-Type"];for(const o of e)o.querySelector(".addons_input").checked&&((t=new FormData).append("id",o.querySelector(".addons_input").value),t.append("quantity",o.querySelector(".quantity__input").value),t.append("form_type","product"),await fetch(""+routes.cart_add_url,{...r,body:t}))}}async onCheckoutHandler(){var e=document.querySelector(".product-form__input.product-form__quantity").querySelector("input").value,t=new FormData,r=fetchConfig("javascript");r.headers["X-Requested-With"]="XMLHttpRequest",delete r.headers["Content-Type"],t.append("id",this.productId),t.append("quantity",parseInt(e)),await fetch(""+routes.cart_add_url,{...r,body:t}).then(()=>{window.location.href="/checkout"})}});
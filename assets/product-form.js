customElements.get("product-form")||customElements.define("product-form",class extends HTMLElement{constructor(){super(),this.submitButton=this.querySelector(".product-form__submit"),this.productId=this.querySelector('input[name="id"]').value,this.querySelector("[name=id]").disabled=!1,this.submitButton.addEventListener("click",this.onSubmitHandler.bind(this)),this.cart=document.querySelector("cart-notification")||document.querySelector("cart-drawer"),this.checkoutButton=document.querySelector(".checkout-button"),this.checkoutButton&&this.checkoutButton.addEventListener("click",this.onCheckoutHandler.bind(this)),document.querySelector("cart-drawer")&&this.submitButton.setAttribute("aria-haspopup","dialog")}async onSubmitHandler(t){if("true"!==this.submitButton.getAttribute("aria-disabled")){this.handleErrorMessage(),this.submitButton.setAttribute("aria-disabled",!0),this.submitButton.classList.add("loading"),this.querySelector(".loading-overlay__spinner").classList.remove("hidden");var e=fetchConfig("javascript"),r=(e.headers["X-Requested-With"]="XMLHttpRequest",delete e.headers["Content-Type"],document.querySelector(".product-form__input.product-form__quantity").querySelector("input").value),s=new FormData;this.cart&&(s.append("sections",this.cart.getSectionsToRender().map(t=>t.id)),s.append("sections_url",window.location.pathname),s.append("id",this.updateOption()??this.productId),s.append("quantity",parseInt(r)),s.append("form_type","product"),this.cart.setActiveElement(document.activeElement));try{await this.getAttachmentList()}catch(t){console.log(t)}await fetch(""+routes.cart_add_url,{...e,body:s}).then(t=>t.json()).then(t=>{var e;if(t.status)return this.handleErrorMessage(t.description),(e=this.submitButton.querySelector(".sold-out-message"))?(this.submitButton.setAttribute("aria-disabled",!0),this.submitButton.querySelector("span").classList.add("hidden"),e.classList.remove("hidden"),void(this.error=!0)):void 0;this.cart?(this.error=!1,(e=this.closest("quick-add-modal"))?(document.body.addEventListener("modalClosed",()=>{setTimeout(()=>{this.cart.renderContents(t)})},{once:!0}),e.hide(!0)):this.cart.renderContents(t)):window.location=window.routes.cart_url}).catch(t=>{console.error(t)}).finally(()=>{this.submitButton.classList.remove("loading"),this.cart&&this.cart.classList.contains("is-empty")&&this.cart.classList.remove("is-empty"),this.error||this.submitButton.removeAttribute("aria-disabled"),this.querySelector(".loading-overlay__spinner").classList.add("hidden")})}}updateOption(){var t=new URL(""+window.location.href);return new URLSearchParams(t.search).get("variant")}handleErrorMessage(t=!1){this.errorMessageWrapper=this.errorMessageWrapper||this.querySelector(".product-form__error-message-wrapper"),this.errorMessageWrapper&&(this.errorMessage=this.errorMessage||this.errorMessageWrapper.querySelector(".product-form__error-message"),this.errorMessageWrapper.toggleAttribute("hidden",!t),t)&&(this.errorMessage.textContent=t)}async getAttachmentList(){var t=document.querySelector(".product_acessories-wrapper");if(t){var e,t=Array.from(t.querySelectorAll(".add_list_product")),r=fetchConfig("javascript");r.headers["X-Requested-With"]="XMLHttpRequest",delete r.headers["Content-Type"];for(const s of t)s.querySelector(".addons_input").checked&&((e=new FormData).append("id",s.querySelector(".addons_input").value),e.append("quantity",s.querySelector(".quantity__input").value),e.append("form_type","product"),await fetch(""+routes.cart_add_url,{...r,body:e}))}}async onCheckoutHandler(){var t=document.querySelector(".product-form__input.product-form__quantity").querySelector("input").value,e=new FormData,r=fetchConfig("javascript");r.headers["X-Requested-With"]="XMLHttpRequest",delete r.headers["Content-Type"],e.append("id",this.productId),e.append("quantity",parseInt(t)),await fetch(""+routes.cart_add_url,{...r,body:e}).then(()=>{window.location.href="/checkout"})}});
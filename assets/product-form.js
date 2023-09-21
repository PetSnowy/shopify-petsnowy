if(!customElements.get("product-form")){customElements.define("product-form",class extends HTMLElement{constructor(){super(),this.form=this.querySelector("form"),this.form.querySelector("[name=id]").disabled=!1,this.form.addEventListener("submit",this.onSubmitHandler.bind(this),{passive:!1}),this.cart=document.querySelector("cart-notification")||document.querySelector("cart-drawer"),this.submitButton=this.querySelector('[type="submit"]'),document.querySelector("cart-drawer")&&this.submitButton.setAttribute("aria-haspopup","dialog")}async onSubmitHandler(e){if(console.log(e),e.preventDefault(),"true"!==this.submitButton.getAttribute("aria-disabled")){this.handleErrorMessage(),this.submitButton.setAttribute("aria-disabled",!0),this.submitButton.classList.add("loading"),this.querySelector(".loading-overlay__spinner").classList.remove("hidden");var e=fetchConfig("javascript"),t=(e.headers["X-Requested-With"]="XMLHttpRequest",delete e.headers["Content-Type"],new FormData(this.form));this.cart&&(t.append("sections",this.cart.getSectionsToRender().map(e=>e.id)),t.append("sections_url",window.location.pathname),this.cart.setActiveElement(document.activeElement)),e.body=t;try{await this.getAttachmentList()}catch(e){console.log(e)}await fetch(""+routes.cart_add_url,e).then(e=>e.json()).then(e=>{var t;if(e.status)return this.handleErrorMessage(e.description),(t=this.submitButton.querySelector(".sold-out-message"))?(this.submitButton.setAttribute("aria-disabled",!0),this.submitButton.querySelector("span").classList.add("hidden"),t.classList.remove("hidden"),void(this.error=!0)):void 0;this.cart?(this.error=!1,(t=this.closest("quick-add-modal"))?(document.body.addEventListener("modalClosed",()=>{setTimeout(()=>{this.cart.renderContents(e)})},{once:!0}),t.hide(!0)):this.cart.renderContents(e)):window.location=window.routes.cart_url}).catch(e=>{console.error(e)}).finally(()=>{this.submitButton.classList.remove("loading"),this.cart&&this.cart.classList.contains("is-empty")&&this.cart.classList.remove("is-empty"),this.error||this.submitButton.removeAttribute("aria-disabled"),this.querySelector(".loading-overlay__spinner").classList.add("hidden")})}}handleErrorMessage(e=!1){this.errorMessageWrapper=this.errorMessageWrapper||this.querySelector(".product-form__error-message-wrapper"),this.errorMessageWrapper&&(this.errorMessage=this.errorMessage||this.errorMessageWrapper.querySelector(".product-form__error-message"),this.errorMessageWrapper.toggleAttribute("hidden",!e),e)&&(this.errorMessage.textContent=e)}async getAttachmentList(){var e=document.querySelector(".product_acessories-wrapper");if(e){var t,e=Array.from(e.querySelectorAll(".add_list_product")),r=fetchConfig("javascript");r.headers["X-Requested-With"]="XMLHttpRequest",delete r.headers["Content-Type"];for(const s of e)s.querySelector(".addons_input").checked&&((t=new FormData).append("id",s.querySelector(".addons_input").value),t.append("quantity",s.querySelector(".quantity__input").value),t.append("form_type","product"),await fetch(""+routes.cart_add_url,{...r,body:t}))}}});const a=document.querySelector(".checkout-button");a&&a.addEventListener("click",()=>{var e=new FormData,t=fetchConfig("javascript"),r=(t.headers["X-Requested-With"]="XMLHttpRequest",delete t.headers["Content-Type"],document.querySelector("product-form").querySelector('input[name="id"]').value),s=document.querySelector(".product-form__input.product-form__quantity").querySelector(".quantity").input.value;e.append("id",r),e.append("quantity",parseInt(s)),fetch(""+routes.cart_add_url,{...t,body:e}).then(()=>{window.location.href="/checkout"})})}
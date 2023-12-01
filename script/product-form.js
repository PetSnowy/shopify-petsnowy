if (!customElements.get('product-form')) {
	customElements.define('product-form', class ProductForm extends HTMLElement {
		constructor() {
			super();
			this.submitButton = this.querySelector('.product-form__submit');

			this.productId = this.querySelector('input[name="id"]').value

			this.querySelector('[name=id]').disabled = false;
			this.submitButton?.addEventListener('click', this.onSubmitHandler.bind(this));

			this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');

			this.checkoutButton = document.querySelector('.checkout-button');
			this.checkoutButton && this.checkoutButton.addEventListener('click', this.onCheckoutHandler.bind(this));

			if (document.querySelector('cart-drawer')) this.submitButton?.setAttribute('aria-haspopup', 'dialog');
		}

		async onSubmitHandler(evt) {
			if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

			if (!this.inspectSelectedProduct() && document.querySelector('.product-fieldset')) {
				document.querySelector('.product-fieldset').scrollIntoView({ behavior: "smooth", block: "start" })
				document.querySelector('.required').style.display = 'block';
				return
			}
			if (document.querySelector('.required')) {
				document.querySelector('.required').style.display = 'none';
			}

			this.handleErrorMessage();

			this.submitButton.setAttribute('aria-disabled', true);
			this.submitButton.classList.add('loading');
			this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

			const config = fetchConfig('javascript');
			config.headers['X-Requested-With'] = 'XMLHttpRequest';
			delete config.headers['Content-Type'];
			const temp = Array.from(document.querySelectorAll('.product-form__input.product-form__quantity')).map(item => parseInt(item.querySelector('input').value))
			const quantity = Math.max(...temp);

			const formData = new FormData();
			if (this.cart) {
				formData.append('sections', this.cart.getSectionsToRender().map((section) => section.id));
				formData.append('sections_url', window.location.pathname);
				formData.append('id', this.updateOption() ?? this.productId);
				formData.append('quantity', parseInt(quantity));
				formData.append('form_type', 'product');
				this.cart.setActiveElement(document.activeElement);
			}

			try {
				await this.getAttachmentList()
				await this.getGiftProduct()
			} catch (error) {
				console.log(error);
			}

			await fetch(`${routes.cart_add_url}`, { ...config, body: formData })
				.then((response) => response.json())
				.then((response) => {
					if (response.status) {
						this.handleErrorMessage(response.description);

						const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
						if (!soldOutMessage) return;
						this.submitButton.setAttribute('aria-disabled', true);
						this.submitButton.querySelector('span').classList.add('hidden');
						soldOutMessage.classList.remove('hidden');
						this.error = true;
						return;
					} else if (!this.cart) {
						window.location = window.routes.cart_url;
						return;
					}

					this.error = false;
					const quickAddModal = this.closest('quick-add-modal');
					if (quickAddModal) {
						document.body.addEventListener('modalClosed', () => {
							setTimeout(() => { this.cart.renderContents(response) });
						}, { once: true });
						quickAddModal.hide(true);
					} else {
						this.cart.renderContents(response);
					}
				})
				.catch((e) => {
					console.error(e);
				})
				.finally(() => {
					this.submitButton.classList.remove('loading');
					if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
					if (!this.error) this.submitButton.removeAttribute('aria-disabled');
					this.querySelector('.loading-overlay__spinner').classList.add('hidden');
				});
		}

		updateOption() {
			const url = new URL(`${window.location.href}`);
			const urlParams = new URLSearchParams(url.search);
			return urlParams.get('variant');
		}

		handleErrorMessage(errorMessage = false) {
			this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
			if (!this.errorMessageWrapper) return;
			this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

			this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

			if (errorMessage) {
				this.errorMessage.textContent = errorMessage;
			}
		}

		inspectSelectedProduct() {
			let result = true
			const product = document.querySelector('variant-radios .product-fieldset')
			if (!product) return
			const selectedProduct = product.querySelectorAll('.product-set')
			for (let i = 0; i < selectedProduct.length; i++) {
				if (selectedProduct[i].querySelector('input').checked) {
					return true
				}
				if (!selectedProduct[i].querySelector('input').checked) {
					result = false
				}
			}
			return result
		}

		// 赠送产品选择

		async getGiftProduct() {
			const giftProduct = document.querySelector('.product-gift');
			if (!giftProduct) return
			const productGift = Array.from(giftProduct.querySelectorAll('.add_list_product'))
			const config = fetchConfig('javascript');
			config.headers['X-Requested-With'] = 'XMLHttpRequest';
			delete config.headers['Content-Type'];

			for (const girt of productGift) {
				if (girt.querySelector('.addons_input').checked) {
					const formData = new FormData();
					formData.append('id', girt.querySelector('.addons_input').value);
					formData.append('quantity', 1);
					formData.append('form_type', 'product');
					await fetch(`${routes.cart_add_url}`, {
						...config,
						body: formData,
					});
				}
			}
		}

		// 配件选择
		async getAttachmentList() {
			const productAttachmentWrapper = document.querySelector('.product_acessories-wrapper')

			if (!productAttachmentWrapper) return
			const productAttachment = Array.from(productAttachmentWrapper.querySelectorAll('.add_list_product'));
			const config = fetchConfig('javascript');
			config.headers['X-Requested-With'] = 'XMLHttpRequest';
			delete config.headers['Content-Type'];

			for (const attachment of productAttachment) {
				if (attachment.querySelector('.addons_input').checked) {
					const formData = new FormData();
					formData.append('id', attachment.querySelector('.addons_input').value);
					formData.append('quantity', attachment.querySelector('.quantity__input').value);
					formData.append('form_type', 'product');
					await fetch(`${routes.cart_add_url}`, {
						...config,
						body: formData,
					});
				}
			}
		}

		async onCheckoutHandler() {
			const quantity = document.querySelector('.product-form__input.product-form__quantity').querySelector('input').value
			const formData = new FormData();
			const config = fetchConfig('javascript');
			config.headers['X-Requested-With'] = 'XMLHttpRequest';
			delete config.headers['Content-Type'];
			formData.append('id', this.productId);
			formData.append('quantity', parseInt(quantity));
			await fetch(`${routes.cart_add_url}`, {
				...config,
				body: formData,
			}).then(() => {
				window.location.href = '/checkout';
			})
		}
	});
}
if (!customElements.get('product-form')) {
	customElements.define('product-form', class ProductForm extends HTMLElement {
		constructor() {
			super();

			this.form = this.querySelector('form');
			this.form.querySelector('[name=id]').disabled = false;
			this.form.querySelector('.product-form__submit').addEventListener('click', this.onSubmitHandler.bind(this), { passive: false });
			this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
			this.submitButton = this.querySelector('[type="submit"]');
			if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');
		}

		async onSubmitHandler(evt) {
			evt.preventDefault();
			if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

			this.handleErrorMessage();

			this.submitButton.setAttribute('aria-disabled', true);
			this.submitButton.classList.add('loading');
			this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

			const config = fetchConfig('javascript');
			config.headers['X-Requested-With'] = 'XMLHttpRequest';
			delete config.headers['Content-Type'];

			const formData = new FormData(this.form);
			if (this.cart) {
				formData.append('sections', this.cart.getSectionsToRender().map((section) => section.id));
				formData.append('sections_url', window.location.pathname);
				this.cart.setActiveElement(document.activeElement);
			}
			config.body = formData;

			try {
				await this.getAttachmentList()
			} catch (error) {
				console.log(error);
			}

			await fetch(`${routes.cart_add_url}`, config)
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

		handleErrorMessage(errorMessage = false) {
			this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
			if (!this.errorMessageWrapper) return;
			this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

			this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

			if (errorMessage) {
				this.errorMessage.textContent = errorMessage;
			}
		}

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
	});

	const checkout = document.querySelector('.checkout-button')
	checkout && checkout.addEventListener('click', () => {
		const formData = new FormData();
		const config = fetchConfig('javascript');
		config.headers['X-Requested-With'] = 'XMLHttpRequest';
		delete config.headers['Content-Type'];
		const id = document.querySelector('product-form').querySelector('input[name="id"]').value
		const quantity = document.querySelector('.product-form__input.product-form__quantity').querySelector('.quantity').input.value
		formData.append('id', id);
		formData.append('quantity', parseInt(quantity));
		fetch(`${routes.cart_add_url}`, {
			...config,
			body: formData,
		}).then(() => {
			window.location.href = '/checkout';
		})
	})
}
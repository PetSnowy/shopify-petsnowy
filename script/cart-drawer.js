class CartDrawer extends HTMLElement {
	constructor() {
		super();

		this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
		this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
		this.setHeaderCartIconAccessibility();
	}

	setHeaderCartIconAccessibility() {
		const cartLink = document.querySelector('#cart-icon-bubble');
		cartLink.setAttribute('role', 'button');
		cartLink.setAttribute('aria-haspopup', 'dialog');
		cartLink.addEventListener('click', (event) => {
			event.preventDefault();
			this.open(cartLink)
		});
		cartLink.addEventListener('keydown', (event) => {
			if (event.code.toUpperCase() === 'SPACE') {
				event.preventDefault();
				this.open(cartLink);
			}
		});
	}
	//update cart data
	connectedCallback() {
		jQuery.getJSON('/cart.js', function ({ items }) {
			document.dispatchEvent(new CustomEvent('cart:build', { bubbles: true }));
			document.dispatchEvent(new CustomEvent('cart:refresh', {
				bubbles: true,
				detail: items
			}));
		});
	}

	open(triggeredBy) {
		if (triggeredBy) this.setActiveElement(triggeredBy);
		const cartDrawerNote = this.querySelector('[id^="Details-"] summary');
		if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) this.setSummaryAccessibility(cartDrawerNote);
		// here the animation doesn't seem to always get triggered. A timeout seem to help
		setTimeout(() => { this.classList.add('animate', 'active') });

		this.addEventListener('transitionend', () => {
			const containerToTrapFocusOn = this.classList.contains('is-empty') ? this.querySelector('.drawer__inner-empty') : document.getElementById('CartDrawer');
			const focusElement = this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');
			trapFocus(containerToTrapFocusOn, focusElement);
		}, { once: true });
		if (!this.hasScrollbar()) return
		document.documentElement.classList.add('overflow-hidden');
		document.body.style.overflowY = 'scroll';
		document.querySelector('sticky-header').style.overflowY = 'scroll';
	}

	close() {
		this.classList.remove('active');
		removeTrapFocus(this.activeElement);
		document.documentElement.classList.remove('overflow-hidden');
		document.body.style.overflowY = 'auto';
		document.querySelector('sticky-header').style.overflowY = ''
	}

	hasScrollbar() {
		const documentHeight = Math.max(
			document.body.scrollHeight,
			document.documentElement.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.offsetHeight,
			document.body.clientHeight,
			document.documentElement.clientHeight
		);
		const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
		return documentHeight > viewportHeight ? true : false;
	}

	setSummaryAccessibility(cartDrawerNote) {
		cartDrawerNote.setAttribute('role', 'button');
		cartDrawerNote.setAttribute('aria-expanded', 'false');

		if (cartDrawerNote.nextElementSibling.getAttribute('id')) {
			cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
		}

		cartDrawerNote.addEventListener('click', (event) => {
			event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
		});

		cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
	}

	renderContents(parsedState) {
		this.querySelector('.drawer__inner').classList.contains('is-empty') && this.querySelector('.drawer__inner').classList.remove('is-empty');
		this.productId = parsedState.id;
		this.getSectionsToRender().forEach((section => {
			const sectionElement = section.selector ? document.querySelector(section.selector) : document.getElementById(section.id);
			sectionElement.innerHTML =
				this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
		}));

		setTimeout(() => {
			this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
			this.open();
		});
	}

	getSectionInnerHTML(html, selector = '.shopify-section') {
		return new DOMParser()
			.parseFromString(html, 'text/html')
			.querySelector(selector).innerHTML;
	}

	getSectionsToRender() {
		return [
			{
				id: 'cart-drawer',
				selector: '#CartDrawer'
			},
			{
				id: 'cart-icon-bubble'
			}
		];
	}

	getSectionDOM(html, selector = '.shopify-section') {
		return new DOMParser()
			.parseFromString(html, 'text/html')
			.querySelector(selector);
	}

	setActiveElement(element) {
		this.activeElement = element;
	}
}

customElements.define('cart-drawer', CartDrawer);

class CartDrawerItems extends CartItems {
	getSectionsToRender() {
		return [
			{
				id: 'CartDrawer',
				section: 'cart-drawer',
				selector: '.drawer__inner'
			},
			{
				id: 'cart-icon-bubble',
				section: 'cart-icon-bubble',
				selector: '.shopify-section'
			}
		];
	}
}

customElements.define('cart-drawer-items', CartDrawerItems);

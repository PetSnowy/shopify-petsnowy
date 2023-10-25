class ProductRecommendation extends HTMLElement {
	constructor() {
		super();
		this.productId = this.getAttribute('product-id');
		this.cartDrawer = document.querySelector('cart-drawer')
	}

	connectedCallback() {
		console.log(this.getProductsRecommend());
	}

	async getProductsRecommend() {
		const { map } = await this.cartDrawer.getProductsRecommended();
		console.log(map);
	}




}

customElements.define('product-recommendation', ProductRecommendation);

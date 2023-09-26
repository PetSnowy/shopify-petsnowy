class ProductRecommendation extends HTMLElement {
	constructor() {
		super();
		this.productId = this.getAttribute('product-id');
		this.fetchProductRecommendation(this.productId, 1, 'related').then((productRecommendationList) => {
			console.log(productRecommendationList);
		})
	}

	async fetchProductRecommendation(productId, limit, intent) {
		try {
			const response = await fetch(window.Shopify.routes.root + `recommendations/products.json?product_id=${productId}&limit=${limit}&intent=${intent}`);
			const { products } = await response.json();
			return products.length && products;
		} catch (error) {
			console.log(error);
		}
	}
}

customElements.define('product-recommendation', ProductRecommendation);

class ProductRecommendation extends HTMLElement {
	constructor() {
		super()
		this.productId = this.getAttribute('product-id')
	}
}
customElements.define('product-recommendation', ProductRecommendation)
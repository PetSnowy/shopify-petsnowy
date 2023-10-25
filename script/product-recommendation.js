class ProductRecommendation extends HTMLElement {
	constructor() {
		super()
		this.cart = document.querySelector('cart-drawer').querySelector('.drawer__inner')
	}
	renderRecommendations(result) {
		if (!result.length) {
			return;
		}

		const item = Array.from(this.querySelectorAll('recommendation-item'));
		item.length && item.forEach((item) => item.remove());
		result.forEach(resultItem => {
			const { title, price, featured_image, url } = resultItem;
			const recommendationItem = document.createElement('recommendation-item');
			recommendationItem.innerHTML =
				`<div class='img'>
					<img src=${featured_image}>
				</div>
				<div class='content'>
					<a href=${url} class='title'>${title}</a>
					<p class='price'>${price}</p>
					<button>Add To Cart</button>
				</div>`;
			console.log(this.appendChild(recommendationItem));
			// resultItem && this.appendChild(recommendationItem)
		});
	}

}

class RecommendationItem extends ProductRecommendation {
	constructor() {
		super()
	}
}

customElements.define('product-recommendation', ProductRecommendation);
customElements.define('recommendation-item', RecommendationItem);

class ProductRecommendation extends HTMLElement {
	constructor() {
		super();
		this.cartItems = document.querySelector('cart-items') || document.querySelector('cart-drawer-items');
		this.cartDrawer = document.querySelector('cart-drawer')
	}

	//点击添加按钮将产品加入购物车
	recommendationAddCart() {
		const button = Array.from(this.querySelectorAll('button'))
		button.forEach((item) => item.addEventListener('click', async (event) => {
			item.style.pointerEvents = "none";
			item.querySelector('.loading-overlay__spinner').classList.remove('hidden')
			await this.addToCart(item.dataset.id)
			await this.cartItems.updateQuantity(0, 1)
			await this.cartDrawer.renderRecommendations(await this.cartDrawer.getProductsRecommended())
		}))
	}

	async addToCart(id, quantity = 1) {
		const data = {
			id,
			quantity
		}
		await fetch('/cart/add.js', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
}

customElements.define('product-recommendation', ProductRecommendation);
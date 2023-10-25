class ProductRecommendation extends HTMLElement{constructor(){super(),this.cart=document.querySelector("cart-drawer").querySelector(".drawer__inner")}renderRecommendations(e){var t;e.length&&((t=Array.from(this.querySelectorAll("recommendation-item"))).length&&t.forEach(e=>e.remove()),e.forEach(e=>{var{title:e,price:t,featured_image:r,url:n}=e;document.createElement("recommendation-item").innerHTML=`<div class='img'>
					<img src=${r}>
				</div>
				<div class='content'>
					<a href=${n} class='title'>${e}</a>
					<p class='price'>${t}</p>
					<button>Add To Cart</button>
				</div>`}))}}class RecommendationItem extends ProductRecommendation{constructor(){super()}}customElements.define("product-recommendation",ProductRecommendation),customElements.define("recommendation-item",RecommendationItem);
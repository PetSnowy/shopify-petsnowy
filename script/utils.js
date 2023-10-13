// 清空购物车
export const clearCart = () => {
	$.ajax({
		type: 'POST',
		url: '/cart/clear.js',
		dataType: 'json',
		success: function () {
			getCart()
		}
	});
}
// 获取购物车数据
export const getCart = () => {
	$.ajax({
		type: 'POST',
		url: '/cart.js',
		dataType: 'json',
		success: function (data) {
			return data;
		},
		error: function (err) {
			return err
		}
	});
}
// 添加产品到购物车
export async function addCart(formData) {
	const config = fetchConfig('javascript');
	config.headers['X-Requested-With'] = 'XMLHttpRequest';
	delete config.headers['Content-Type'];
	await fetch(`${routes.cart_add_url}`, { ...config, body: formData }).then((response) => response.json())
		.then((response) => {
			return response
		})
}
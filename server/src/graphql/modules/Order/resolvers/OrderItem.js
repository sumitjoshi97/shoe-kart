import Product from '../../../../db/models/Product'

const OrderItem = {
	product: async orderItem => await Product.findById(orderItem.product),
}

export default OrderItem

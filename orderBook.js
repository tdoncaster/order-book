function reconcileOrder(existingBook, incomingOrder) {

  //book = array of objects, incoming = object
  if (existingBook.length === 0) {
    existingBook.push(incomingOrder)
    return existingBook
  }

  for (let i = 0; i < existingBook.length; i++) {

    const order = existingBook[i] //get one order object
    if (order.type === incomingOrder.type) {

      existingBook.push(incomingOrder)
      return existingBook
    }

    // if order type is equal ('buy' && 'buy') || ('sell' && 'sell') but does not match add to order book
    // if (incomingOrder.type !== order.type && incomingOrder.price !== order.price) {

    // return existingBook.concat(incomingOrder)
    // }

    // attempt to fufill orders and remove existing order if there is existing order with same QTY
    if (incomingOrder.price === order.price && incomingOrder.quantity === order.quantity
      && incomingOrder.type !== order.type) {

      existingBook.splice(i, 1)
      return existingBook
    }


    // fulfills an order and reduces the matching order when the book contains a matching order of a larger quantity
    if (incomingOrder.price === order.price && incomingOrder.quantity < order.quantity &&
      incomingOrder.type !== order.type) {

      let [adjustOrder] = existingBook.splice(i, 1)
      adjustOrder.quantity = adjustOrder.quantity - incomingOrder.quantity

      return existingBook.concat(adjustOrder)
    }


    // uses two existing orders to completely fulfill an order, removing the matching orders from the book'
    if (incomingOrder.price === order.price && incomingOrder.quantity >= order.quantity &&
      incomingOrder.type !== order.type) {

      let [adjustOrder] = existingBook.splice(i, 1)
      incomingOrder.quantity = incomingOrder.quantity - adjustOrder.quantity

      // return existingBook.concat(incomingOrder)
    }


    //  uses two existing orders to completely fulfill an order, removing the first matching order from the book and reducing the second

    // uses two existing orders to partially fulfill an order, removing the matching orders from the book and reducing the incoming order before adding it to the book






    //for this function, we know the order objects have the same type && price
    // function fulfillOrders(existingOrder, incomingOrder) { // existingOrder = object, incomingOrder = object
    // if (existingOrder.quantity === incomingOrder.quantity) {
    // existingOrder.quantity = 0
    // incomingOrder.quantity = 0
  }
}

// handle the other conditions (else if)
//handle the last condition (else)


module.exports = reconcileOrder
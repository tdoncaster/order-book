function reconcileOrder(existingBook, incomingOrder) {

  if (existingBook.length === 0) {
    existingBook.push(incomingOrder)
    return existingBook
  }

  for (let i = 0; i < existingBook.length; i++) {

    const order = existingBook[i] 
    if (order.type === incomingOrder.type) {
      continue
    }

    if (incomingOrder.type !== order.type && incomingOrder.price !== order.price) {

      return existingBook.concat(incomingOrder)
    }

    if (incomingOrder.price === order.price && incomingOrder.quantity === order.quantity
      && incomingOrder.type !== order.type) {

      existingBook.splice(i, 1)
      return existingBook
    }

    if (incomingOrder.price === order.price && incomingOrder.quantity < order.quantity &&
      incomingOrder.type !== order.type) {

      let [adjustOrder] = existingBook.splice(i, 1)
      adjustOrder.quantity = adjustOrder.quantity - incomingOrder.quantity
      incomingOrder.quantity = incomingOrder.quantity -adjustOrder.quantity
      return existingBook.concat(adjustOrder)
    }

    if (incomingOrder.price === order.price && incomingOrder.quantity >= order.quantity &&
      incomingOrder.type !== order.type) {

      let [adjustOrder] = existingBook.splice(i, 1)
      incomingOrder.quantity = incomingOrder.quantity - adjustOrder.quantity
      i--
    }

    if (incomingOrder.quantity === 0) {
      break
    }
  }
  if (incomingOrder.quantity > 0) {
    existingBook.push(incomingOrder)
    return existingBook
  }
}

// handle the other conditions (else if)
//handle the last condition (else)


module.exports = reconcileOrder
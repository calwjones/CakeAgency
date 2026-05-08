const API_URL = 'https://fauxdata.codelayer.io/api/orders';

async function fetchOrders() {
  const maxAttempts = 10;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const response = await fetch(API_URL);

    if (response.ok) {
      const data = await response.json();
      return data.orders;
    }

    if (response.status !== 500) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    console.error(`Attempt ${attempt} got a 500, retrying`);

    if (attempt < maxAttempts) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  throw new Error(`Gave up after ${maxAttempts} attempts`);
}

function orderTotal(order) {
  let total = 0;
  for (const item of order.items) {
    const price = parseFloat(item.price);
    if (Number.isNaN(price)) {
      console.error(`Bad price on item in order ${order.id}, treating as 0`);
      continue;
    }
    total += price;
  }
  return total;
}

function calculateAverageOrderValue(orders) {
  let sum = 0;
  for (const order of orders) {
    sum += orderTotal(order);
  }
  return sum / orders.length;
}

async function main() {
  try {
    const orders = await fetchOrders();

    if (orders.length === 0) {
      console.error('No orders returned');
      return;
    }

    const average = calculateAverageOrderValue(orders);
    console.log(average.toFixed(2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

main();

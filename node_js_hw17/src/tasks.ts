//task 1
function calculateTotal(
  price: number,
  quantity: number,
  discount: number = 0
): number {
  if (discount === 0) {
    return price * quantity;
  } else {
    return price * quantity - price * quantity * (discount / 100);
  }
}

console.log(calculateTotal(20, 500, 75));
console.log(calculateTotal(20, 500, 0));

//task 2
let id: string | number;

function displayId(id: string | number): string {
  if (typeof id === "string") {
    return `Shout it loud: ${id.toUpperCase()}`;
  } else {
    return `Your multiplied ID is ${id * 10}`;
  }
}

console.log(displayId(50));
console.log(displayId("hghghghjg125874"));

//task 3
interface Order {
  orderId: string;
  amount: number;
  status: "pending" | "shipped" | "delivered";
}

let orders: Order[] = [
  {
    orderId: "123",
    amount: 12,
    status: "pending",
  },
  {
    orderId: "234",
    amount: 10,
    status: "delivered",
  },
  {
    orderId: "345",
    amount: 7,
    status: "shipped",
  },
  {
    orderId: "456",
    amount: 9,
    status: "delivered",
  },
];

function filterOrdersByStatus(
  orders: Order[],
  status: Order["status"]
): Order[] {
  return orders.filter((elem) => elem.status === status);
}

console.log(
  `Pending orders are: ${JSON.stringify(
    filterOrdersByStatus(orders, "pending")
  )}`
);

console.log(
  `Delivered orders are: ${JSON.stringify(
    filterOrdersByStatus(orders, "delivered")
  )}`
);

// Task 4

// let productInfo: [string, number, number] = ["tv", 50, 2];
let productInfo: [string, number, number] = ["laptop", 50, -3];

let inventory: { [key: string]: number } = {
  laptop: 10,
  tv: 2,
};

function updateStock(
  inventory: { [key: string]: number },
  productInfo: [string, number, number]
): { [key: string]: number } {
  // Достаем название товара и количество из кортежа
  let title = productInfo[0]; // Название товара (Laptop)
  let quantity = productInfo[2]; // Количество (3)

  // Если товар уже есть в inventory, увеличиваем количество
  if (inventory[title] !== undefined) {
    inventory[title] += quantity;
  } else {
    // Если товара нет, добавляем его с указанным количеством
    inventory[title] = quantity;
  }

  // Возвращаем обновленный объект
  return inventory;
}

console.log(updateStock(inventory, productInfo));

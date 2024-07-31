import { useEffect, useState } from "react";
import PrimaryButton from "../ui/button";
import { OrderItem } from "./orderItem";
import { OrderType } from "./types/types";
import { example } from "./example";

localStorage.setItem("shoppingCart", JSON.stringify(example));

export const Orders = () => {
  const [cart, setCart] = useState<OrderType[] | null >(null);

  useEffect(() => {
    // check to see if a shopping cart is saved
    try {
      const data = JSON.parse(localStorage.getItem("shoppingCart"));
      if (data) {
        setCart(data);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const calculateTotal = (): number => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    return +total.toFixed(2);
  };

  // add one quantity
  const addQuantity = (item: OrderType) => {
    const editedItemQuantity = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, count: (cartItem.count || 0) + 1 }
        : cartItem
    );
    setCart(editedItemQuantity);
  };

  // subtract one quantity
  const subtractQuantity = (item: OrderType) => {
    // if item is already at 1, confirm that they want to remove item from cart
    if (item.count === 1 ) {
      handleDelete(item.id);
      return;
    }

    const editedItemQuantity = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, count: (cartItem.count || 0) - 1 }
        : cartItem
    );
    setCart(editedItemQuantity);
  };

  // delete the item from the cart
  const handleDelete = (id: number) => {
    const foundItem = cart.find(cartItem => cartItem.id === id)
    let message;
    if(foundItem?.count === 1) message = `If you remove a single quantity the item will be removed from your card.  Are you srue you'd like to remove ${foundItem.name} from your order?`;
    else message = `Are you sure you want to remove  from your cart?`
    if(!confirm(message)) return

    const filteredCart = cart.filter((item) => item.id !== id);
    setCart(filteredCart);
    localStorage.setItem("shoppingCart", JSON.stringify(filteredCart));
  };

  return (
    <div>
      {cart?.length ? (
        <div>
          <h2 className="p-5">Your Orders</h2>
          <hr />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
            {cart &&
              cart.map((order) => (
                <OrderItem
                  item={order}
                  key={order.id}
                  addQuantity={addQuantity}
                  subtractQuantity={subtractQuantity}
                  handleDelete={handleDelete}
                />
              ))}
          </div>
          <hr />
          <div className="flex items-center justify-between p-5">
            <div className="font-bold">
              Total Cost: <span>{calculateTotal()}</span>
            </div>
            <PrimaryButton onClick={() => alert("go to checkout")}>
              <span className="icon-[solar--bag-smile-bold-duotone] mr-1"></span>
              CHECKOUT
            </PrimaryButton>
          </div>
        </div>
      ) : <div>Your shopping cart is currently empty</div>}
    </div>
  );
};

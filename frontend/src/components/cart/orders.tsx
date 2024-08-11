import { useEffect } from "react";
import { OrderItem } from "./orderItem";
import { OrderType, OrdersProps } from "../restaurant/types/restaurant-types";
import { notify } from "../ui/toast";

export const Orders = ({ cart, setCart, setStorage }: OrdersProps) => {
  useEffect(() => {
    // check to see if a shopping cart is saved
    try {
      const data = localStorage.getItem("shoppingCart");
      if (data) {
        const parsedData: OrderType[] = JSON.parse(data);
        setCart(parsedData);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setCart]);

  // add one quantity to quantity and update cart
  const addQuantity = (item: OrderType) => {
    const editedItemQuantity = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
        : cartItem
    );
    setCart(editedItemQuantity);
    setStorage && setStorage(editedItemQuantity);
  };

  // subtract one quantity to quantity and update cart
  const subtractQuantity = (item: OrderType) => {
    // if item is already at 1, confirm that they want to remove item from cart
    if (item.quantity === 1) {
      if (!confirm(`If you remove a single quantity the item will be removed from your card.  Are you srue you'd like to remove ${item.name} from your order?`))
        return;
      handleDelete(item.id);
      return;
    }

    const editedItemQuantity = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: (cartItem.quantity || 0) - 1 }
        : cartItem
    );
    setCart(editedItemQuantity);
    setStorage && setStorage(editedItemQuantity);
  };

  // delete the item from the cart
  const handleDelete = (id: number) => {
    const foundItem = cart.find((cartItem) => cartItem.id === id);
    const filteredCart = cart.filter((item) => item.id !== id);
    setCart(filteredCart);
    setStorage && setStorage(filteredCart);
    notify({message: `${foundItem?.name} has been removed from your cart successfully`,},"success");
  };

  return (
    <div
      className="max-h-96 overflow-y-scroll mr-3 border-r border-r-secondary"
      style={{ scrollbarColor: "#8c63ee rgba(140, 99, 238, 30%)" }}
    >
      {cart?.length ? (
        <div>
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
        </div>
      ) : (
        <div className="px-5">Your shopping cart is currently empty</div>
      )}
    </div>
  );
};

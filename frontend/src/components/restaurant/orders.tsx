import { useEffect } from "react";
import PrimaryButton from "../ui/button";
import { OrderItem } from "./orderItem";
import { OrderType, OrdersProps } from "./types/restaurant-types";
import { useNavigate } from "react-router-dom";

export const Orders = ({ cart, setCart, children }: OrdersProps) => {
  const navigate = useNavigate();

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

  // function to automatically format and set cart into local storage
  const setStorage = (updatedCart: OrderType[]) => {
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
  };

  // calculate total based on how many items in cart, including repeat items
  const calculateTotal = (): number => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.count || 1),
      0
    );
    return +total.toFixed(2);
  };

  // add one quantity to count and update cart
  const addQuantity = (item: OrderType) => {
    const editedItemQuantity = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, count: (cartItem.count || 0) + 1 }
        : cartItem
    );
    setCart(editedItemQuantity);
    setStorage(editedItemQuantity);
  };

  // subtract one quantity to count and update cart
  const subtractQuantity = (item: OrderType) => {
    // if item is already at 1, confirm that they want to remove item from cart
    if (item.count === 1) {
      handleDelete(item.id);
      return;
    }

    const editedItemQuantity = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, count: (cartItem.count || 0) - 1 }
        : cartItem
    );
    setCart(editedItemQuantity);
    setStorage(editedItemQuantity);
  };

  // delete the item from the cart
  const handleDelete = (id: number) => {
    const foundItem = cart.find((cartItem) => cartItem.id === id);
    let message;
    if (foundItem?.count === 1)
      message = `If you remove a single quantity the item will be removed from your card.  Are you srue you'd like to remove ${foundItem.name} from your order?`;
    else message = `Are you sure you want to remove  from your cart?`;
    if (!confirm(message)) return;

    const filteredCart = cart.filter((item) => item.id !== id);
    setCart(filteredCart);
    setStorage(filteredCart);
  };

  // on clicking checkout, all items are saved to local Storage and user is sent to the shopping cart page
  const handleCheckout = () => {
    setStorage(cart);
    navigate("/cart");
  };

  return (
    <div>
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
          {children}
          <hr />
          <div className="flex items-center justify-between p-5">
            <div className="text-xl font-bold">
              Total Cost: $<span>{calculateTotal()}</span>
            </div>
            <PrimaryButton onClick={handleCheckout}>
              <span className="icon-[solar--bag-smile-bold-duotone] mr-1"></span>
              CHECKOUT
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <div>Your shopping cart is currently empty</div>
      )}
    </div>
  );
};

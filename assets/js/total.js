function totalPrice() {
  let product_all = document.querySelector(".product_all");
  let total_price_item = document.querySelector(".total_price_item");
  if (!product_all || !total_price_item) return;
  let data = JSON.parse(localStorage.getItem("cart"));
  product_all.textContent = data?.length;

  let reducePrice = data.reduce((acc, val) => {
    return (acc += val.userPrice);
  }, 0);
  total_price_item.textContent = reducePrice;
}

totalPrice();

export { totalPrice };

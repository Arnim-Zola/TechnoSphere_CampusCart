const handlePay = async () => {
setLoading(true);
setError("");

try {
const response = await fetch("http://localhost:5000/api/orders", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
user: "student",
stationeryItems: cartItems.map(item => ({
name: item.name,
quantity: item.quantity
})),
}),
});

```
const data = await response.json();

clearCart();

navigate("/receipt", {
  state: {
    order: data,
    cartItems,
    total,
    paymentMethod,
  },
});
```

} catch (err) {
console.error(err);
setError("Payment failed");
} finally {
setLoading(false);
}
};

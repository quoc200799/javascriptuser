import React, { useEffect, useState } from 'react';


const Content = () => {
    const [user, setUser] = useState({
        id: 1,
        name: "Nguyen van A",
        email: "A@gmail.com"
    })
    const [products, setProducts] = useState([
        { id: 1, name: "Product 1", price: 123456 },
        { id: 2, name: "Product 2", price: 45324 },
        { id: 3, name: "Product 3", price: 43534 },
        { id: 4, name: "Product 4", price: 23442 },

    ])
    const randomeName = () => {
        const rdName = `New name ${Math.floor(Math.random() * 1000)}`
        setUser({ ...user, name: rdName })
    }
    const randomProduct = () => {
        const productId = Math.floor(Math.random() * 4) + 1;
        const rdPrice = Math.floor(Math.random() * 10000000);
        const newProducts = products.map(item => {
            if (item.id === productId) {
                return { ...item, price: rdPrice }
            }
            return item;
        })
        setProducts(newProducts);
    }
    const deleteProduct = (id) => {
        const newProducts = products.filter(p => p.id !== id);
        setProducts(newProducts);
    }
    return (
        <div>
            <h2>User</h2>
            <div>{user.id} - {user.name} - {user.email}</div>
            <button onClick={randomeName}>Random Name</button>
            <h2>Product</h2>
            {products.map(item => {
                return (
                    <ul key={item.id}>
                        <li>{item.id} - {item.name} - {item.price}
                            <button
                                onClick={() => deleteProduct(item.id)}
                                style={{ display: "inline-block" }}
                            >Delete</button></li>
                    </ul>)
            })}
            <button
                onClick={randomProduct}
                style={{ boxShadow: "rgb(60 64 67 / 30%) 0 1px 3px 0, rgb(60 64 67 / 15%) 0 4px 8px 3px", marginTop: "12px" }}
            >Random Product</button>
        </div>
    );
};





export default Content;

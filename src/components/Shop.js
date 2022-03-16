import React, { useEffect, useState } from 'react'
import { Link, Switch, Route, BrowserRouter as Router, useHistory } from 'react-router-dom';
import { db, auth } from '../Firebase'
import Cart from './Chart'

const Shop = () => {
    const [products, setProducts] = useState([])
    let history = useHistory();
    let user = auth.currentUser

    const fetchProducts = async () => {
        db.collection('Products').onSnapshot((snapshot) => {
            const prodData = []
            snapshot.forEach((doc) => {
                prodData.push({ ...doc.data(), id: doc.id })
            })
            setProducts(prodData)
            console.log(products);
        })
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const addToChart= async(product) =>{
        //console.log(ProductImage);

        try {
            if (user) {
                db.collection("cart").add({
                    uid: user.uid,
                    product
                }).then(
                    alert("Item Added successfully to a cart")
                ).catch((error) => {
                    console.log(error.message);
                })
            } else {
                alert("Please Login")
            }
        } catch (error) {
            console.log(error.message);
        }
    }



    // get parent element
    const sectionCenter = document.querySelector(".section-center");
    const btnContainer = document.querySelector(".btn-container");
    const btnChart = document.querySelector("padding-break");

    function diplayMenuItems(menuItems) {
        let displayMenu = menuItems.map(function (item) {
            //console.log(item);

            return `<article class="menu-item">
          <img src=${item.ProductImage} alt=${item.ProductName} class="photo" />
          <div class="item-info">
            <header>
              <h4>${item.ProductName}</h4>
              <h4 class="price">R${item.ProductPrice}</h4>
            </header>
            <p class="item-text">
              ${item.ProductDescription}
            </p>
          </div>
          <div class="padding-break btn-container">
             <button class="filter-btn" Style="width:100%" data-id=${item.id}>Add To Chart</button> 
          </div>  
        </article>`;
        });
        displayMenu = displayMenu.join("");
        // console.log(displayMenu);

        sectionCenter.innerHTML = displayMenu;

        const ChartAddBtns = sectionCenter.querySelectorAll(".filter-btn");
        console.log(ChartAddBtns);

        ChartAddBtns.forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                // console.log(e.currentTarget.dataset);
                const ChartItem = e.currentTarget.dataset.id;
                const editElement = e.currentTarget.dataset.id.ProductName;
                console.log(ChartItem);
                console.log(editElement);
                //const menuCategory = products.filter(function (menuItem) {
                //    console.log(menuItem.ProductPrice);
                //    if (menuItem.ProductCategory === category) {
                //        return menuItem;
                //    }
                //});
            });
        });
    }
    function displayMenuButtons() {
        const categories = products.reduce(
            function (values, item) {
                if (!values.includes(item.ProductCategory)) {
                    values.push(item.ProductCategory);
                }
                return values;
            },
            ["all"]
        );
        const categoryBtns = categories
            .map(function (ProductCategory) {
                return `<button type="button" class="filter-btn" data-id=${ProductCategory}>
          ${ProductCategory}
        </button>`;
            })
            .join("");

        btnContainer.innerHTML = categoryBtns;
        const filterBtns = btnContainer.querySelectorAll(".filter-btn");
        console.log(filterBtns);

        filterBtns.forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                // console.log(e.currentTarget.dataset);
                const category = e.currentTarget.dataset.id;
                const menuCategory = products.filter(function (menuItem) {
                    // console.log(menuItem.category);
                    if (menuItem.ProductCategory === category) {
                        return menuItem;
                    }
                });
                if (category === "all") {
                    diplayMenuItems(products);
                } else {
                    diplayMenuItems(menuCategory);
                }
            });
        });
    }

    return (
        <section className="menu">
            <div className="title">
                <h2>Our Menu</h2>
                <div className="underline"></div>
            </div>

            <div className="btn-container">
                {products && products.map(product => (
                    displayMenuButtons()
                )
                )
                }
            </div>


            <div className="section-center">
                {products && products.map(product => (
                    diplayMenuItems(products)
                )
                )
                }
            </div>
        </section>
    );
}

export default Shop;

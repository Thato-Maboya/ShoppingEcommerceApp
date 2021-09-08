import React, { useEffect, useState } from 'react'
import {db} from '../Firebase'

const Shop = () => {
    const [products, setProducts] = useState([])

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



    // get parent element
    const sectionCenter = document.querySelector(".section-center");
    const btnContainer = document.querySelector(".btn-container");

    function diplayMenuItems(menuItems) {
        let displayMenu = menuItems.map(function (item) {
            // console.log(item);

            return `<article class="menu-item">
          <img src=${item.ProductImage} alt=${item.ProductName} class="photo" />
          <div class="item-info">
            <header>
              <h4>${item.ProductName}</h4>
              <h4 class="price">$${item.ProductPrice}</h4>
            </header>
            <p class="item-text">
              ${item.ProductDescription}
            </p>
          </div>
        </article>`;
        });
        displayMenu = displayMenu.join("");
        // console.log(displayMenu);

        sectionCenter.innerHTML = displayMenu;
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
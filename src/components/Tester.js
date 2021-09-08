import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'

const Tester = () => {
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



    const sectionCenter = document.querySelector(".section-center");
    const btnContainer = document.querySelector(".btn-container");
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
            return `<button type="button" class="filter-btn" data-id=${ProductCategory}>${ProductCategory}</button>`;
        })
        .join("");
    console.log(categoryBtns);
    btnContainer.innerHTML = categoryBtns;

    const filterBtns = btnContainer.querySelectorAll(".filter-btn");
    console.log(filterBtns);

    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            console.log(e.currentTarget.dataset);
            const category = e.currentTarget.dataset.id;
            const menuCategory = products.filter(function (ProductCategory) {
                if (ProductCategory.ProductCategory === category) {
                    return ProductCategory;
                }
            });
            console.log(menuCategory);
            console.log(category);
            if (category === "all") {
                const categoryItems = products.map(product => {
                    return `<article class="menu-item">
                                    <img src=${product.ProductImage} class="photo" />
                                    <div className="item-info">
                                        <header>
                                            <h4>${product.ProductName}</h4>
                                            <h4 class="price">
                                                R${product.ProductPrice}
                                            </h4>
                                        </header>
                                        <p class="item-text">
                                            ${product.ProductDescription}
                                        </p>
                                    </div>
                                </article>`;
                }
                )
                    .join("");
                sectionCenter.innerHTML = categoryItems;
            }
            else if (category === "dinner" || category === "shakes" || category === "lunch" || category === "breakfast") {

                const categoryItems = menuCategory.map(product => {
                    return `<article class="menu-item">
                                    <img src=${product.ProductImage} class="photo" />
                                    <div className="item-info">
                                        <header>
                                            <h4>${product.ProductName}</h4>
                                            <h4 class="price">
                                                R${product.ProductPrice}
                                            </h4>
                                        </header>
                                        <p class="item-text">
                                            ${product.ProductDescription}
                                        </p>
                                    </div>
                                </article>`;
                }
                )
                    .join("");
                sectionCenter.innerHTML = categoryItems;

            }
        });
    });
    return (
        <section className="menu">
            <div className="title">
                <h2>Our Menu</h2>
                <div className="underline"></div>
            </div>

            <div className="btn-container">

            </div>


            <div className="section-center">
                {products && products.map(product => (
                    <article className="menu-item">
                        <img src={product.ProductImage} className="photo" />
                        <div className="item-info">
                            <header>
                                <h4>{product.ProductName}</h4>
                                <h4 className="price">
                                    R{product.ProductPrice}
                                </h4>
                            </header>
                            <p className="item-text">
                                {product.ProductDescription}
                            </p>
                        </div>
                    </article>
                )
                )
                }
            </div>
        </section>
    );
}

export default Tester;
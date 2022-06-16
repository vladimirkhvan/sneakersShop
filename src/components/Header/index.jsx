import React from "react"
import {Link} from "react-router-dom"

import styles from "./Header.module.scss"
export default Header

function Header(props) {

    const totalPrice = props.cartItems.reduce((sum, cur) => sum + cur.price, 0);

    

    return (
        <header className={styles.header}>
            <Link to="/">
                <div className={styles.brand}>
                    <img src="/img/logo.png" alt="" />
                    <div>
                        <h3>REACT SNEAKERS</h3>
                        <p>Магазин кроссовок.</p>
                    </div>
                </div>
            </Link>
            

            <div className={styles.items}>
                <div className={styles.cart} onClick={props.showDrawer}>

                    <img width={20} height={20} src="/img/cart.svg" alt="cart" />

                    <p>{totalPrice} руб.</p>
                </div>

                <Link to="/favorite">
                    <img width={20} height={20} src="/img/favorite.svg" alt="favorite" />
                </Link>

                <Link to="/orders">
                    <img width={20} height={20} src="/img/user.svg" alt="user" />
                </Link>
                
            </div>
        </header>
    );
}

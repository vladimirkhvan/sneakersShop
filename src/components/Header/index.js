import React from "react"

import styles from "./Header.module.scss"
export default Header

function Header(props) {
    return (
        <header className={styles.header}>
            <div className={styles.brand}>
                <img src="/img/logo.png" alt="" />
                <div>
                    <h3>REACT SNEAKERS</h3>
                    <p>Магазин кроссовок.</p>
                </div>
            </div>

            <div className={styles.items}>
                <div className={styles.cart} onClick={props.showDrawer}>

                    <img width={20} height={20} src="/img/cart.svg" alt="cart" />

                    <p>1205 rub</p>
                </div>

                <img width={20} height={20} src="/img/favorite.svg" alt="favorite" />

                <img width={20} height={20} src="/img/user.svg" alt="user" />
            </div>
        </header>
    );
}

import styles from "./Drawer.module.scss"

import Info from "../Info"

export default Drawer;

function Drawer(props) {

    const items = props.cartItems.map(item => (

        <div className={styles.cartItem} key={item.id}>
            <img width={70} height={70} src={"/img/" + item.img} alt="sneakers" className={styles.cartItemImg} />
            <div>
                <p>{item.title}</p>
                <b>{item.price} руб.</b>
            </div>
            <img width={32} height={32} src="/img/delete.png" alt="delete" className={styles.delete} onClick={() => props.removeCartItem(item.id)} />
        </div>

    ))

    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <h2>
                    Cart
                    <img width={32} height={32} src="/img/delete.png" alt="delete" className={styles.delete} onClick={props.hideDrawer} />
                </h2>

                {props.cartItems.length
                    ?
                    <>
                        <div className={styles.cartContainer}>

                            {props.cartItems.length ? items :
                                <div>
                                    <img width={120} height={120} src="/img/emptyCart.png" alt="cart is empty" />
                                </div>
                            }
                        </div>

                        <div className={styles.cartDetails}>
                            <ul>
                                <li>
                                    <span>Total:</span>
                                    <div className={styles.filler}></div>
                                    <b>21 498 rub</b>
                                </li>
                                <li>
                                    <span>Tax 5%:</span>
                                    <div className={styles.filler}></div>
                                    <b>1074 rub</b>
                                </li>
                            </ul>

                            <button className="greenButton">
                                Оформить заказ
                                <img src="/img/arrow.svg" alt="arrow" className="arrow"/>
                            </button>
                        </div>
                    </>

                    :
                    
                    <Info
                        title="Корзина пустая"
                        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                        img="emptyCart.png"
                        hideDrawer={props.hideDrawer}
                    />
                    
                }


            </div>
        </div>
    )
}



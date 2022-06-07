import styles from "./Drawer.module.scss"

export default Drawer;

function Drawer(props) {

    const items = props.cartItems.map(item => (

            <div className={styles.cartItem}>
                <img width={70} height={70} src={"/img/" + item.img} alt="sneakers" className={styles.cartItemImg} />
                <div>
                    <p>{item.title}</p>
                    <b>{item.price} руб.</b>
                </div>
                <img width={32} height={32} src="/img/delete.png" alt="delete" className={styles.delete}/>
            </div>

    ))

    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <h2>
                    Cart
                    <img width={32} height={32} src="/img/delete.png" alt="delete" className={styles.delete} onClick={props.hideDrawer} />
                </h2>

                <div className={styles.cartContainer}>
                    {items}
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

                    <button className={styles.createOrder}>
                        Оформить заказ
                        <img src="/img/arrow.svg" alt="arrow" className={styles.arrow} />
                    </button>
                </div>
            </div>
        </div>
    )
}



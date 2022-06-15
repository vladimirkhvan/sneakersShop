import React from "react"
import axios from "axios";

import styles from "./Drawer.module.scss"

import Info from "../Info"

export default Drawer;

function Drawer(props) {

    const [isComplete, setIsComplete] = React.useState(false);
    const [orderID, setOrderID] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    
    const totalPrice = props.cartItems.reduce((sum, cur) => sum + cur.price, 0);
    
    async function createOrder(){

        setIsLoading(true);

        const orderObj = await axios.post("https://629cba363798759975da5f77.mockapi.io/order", {item: props.cartItems});

        setOrderID(orderObj.data.id);

        const {data} = await axios.get("https://629cba363798759975da5f77.mockapi.io/cart");

        for(let i = 0; i < data.length; i++){
            await axios.delete(`https://629cba363798759975da5f77.mockapi.io/cart/${data[i].deleteID}`);
            await setTimeout(()=>{}, 200);
        }   
        

        props.setCartItems([]);
        setIsLoading(false);
        setIsComplete(true);
    }

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
        <div className={`${styles.overlay} ${props.isDrawer && styles.visibleOverlay}`}>
            <div className={styles.drawer}>
                <h2>
                    Корзина
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
                                    <span>Итого:</span>
                                    <div className={styles.filler}></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div className={styles.filler}></div>
                                    <b>{Math.round(totalPrice*0.05)} руб.</b>
                                </li>
                            </ul>

                            <button className="greenButton" disabled={isLoading} onClick={createOrder}>
                                Оформить заказ
                                <img src="/img/arrow.svg" alt="arrow" className="arrow"/>
                            </button>
                        </div>
                    </>

                    :
                    
                    <Info
                        title= {isComplete ? "Заказ оформлен!" : "Корзина пустая"}
                        description={isComplete ? `Ваш заказ #${orderID} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                        img= {isComplete ? "orderComplete.png" : "emptyCart.png"}
                        hideDrawer={props.hideDrawer}
                    />
                    
                }


            </div>
        </div>
    )
}



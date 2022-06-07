import React from "react"
import styles from "./Card.module.scss"

export default Card

function Card(props) {
    const [isAdded, setIsAdded] = React.useState(false);

    function toggleAdd(){
        setIsAdded(prevIsAdded => !prevIsAdded)
    }

    function handlePlus(item){
        isAdded ? props.deleteCartItem(item) : props.addCartItem(item);
        toggleAdd();
    }

    React.useEffect(()=>{
        let isRemoved = true;
        for(let i = 0; i < props.cartItems.length; i++){
            
            if(props.cartItems[i].title === props.title){
                isRemoved = false;
            }
        }
        if(isRemoved){
            setIsAdded(false);
        }
    },[props])


    return (
        <div className={styles.card}>

            <img src="/img/unlike.svg" alt="unlike" className={styles.like} />

            <img width={133} height={112} src={"/img/" + props.img} alt="sneakers" />

            <p>{props.title}</p>

            <div className={styles.cardInfo}>
                <div>
                    <p>Цена:</p>
                    <b>{props.price} руб.</b>
                </div>
                <img 
                    width={32} 
                    height={32} 
                    src={isAdded ? "/img/added.svg" : "/img/unadded.svg"} 
                    alt="unadded" className={styles.add} 
                    onClick={() => handlePlus(props) }
                />
            </div>

        </div>
    );
}

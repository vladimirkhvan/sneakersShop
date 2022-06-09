import React from "react"
import styles from "./Card.module.scss"

export default Card

function Card(props) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    function toggleFavorite(){
        setIsFavorite(prevIsFavorite => !prevIsFavorite);
    }

    function handleFavorite(){
        isFavorite ? props.removeFavorite() : props.addFavorite();
        toggleFavorite();
    }

    function toggleAdd(){
        setIsAdded(prevIsAdded => !prevIsAdded)
    }

    function handlePlus(){
        isAdded ? props.removeCartItem() : props.addCartItem() ;
        toggleAdd();
    }

    React.useEffect(()=>{
        let isRemoved = true;
        for(let i = 0; i < props.cartItems.length; i++){
            
            if(props.cartItems[i].id === props.id){
                isRemoved = false;
            }
        }
        if(isRemoved){
            setIsAdded(false);
        } else {
            setIsAdded(true);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.cartItems]) 

    React.useEffect(
        () => {
            let unliked = true;
    
            for(let i = 0; i < props.favoriteItems.length; i++){
                if(props.id === props.favoriteItems[i].id){
                    unliked=false;
                }
            }
    
            if(unliked){
                setIsFavorite(false);
            } else{
                setIsFavorite(true);
            }
            //eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    )

    return (
        <div className={styles.card}>

            <img 
                src={isFavorite ? "/img/like.png" : "/img/unlike.svg"} 
                alt="unlike" 
                className={styles.like} 
                onClick={handleFavorite}
            />

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
                    onClick={handlePlus}
                />
            </div>

        </div>
    );
}

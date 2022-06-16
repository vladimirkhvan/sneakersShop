import axios from "axios";
import React from "react";

import Card from "../components/Card";
import Info from "../components/Info";

export default Orders;

function Orders(){

    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        try {
            (async ()=>{
                const {data} = await axios.get("https://629cba363798759975da5f77.mockapi.io/order");
                setOrders(data.map(obj => obj.item).flat());
            })();
        } catch (error) {
            alert("failed to fetch data");
            
        }
        
    }, [])

    const cards = orders.length ? 
    <div className="contentWrapper">

        {orders.map(
                (obj, index) => 
                <Card
                    key={index}
                    {...obj}
                />
        )}

    </div> : (
        <div className="emptyPage">
            <Info
                title= "У вас нет заказов"
                description={`Оформите хотя бы один заказ.`}
                img= "noOrder.png"
                height={70}
            />
        </div>
    )



    return (
        <main>

            <div className="contentHeader">
                <h2>Мои покупки</h2>
            </div>



            {cards} 


        </main>
    )
}
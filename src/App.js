import React from "react"

import Drawer from "./components/Drawer"
import Header from "./components/Header"
import Card from "./components/Card"

function App() {

	const [isDrawer, setIsDrawer] = React.useState(false);

	const [sneakersData, setSneakersData] = React.useState([]);

	const [cartItems, setCartItems] = React.useState([]);

	function toggleDrawer(){
		setIsDrawer(prevIsDrawer => !prevIsDrawer);
	}

	// function addCartItem(item){

	// 	let isInclude = false;

	// 	for(let i = 0; i < cartItems.length; i++){
	// 		if(cartItems[i].title === item.title){
	// 			isInclude = true;
	// 		}
	// 	}
	// 	if(!isInclude){
	// 		setCartItems(prevCartItems => ([
	// 			...prevCartItems,
	// 			item
	// 			]
	// 		))
	// 	}
	// }

	// function deleteCartItem(item){

	// 	let resultArr = [];

	// 	for(let i = 0; i < cartItems.length; i++){
	// 		if(cartItems[i].title !== item.title){
	// 			resultArr.push(cartItems[i]);
	// 		}
	// 	}

	// 	setCartItems(resultArr);
	// }

	React.useEffect(
		() => {
			fetch("https://629cba363798759975da5f77.mockapi.io/items")
				.then(res => res.json())
				.then(jsonObj => setSneakersData(jsonObj))
			}, []);

	const cards = sneakersData.map(sneakers => (
		<Card 
			cartItems={cartItems}
			{...sneakers}
		/>
	))

	return (
		<div className="wrapper">

			{isDrawer && <Drawer cartItems={cartItems} hideDrawer={toggleDrawer}/>}

			<Header showDrawer = {toggleDrawer}/>

			<main>

				<div className="contentHeader">
					<h2>Все кроссовки</h2>

					<span>

						<img src="/img/search.svg" alt="search" />
						<input type="text" name="search" placeholder="Поиск..."/>

					</span>
				</div>
				
				
				<div className="contentWrapper">
					
					{cards}

				</div>

			</main>
		</div>
	);
}

export default App;

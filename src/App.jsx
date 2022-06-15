import React from "react"
import axios from "axios"
import {Routes, Route} from "react-router-dom"

import Drawer from "./components/Drawer"
import Header from "./components/Header"
import Card from "./components/Card"
import Loader from "./components/Loader"

import Home from "./pages/Home"		
import Favorite from "./pages/Favorite"		
import Orders from "./pages/Orders"		

function App() {

	const [isDrawer, setIsDrawer] = React.useState(false);

	const [sneakersData, setSneakersData] = React.useState([]);

	const [cartItems, setCartItems] = React.useState([]);

	const [searchValue, setSearchValue] = React.useState("");

	const [favoriteItems, setFavoriteItems] = React.useState([]);

	const [isLoading, setIsLoading] = React.useState(true);

	function addFavorite(item) {

		try {
			if (!favoriteItems.find(obj => obj.id === item.id)) {
				setFavoriteItems(prevFavoriteItems => (
					[
						...prevFavoriteItems,
						item
					]
				))
				axios.post("https://629cba363798759975da5f77.mockapi.io/favorite", item);
			}
		} catch (error) {
			alert("Failed to add element");
			console.error(error)
		}

		
		
	}

	async function removeFavorite(id) {
		try {
			let deleteID;
			let favoriteArray;

			console.log(id);
			
			await axios.get("https://629cba363798759975da5f77.mockapi.io/favorite")
				.then(res => favoriteArray = res.data);		

			for (let i = 0; i < favoriteArray.length; i++) {
				if (favoriteArray[i].id === id) {
					deleteID = favoriteArray[i].favoriteID;
				}
			}
			setFavoriteItems(prevFavoriteItems => prevFavoriteItems.filter(obj => obj.id !== id));
			await axios.delete(`https://629cba363798759975da5f77.mockapi.io/favorite/${deleteID}`);	
		} catch (error) {
			alert("Failed to remove element");
			console.error(error)
		}
		
	}

	function toggleDrawer() {
		setIsDrawer(prevIsDrawer => !prevIsDrawer);
	}

	function addCartItem(item) {
		try {
			if (!cartItems.find(obj => obj.id === item.id)) {
				setCartItems(prevCartItems => (
					[
						...prevCartItems,
						item
					]
				))
				axios.post("https://629cba363798759975da5f77.mockapi.io/cart", item);
			}
		} catch (error) {
			alert("Failed to add element");
			console.error(error)
		}
		
	}

	async function removeCartItem(id) {
		try {
			let cartArray;
			await axios.get(`https://629cba363798759975da5f77.mockapi.io/cart`)
				.then(res => cartArray = res.data);
			let deleteID;

			for (let i = 0; i < cartArray.length; i++) {
				if (cartArray[i].id === id) {
					deleteID = cartArray[i].deleteID;
				}
			}

			setCartItems(prevCartItems => prevCartItems.filter(obj => obj.id !== id));
			await axios.delete(`https://629cba363798759975da5f77.mockapi.io/cart/${deleteID}`);
		} catch (error) {
			alert("Failed to remove element");
			console.error(error)
		}
		
	}

	React.useEffect(
		() => {
			try {
				async function fetchData(){
					await axios.get("https://629cba363798759975da5f77.mockapi.io/items")
						.then(res => setSneakersData(res.data));
					await axios.get("https://629cba363798759975da5f77.mockapi.io/cart")
						.then(res => setCartItems(res.data));
					await axios.get("https://629cba363798759975da5f77.mockapi.io/favorite")
						.then(res => setFavoriteItems(res.data));
					setIsLoading(false);
				}
	
				fetchData();
			} catch (error) {
				alert("Failed to fetch data");
				console.error(error)
			}
			
			
		}, []);

	const cards = 
		isLoading 
		? [...Array(8)].map((value, index)=> <Loader key={index}/>)
		: sneakersData.filter(
			item => item.title.toLowerCase().includes(searchValue.toLowerCase())
				).map(sneakers => (
					<Card
						key={sneakers.id}
						cartItems={cartItems}
						favoriteItems={favoriteItems}
						addCartItem={() => addCartItem(sneakers)}
						removeCartItem={() => removeCartItem(sneakers.id)}
						addFavorite={() => addFavorite(sneakers)}
						removeFavorite={() => removeFavorite(sneakers.id)}
						{...sneakers}
					/>
				))

	const favoriteCards = favoriteItems.filter(
		item => item.title.toLowerCase().includes(searchValue.toLowerCase())
	).map(sneakers => (
		<Card
			key={sneakers.id}
			cartItems={cartItems}
			favoriteItems={favoriteItems}
			addCartItem={() => addCartItem(sneakers)}
			removeCartItem={() => removeCartItem(sneakers.id)}
			addFavorite={() => addFavorite(sneakers)}
			removeFavorite={() => removeFavorite(sneakers.id)}
			{...sneakers}
		/>
	))

	return (
		<div className="wrapper">

			<Drawer cartItems={cartItems} setCartItems = {setCartItems} hideDrawer={toggleDrawer} removeCartItem={removeCartItem} isDrawer={isDrawer}/>

			<Header showDrawer={toggleDrawer} cartItems={cartItems}/>

			<Routes>
				<Route path="/" 
					element={
						<Home
						cards={cards}
						searchValue={searchValue}
						setSearchValue={setSearchValue}/>
					}>
				</Route>
				<Route path="/favorite" 
					element={
						<Favorite
						cards = {favoriteCards}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						/>
					}>
				</Route>
				<Route path="/orders" 
					element={
						<Orders/>
					}>
				</Route>
			</Routes>

			
		</div>
	);
}

export default App;

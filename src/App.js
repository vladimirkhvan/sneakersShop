import React from "react"
import axios from "axios"

import Drawer from "./components/Drawer"
import Header from "./components/Header"
import Card from "./components/Card"

function App() {

	const [isDrawer, setIsDrawer] = React.useState(false);

	const [sneakersData, setSneakersData] = React.useState([]);

	const [cartItems, setCartItems] = React.useState([]);

	const [searchValue, setSearchValue] = React.useState("");

	const [favoriteItems, setFavoriteItems] = React.useState([]);

	async function addFavorite(obj) {

		await axios.post("https://629cba363798759975da5f77.mockapi.io/favorite", obj);
		setFavoriteItems(prevFavoriteItems => prevFavoriteItems.filter(item => item.id !== obj.id))
		
	}

	async function removeFavorite(obj) {
		let deleteID;
		let favoriteArray;
		await axios.get("https://629cba363798759975da5f77.mockapi.io/favorite")
			.then(res => favoriteArray = res.data);

		for (let i = 0; i < favoriteArray.length; i++) {
			if (favoriteArray[i].id === obj.id) {
				deleteID = favoriteArray[i].favoriteID;
			}
		}
		setFavoriteItems(prevFavoriteItems => ([...prevFavoriteItems, obj]));
		axios.delete(`https://629cba363798759975da5f77.mockapi.io/favorite/${deleteID}`);
	}

	function toggleDrawer() {
		setIsDrawer(prevIsDrawer => !prevIsDrawer);
	}

	function addCartItem(item) {
		if (!cartItems.find(obj => obj.id === item.id)) {
			setCartItems(prevCartItems => (
				[
					...prevCartItems,
					item
				]
			))
			axios.post("https://629cba363798759975da5f77.mockapi.io/cart", item);
		}
	}

	async function removeCartItem(id) {
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
	}

	React.useEffect(
		() => {
			axios.get("https://629cba363798759975da5f77.mockapi.io/items")
				.then(res => setSneakersData(res.data))
			axios.get("https://629cba363798759975da5f77.mockapi.io/cart")
				.then(res => setCartItems(res.data))
			axios.get("https://629cba363798759975da5f77.mockapi.io/favorite")
				.then(res => setFavoriteItems(res.data))
		}, []);

	const cards = sneakersData.filter(
		item => item.title.toLowerCase().includes(searchValue.toLowerCase())
	).map(sneakers => (
		<Card
			key={sneakers.id}
			cartItems={cartItems}
			favoriteItems={favoriteItems}
			addCartItem={() => addCartItem(sneakers)}
			removeCartItem={() => removeCartItem(sneakers.id)}
			addFavorite={() => addFavorite(sneakers)}
			removeFavorite={() => removeFavorite(sneakers)}
			{...sneakers}
		/>
	))

	return (
		<div className="wrapper">

			{isDrawer && <Drawer cartItems={cartItems} hideDrawer={toggleDrawer} removeCartItem={removeCartItem} />}

			<Header showDrawer={toggleDrawer} />

			<main>

				<div className="contentHeader">
					<h2>Все кроссовки</h2>

					<span>

						<img src="/img/search.svg" alt="search" />
						<input type="text" name="search" placeholder="Поиск..." value={searchValue} onChange={e => setSearchValue(e.target.value)} />

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

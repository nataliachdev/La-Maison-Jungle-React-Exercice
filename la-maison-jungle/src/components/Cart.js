import { useState, useEffect } from "react";
import "../styles/Cart.css";


function Cart({cart, updateCart}) {
	const [isOpen, setIsOpen] = useState(false);
	const total = cart.reduce(
		(acc, plantType) => acc + plantType.amount * plantType.price, 0
	);

	//Retirer un élément du panier
	function removeFromCart(name) {
		const currentPlant = cart.find((plant) => plant.name === name);

		if (currentPlant.amount > 1) {
			updateCart(
				cart.map((plant) =>
					plant.name === name
						? { ...plant, amount: plant.amount - 1 }
						: plant
				)
			);
		} else {
			updateCart(cart.filter((plant) => plant.name !== name));
		}
	}

	useEffect(() => {
		document.title = `LMJ: ${total}€ d'achats`
	}, [total]);

	return isOpen ? (
		<div className="lmj-cart">
			<button className='lmj-cart-toggle-button' onClick={() => setIsOpen(false)}>
				Fermer
			</button>

			{cart.length > 0 ? (
				<div>
					<h2>Panier</h2>
					{cart.map(({name, price, amount}, index) => (
						<div key={`${name}-${index}`}>
							{name} {price}€ x {amount}

							<button 
								className="lmj-cart-delete-button"
								onClick={() => updateCart(cart.filter((plant) => plant.name !== name))}>
								Supprimer
							</button>

							<button 
								className="lmj-cart-delete-button"
								onClick={() => removeFromCart(name)}>
								Retirer un élément
							</button>
						</div>
					))}

					<h3>Total : {total}€</h3>
					<button 
						className="lmj-cart-delete-button"
						onClick={() => updateCart([])}>
						Vider le panier
					</button>
				</div>
			) : (
				<div>Votre panier est vide.</div>
			)} 
		</div>

	) : (
		<div className='lmj-cart-closed'>
			<button className='lmj-cart-toggle-button' onClick={() => setIsOpen(true)}>
				Ouvrir le Panier
			</button>
		</div>
	)
}

export default Cart;
import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretRight, faCircle, faCheckCircle, faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	// initial state for the list
	// a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([
		{ itemName: 'Apple', quantity: 1, price: 5,isChecked: false },
		{ itemName: 'Banana', quantity: 1, price: 4,isChecked: false },
		{ itemName: 'Orange', quantity: 1, price: 6,isChecked: false },
	]);

  //initial default value in input field is empty
	const [inputValue, setInputValue] = useState('');

  //initial value for total amount
	const [totalAmount, setTotalAmount] = useState(3);

	//initial value for total amount
	const [totalPrice, setTotalPrice] = useState(14);

//handle the change of value in input field
  const handleInputChange= (e) => {
		e.preventDefault();
    setInputValue(e.target.value)
  };


  //handle add button for adding new item to the list
  //get new item name from inputValue state, which is updated by {handleInputChange}
	const handleAddItem= () => {
    if(inputValue!="")
    {
      const newItem = {
        itemName: inputValue,
        quantity: 1,
		price:1,
        isSelected: false,
      };
    
  
      const newItems = [...items, newItem];//use spread operator to copy existing value of array items, then add newItem in the array
  
      setItems(newItems);//update items with newItems
      setInputValue(''); //after adding thhe item, set input field to empty again
      handleTotalAmout();//everytime new item is added, rerender total amount by calling the function calculateTotal()
    }
    else {
     alert("Please enter an item name!")
    }
		
	};

  //handle quantity + button
  //takes in the index to locate the item in array
	const handleQuantityIncrease = (index) => {
		const newItems = [...items];

    newItems[index].quantity= newItems[index].quantity +1; 		//get the quantity value of the item by index
    //newItems[index].quantity++;
		setItems(newItems); //update items
		handleTotalAmout(); //everytime quantity changed, rerender total amount by calling the function calculateTotal()
	};

    //handle quantity - button
	const handleQuantityDecrease = (index) => {
		//amount cannot be negative
		const newItems = [...items];
        if (newItems[index].quantity!=0)
        {
	     newItems[index].quantity--;

	     setItems(newItems);
	     handleTotalAmout();//everytime quantity changed, rerender total amount by calling the function calculateTotal()
        }	
	};


	const handlePriceIncrease = (index) => {
		const newItems = [...items];

    newItems[index].price= newItems[index].price +1; 		//get the quantity value of the item by index
    //newItems[index].quantity++;
		setItems(newItems); //update items
		handleTotalPrice(); //everytime quantity changed, rerender total amount by calling the function calculateTotal()
	};

    //handle quantity - button
	const handlePriceDecrease = (index) => {
		//amount cannot be negative
		const newItems = [...items];
        if (newItems[index].price!=1)
        {
	     newItems[index].price--;

	     setItems(newItems);
	     handleTotalPrice();//everytime quantity changed, rerender total amount by calling the function calculateTotal()
        }	
	};

//handle check/unchenck of item
	const itemChecked = (index) => {
		const newItems = [...items];

		newItems[index].isChecked = !newItems[index].isChecked; //toggle between isChecked: true and isCheched: false, 

		setItems(newItems);
	};

	const handleTotalAmout = () => {
		const totalItem = items.reduce((total, item) => {
			return total + item.quantity;
		}, 0); // executes a reducer function on each element of the array, resulting in single output value. initial from 0

		setTotalAmount(totalItem);
		handleTotalPrice();
	};

	const handleTotalPrice = () => {
		const totalPrice = items.reduce((total, item) => {
			return total + item.price*item.quantity;
		}, 0); // executes a reducer function on each element of the array, resulting in single output value. initial from 0

		setTotalPrice(totalPrice);
		
	};

	return (
		<div className='app-background'>
			<div className='main-container'>
        <h2 style={{textAlign: "center"}}>My Shopping List</h2>
				<div className='add-item-box'>
					<input type="text" required="required" value={inputValue} onChange={handleInputChange} className='add-item-input' placeholder='Add an item...' />
          {/*or use errow function directly: onChange={(event) => setInputValue(event.target.value)} */}
		  <FontAwesomeIcon icon={faCaretRight} onClick={() => handleAddItem()} />			
				</div>
				<div className='item-container'><h3>Item</h3><div className='quantityPrice-container'><div className='quantity-text'><h3>Quantity</h3></div> <div className='quantity-text'><h3>Price</h3></div></div></div>
				<div className='item-list'>
			
					{items.map((item, index) => (
						
						<div className='item-container'>	
							<div className='item-name' onClick={() => itemChecked(index)}>
								{item.isChecked ? (
									<>
										<FontAwesomeIcon icon={faCheckCircle} />
										<span className='completed'>{item.itemName}</span>
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.itemName}</span>
									</>
								)}
							</div>
							<div className="quantityPrice-container">
							<div className='quantity'>
								<button>
									<FontAwesomeIcon icon={faMinus} onClick={() => handleQuantityDecrease(index)} />
								</button>
								<span> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faPlus} onClick={() => handleQuantityIncrease(index)} />
								</button>
							</div>
							<div className='quantity'>
								<button>
									<FontAwesomeIcon icon={faMinus} onClick={() => handlePriceDecrease(index)} />
								</button>
								<span> ${item.price} </span>
								<button>
									<FontAwesomeIcon icon={faPlus} onClick={() => handlePriceIncrease(index)} />
								</button>
							</div>
							</div>
						</div>
					))}
				</div>
				<div className='total'>Total Amount: {totalAmount} <br></br>Total Price: ${totalPrice}</div>
			
			</div>
		</div>
	);
};

export default App;
import React, { useEffect, useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';

const ExpenseItem = (props) => {
    const [expesnselist, setExpenselist] = useState([]);
    let email = localStorage.getItem('email');

    if (email) {
        email = email.replace(/[@.""]/g, '');
    }

    useEffect(() => {
        getData();
    }, [props.items]);

    const getData = useCallback(async () => {
        try {
            const response = await fetch(`https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses/${email}.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            let loadedData = [];

            for (const key in data) {
                loadedData.push({
                    id: key,
                    price: data[key].price,
                    description: data[key].description,
                    category: data[key].category
                });
            }

            setExpenselist(loadedData);
        } catch (error) {
            console.log(error);
        }
    }, [email]);

    return (
        <div>
            {/* Render props.items */}
            {props.items.map((item) => (
                <Card key={item.id_}>
                    <Card.Body>
                        <Card.Title>{item.description}</Card.Title>
                        <Card.Text>
                            <strong>Price:</strong> {item.price}
                        </Card.Text>
                        <Card.Text>
                            <strong>Category:</strong> {item.category}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
            
            {/* Render fetched expesnselist */}
            {expesnselist.length === 0 ? (
                <h2>No expenses found</h2>
            ) : (
                expesnselist.map((item) => (
                    <Card key={item.id}>
                        <Card.Body>
                            <Card.Title>{item.description}</Card.Title>
                            <Card.Text>
                                <strong>Price:</strong> {item.price}
                            </Card.Text>
                            <Card.Text>
                                <strong>Category:</strong> {item.category}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    );
};

export default ExpenseItem;

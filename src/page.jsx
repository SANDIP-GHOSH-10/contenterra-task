import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';

const Product = () => {
    const api = "https://www.reddit.com/r/reactjs.json";
    const [state, setState] = useState([]);

    useEffect(() => {
        axios.get(api)
            .then(res => setState(res.data.data.children))
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px"
    };

    const cardStyle = {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
        padding: "15px",
        backgroundColor: "#f9f9f9"
    };

    const titleStyle = {
        color: "#007bff",
        fontSize: "1.2rem",
        fontWeight: "bold"
    };

    const textStyle = {
        color: "#333",
        fontSize: "0.95rem"
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4" style={{ color: "#343a40" }}>Reddit ReactJS Posts</h2>
            <div style={gridStyle}>
                {state.map(product => (
                    <div key={product.data.id}>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title style={titleStyle}>{product.data.title}</Card.Title>
                                <Card.Text style={textStyle}>
                                    {product.data.selftext ? product.data.selftext.substring(0, 100) + '...' : 'No description available'}
                                </Card.Text>
                                <Card.Text style={{ wordBreak: 'break-word', fontSize: '0.85rem', color: '#007bff' }}>
                                    <strong>URL: </strong>{product.data.url}
                                </Card.Text>
                                <div className="mt-3 text-muted text-center" style={{ fontWeight: "bold" }}>Score: {product.data.score}</div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Product;
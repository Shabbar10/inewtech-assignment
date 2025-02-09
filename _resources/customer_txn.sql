-- DROP TABLE customers;

SHOW DATABASES;

USE inewtech;

SHOW TABLES;

CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25),
    contact_person VARCHAR(25),
    address VARCHAR(100),
    pin_code INT,
    contact VARCHAR(10),
    email VARCHAR(20),
    whatsapp VARCHAR(10),
    country VARCHAR(15),
    state VARCHAR(15),
    city VARCHAR(15),
    gst VARCHAR(20) UNIQUE,
    last_purchase_date DATE,
    transport VARCHAR(30),
    payment_type VARCHAR(15),
    discount VARCHAR(20),
    scheme VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    item VARCHAR(50),
    quantity INT,
    transaction_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Insert customers
INSERT INTO customers (
    name, contact_person, address, pin_code, contact, email, 
    whatsapp, country, state, city, gst, last_purchase_date,
    transport, payment_type, discount, scheme
) VALUES 
    ('Raj Electronics', 'Raj Kumar', '123 MG Road', 560001, '9876543210', 'raj@electronics.com', 
    '9876543210', 'India', 'Karnataka', 'Bangalore', 'GST29RAJ123456789', '2024-02-01',
    'Blue Dart', 'Credit', '10%', 'Gold'),
    
    ('Tech Solutions', 'Priya Singh', '456 Anna Salai', 600002, '8765432109', 'priya@techsol.com',
    '8765432109', 'India', 'Tamil Nadu', 'Chennai', 'GST33TECH987654321', '2024-02-03',
    'DTDC', 'Cash', '5%', 'Silver'),
    
    ('Global Traders', 'Ahmed Khan', '789 SP Road', 500003, '7654321098', 'ahmed@global.com',
    '7654321098', 'India', 'Telangana', 'Hyderabad', 'GST36GLOB567891234', '2024-01-28',
    'Professional', 'UPI', '15%', 'Platinum'),
    
    ('Mehra Imports', 'Vikram Mehra', '321 FC Road', 411004, '6543210987', 'vikram@mehra.com',
    '6543210987', 'India', 'Maharashtra', 'Pune', 'GST27MEHR432109876', '2024-02-05',
    'Safexpress', 'Net Banking', '7.5%', 'Silver'),
    
    ('Star Enterprise', 'Mary Thomas', '654 MG Road', 682005, '5432109876', 'mary@star.com',
    '5432109876', 'India', 'Kerala', 'Kochi', 'GST32STAR789654123', '2024-01-25',
    'Delhivery', 'Credit', '12%', 'Gold');

-- Insert transactions
INSERT INTO transactions (
    customer_id, item, quantity, transaction_date
) VALUES
    (1, 'LED TV 43"', 5, '2024-02-01'),
    (1, 'Microwave Oven', 3, '2024-02-01'),
    (1, 'Washing Machine', 2, '2024-01-15'),
    
    (2, 'Laptop', 10, '2024-02-03'),
    (2, 'Printer', 5, '2024-02-03'),
    (2, 'Desktop PC', 3, '2024-01-20'),
    
    (3, 'Smartphone', 20, '2024-01-28'),
    (3, 'Tablet', 15, '2024-01-28'),
    (3, 'Smart Watch', 25, '2024-01-15'),
    
    (4, 'Air Conditioner', 8, '2024-02-05'),
    (4, 'Refrigerator', 5, '2024-02-05'),
    (4, 'Water Purifier', 10, '2024-01-25'),
    
    (5, 'Home Theater', 4, '2024-01-25'),
    (5, 'CCTV Camera', 12, '2024-01-25'),
    (5, 'Gaming Console', 6, '2024-01-10');

SELECT * FROM customers;
SELECt * from transactions;

SELECT DISTINCT name, contact_person, contact, email
FROM customers;

SELECT * FROM transactions WHERE customer_id = 1;

DELIMITER $$
CREATE TRIGGER update_last_purchase_date
AFTER INSERT ON transactions
FOR EACH ROW
BEGIN
	UPDATE customers
    SET last_purchase_date = NEW.transaction_date
    WHERE id = NEW.customer_id;
END $$
DELIMITER ;

DROP TRIGGER update_last_purchase_date;

INSERT INTO transactions (customer_id, item, quantity, transaction_date) VALUES(2, "Headphones", 7, "2025-01-01");
DROP TABLE IF EXISTS OrderProduct;
DROP TABLE IF EXISTS UserOrder;
DROP TABLE IF EXISTS CartProduct;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS Customer;


CREATE TABLE Customer (
	CustomerId int IDENTITY(1,1) PRIMARY KEY NOT NULL,
	FirstName VARCHAR(20) NOT NULL,
	LastName VARCHAR(20) NOT NULL,
	UserName VARCHAR(20) NOT NULL,
	Email varchar(60) NOT NULL,
	Passwordsalt varbinary (500) NOT NULL,
	PasswordHash varbinary (500) NOT NULL,
    CONSTRAINT Unique_Email UNIQUE (Email),
	CONSTRAINT Unique_UserName UNIQUE (UserName)
);

CREATE TABLE Cart (
	CartId int PRIMARY KEY,
	CustomerId int FOREIGN KEY REFERENCES Customer(CustomerId)
);

CREATE TABLE Product (
	ProductId int IDENTITY(1,1) PRIMARY KEY,
	Name varchar(255),
	Price decimal(5,2),
	Info varchar(255),
	Category varchar(255),
  	Picture varchar(255),
	Quantity int,
    CONSTRAINT unique_product_name UNIQUE (Name)
);

CREATE TABLE CartProduct (
	CartProductId int IDENTITY(1,1) PRIMARY KEY,
	ProductId int FOREIGN KEY REFERENCES Product(ProductId),
	CustomerId int FOREIGN KEY REFERENCES Customer(CustomerId),
	Quantity int
);

CREATE TABLE UserOrder (
	OrderId int IDENTITY(1,1) PRIMARY KEY,
	CustomerId int FOREIGN KEY REFERENCES Customer(CustomerId),
	Name varchar(60),
	Street varchar(100),
	City varchar(50),
	State varchar(20),
	Zip varchar(5),
	Fourcard varchar(4),
	Cost varchar(10),
	ItemCount varchar(8)
);

CREATE TABLE OrderProduct (
	OrderProductId int IDENTITY(1,1) PRIMARY KEY,
	ProductId int FOREIGN KEY REFERENCES Product(ProductId),
	OrderId int FOREIGN KEY REFERENCES UserOrder(OrderId),
	CustomerId int FOREIGN KEY REFERENCES Customer(CustomerId),
	Quantity int
);
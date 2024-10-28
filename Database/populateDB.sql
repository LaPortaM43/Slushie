/* populateDB.sql */ 

INSERT INTO customers VALUES ('c1', 'Bob', 'Bob@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'bob123'); 
INSERT INTO customers VALUES ('c2', 'Bill', 'Bill@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'bill123'); 
INSERT INTO customers VALUES ('c3', 'Matt', 'matt@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'matt123'); 
INSERT INTO customers VALUES ('c4', 'Max', 'max@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'max123'); 
INSERT INTO customers VALUES ('c5', 'Tom', 'tom@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'tom123'); 
 
INSERT INTO flavors VALUES ('flav1', 'Vanilla');
INSERT INTO flavors VALUES ('flav2', 'Chocolate');
INSERT INTO flavors VALUES ('flav3', 'Strawberry');
INSERT INTO flavors VALUES ('flav4', 'Blueberry');
INSERT INTO flavors VALUES ('flav5', 'Blue Raspberry');

INSERT INTO combo VALUES ('cb1', 'c1', 'flav1', 'flav4', NULL); 
INSERT INTO combo VALUES ('cb2', 'c2', 'flav5', NULL, NULL); 
INSERT INTO combo VALUES('cb3', 'c3', 'flav1', 'flav3', NULL); 
INSERT INTO combo VALUES('cb4', 'c4', 'flav2', NULL, NULL); 
INSERT INTO combo VALUES('cb5', 'c5', 'flav5', NULL, NULL);

INSERT INTO branches VALUES ('b1', 'slushie', '400 Cedar Ave, West Long Branch, NJ 07764'); 

INSERT INTO orders VALUES('o1', 'c1', 10, NULL, 'b1', 'flav1', 'flav3', NULL);


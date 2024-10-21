/* populateDB.sql */ 

INSERT INTO customers VALUES ('c1', 'Bob', 'Bob@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'bob123'); 
INSERT INTO customers VALUES ('c2', 'Bill', 'Bill@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'bill123'); 
INSERT INTO customers VALUES ('c3', 'Matt', 'matt@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'matt123'); 
INSERT INTO customers VALUES ('c4', 'Max', 'max@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'max123'); 
INSERT INTO customers VALUES ('c5', 'Tom', 'tom@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'tom123'); 
 
INSERT INTO flavors VALUES ('flv1', 'Vanilla');
INSERT INTO flavors VALUES ('flv2', 'Chocolate');
INSERT INTO flavors VALUES ('flv3', 'Strawberry');
INSERT INTO flavors VALUES ('flv4', 'Blueberry');
INSERT INTO flavors VALUES ('flv5', 'Blue Raspberry');

INSERT INTO favorites VALUES ('f1', 'c1', 'flv1', 'flv4', NULL); 
INSERT INTO favorites VALUES ('f2', 'c2', 'flv5', NULL, NULL); 
INSERT INTO favorites VALUES('f3', 'c3', 'flv1', 'flv3', NULL); 
INSERT INTO favorites VALUES('f4', 'c4', 'flv2', NULL, NULL); 
INSERT INTO favorites VALUES('f5', 'c5', 'flv5', NULL, NULL);

INSERT INTO restaurants VALUES ('r1', 'slushie', '400 Cedar Ave, West Long Branch, NJ 07764'); 

INSERT INTO orders VALUES('o1', 'c1', 10, NULL, 'r1', 'flv1', 'flv3', NULL);


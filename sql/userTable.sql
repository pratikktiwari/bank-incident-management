DROP TABLE IF EXISTS user;
CREATE TABLE user (
  userId INT PRIMARY KEY AUTO_INCREMENT,
  userEmail VARCHAR(256) UNIQUE NOT NULL,
  password VARCHAR(500) NOT NULL,
  fullName VARCHAR(500) NOT NULL,
  division VARCHAR(500) NOT NULL,
  isAdmin INT (10) NOT NULL
);
INSERT INTO user (userEmail, password, fullName, isAdmin) 
  VALUES ("manager@abc-bank.com", "test1234", "Gaurav Yadav", 1);

INSERT INTO user (userEmail, password, fullName, division, isAdmin) 
  VALUES ("ram@abc-bank.com", "test1234", "Mr Ram", "legal", 0);

INSERT INTO user (userEmail, password, fullName, division, isAdmin) 
  VALUES ("krishna@abc-bank.com", "test1234", "Mr Krishna", "credit",  0);

INSERT INTO user (userEmail, password, fullName, division, isAdmin) 
  VALUES ("sita@abc-bank.com", "test1234", "Ms Sita", "legal", 0);

INSERT INTO user (userEmail, password, fullName, division, isAdmin) 
  VALUES ("radha@abc-bank.com", "test1234", "Ms Radha", "credit", 0);
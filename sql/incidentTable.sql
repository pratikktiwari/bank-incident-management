CREATE TABLE incident (
  incidentId INT PRIMARY KEY AUTO_INCREMENT,
  incidentType VARCHAR(256),
  severityLevel VARCHAR(256),
  accountNumber VARCHAR(1024),
  customerName VARCHAR(512),
  incidentTitle VARCHAR(256),
  incidentDescription TEXT,
  assignedTo INT,
  createdDate DATETIME DEFAULT NOW(),
  clearedDate DATETIME,
  comments TEXT DEFAULT '[]',
  FOREIGN KEY (assignedTo) REFERENCES user(userId),
  status VARCHAR(256)
);
-- status
-- CREATED, IN_PROGRESS, CLEARED, NA, ABCD
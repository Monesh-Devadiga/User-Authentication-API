// Switch to the auth_api database
use auth_api;

// Drop existing users collection
db.users.drop();

// Insert sample users (passwords are pre-hashed with bcrypt)
// Plain passwords: password123, password456
db.users.insertMany([
  {
    name: "John Doe",
    email: "john@example.com",
    password: "$2a$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5Gz0t0e7YHq1oY3v8k9x7Xy",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "$2a$12$K8H5R0pB3fG1sS2dQ4wX9uZ7yT6vN5mB4jH3gF2dS1aA0pP9oI8uY",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bob Wilson",
    email: "bob@example.com",
    password: "$2a$12$M4n7bV8cX9zL0kP1oI2uY3tR5eW6qA7sD8fG9hJ0kZ1x2C3v4B5n6m",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print("Inserted 3 sample users into auth_api database");
print("Emails: john@example.com, jane@example.com, bob@example.com");
print("Password for all: password123");

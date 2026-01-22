# Database Relationships

## 1. Definition of Database Relationship

A **database relationship** defines how data in one table is connected to data in another table using keys (primary keys and foreign keys).  
Relationships help maintain **data integrity**, **reduce redundancy**, and **enable meaningful data retrieval** across multiple tables.

In relational databases, relationships allow us to model real-world connections between entities such as customers, orders, products, and payments.

---

## 2. Types of Database Relationships

There are **three main types** of database relationships:

1. One-to-One (1:1)
2. One-to-Many (1:N)
3. Many-to-Many (M:N)

Each type is commonly used in real-world applications like e-commerce platforms.

---

## 3. One-to-One Relationship (1:1)

### Definition
A **One-to-One** relationship means **one record in Table A is associated with exactly one record in Table B**, and vice versa.

### E-commerce Example
**User ↔ UserProfile**

- Each user has exactly one profile
- Each profile belongs to only one user

### Tables
- `users`
- `user_profiles`

### Example Structure

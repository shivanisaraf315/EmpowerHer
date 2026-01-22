# Schema Design Fundamentals – Relational Databases

## 1. What Schema Design Is and What a Database Schema Represents

Schema design is the process of **planning and structuring how data will be stored, organized, and related inside a relational database**.  
A **database schema** represents the blueprint of the database. It defines tables, columns, data types, relationships, constraints, and rules that control how data is stored and accessed.

In simple terms, the schema describes **what data exists, how it is structured, and how different pieces of data are connected**.

---

## 2. Why Schema Design Is Required Before Writing Backend Code

Schema design must be completed before writing backend code because the backend depends on the database structure.  
APIs, queries, validations, and business logic all assume that tables, columns, and relationships already exist and behave correctly.

If schema design is skipped or changed frequently, backend code breaks, queries fail, and application logic becomes inconsistent.  
A well-designed schema provides a **stable foundation** on which backend logic can be safely built.

---

## 3. Impact of Poor Schema Design

Poor schema design leads to multiple problems:

- **Data inconsistency**: Same data stored in multiple places can become contradictory
- **Difficult maintenance**: Small changes require updates in many tables and queries
- **Poor scalability**: The database becomes slow and complex as data grows

For example, storing customer details repeatedly inside every order record can lead to mismatched addresses and emails over time.

---

## 4. Validations in Schema Design and Why Databases Enforce Them

Validations are **rules applied at the database level** to ensure data accuracy and integrity.  
Databases enforce validations so that invalid data is never stored, even if backend code fails.

Common validations include:

- **NOT NULL**: Ensures a column always has a value
- **UNIQUE**: Prevents duplicate values, such as emails
- **DEFAULT**: Automatically assigns a value if none is provided
- **PRIMARY KEY**: Uniquely identifies each record in a table

These constraints protect the database from invalid, incomplete, or duplicate data.

---

## 5. Difference Between a Database Schema and a Database Table

A **database schema** is the overall structure or design of the database.  
A **database table** is a single component within the schema that stores data related to one entity.

In other words, the schema is the **blueprint**, while tables are the **actual structures** built using that blueprint.

---

## 6. Why a Table Should Represent Only One Entity

Each table should represent only one entity to maintain clarity and normalization.  
An entity refers to a real-world object such as a user, product, or order.

If a table mixes multiple entities, it leads to confusion, duplication, and complex queries.  
For example, storing user and order details in the same table makes it difficult to update or track either independently.

---

## 7. Why Redundant or Derived Data Should Be Avoided

Redundant data means storing the same information multiple times.  
Derived data is information that can be calculated from existing data.

Both should be avoided because:
- Redundant data causes inconsistencies
- Derived data can become outdated or incorrect
- Updates require changes in multiple places

For example, storing `total_price` when it can be calculated from `quantity × unit_price` introduces risk if one value changes.

---

## 8. Importance of Choosing Correct Data Types

Choosing correct data types ensures efficient storage, accurate validation, and better performance.

Examples:
- Using **INTEGER** for numeric values instead of TEXT
- Using **TIMESTAMP** for date and time tracking
- Using **BOOLEAN** for true or false values

Incorrect data types waste storage, slow down queries, and allow invalid data to be stored.

---

## 9. Conclusion

Schema design is a critical step in building reliable relational databases.  
A well-planned schema improves data integrity, simplifies backend development, and ensures the database can scale efficiently as the application grows.

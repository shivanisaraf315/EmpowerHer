1. Why is db.json not suitable as a database for real projects?

Using db.json is suitable only for small demos or learning purposes and not for real-world applications.

Limitations of file-based storage

Performance
Every read or write operation requires loading and rewriting the entire file. As the data size increases, this becomes slow and inefficient.

Scalability
File-based storage does not scale well. It cannot efficiently handle large volumes of data or a growing number of users.

Concurrency
Multiple users accessing or modifying the file at the same time can lead to data corruption because file systems do not handle concurrent writes safely.

Reliability
If the server crashes during a write operation, the data may become corrupted or lost. There is no automatic recovery mechanism.

Limited Features
There is no support for transactions, indexing, relationships, or advanced querying, which are essential for production systems.

2. Ideal characteristics of a database system (apart from just storage)

A proper database system provides much more than basic data storage and ensures efficient and safe data handling.

Performance
The database should be able to store and retrieve data quickly using indexing and query optimization.

Concurrency
It should support multiple users accessing and updating data at the same time without conflicts.

Reliability
The system should protect data from crashes and failures using backups and recovery mechanisms.

Data Integrity
Constraints such as primary keys and foreign keys ensure that the data remains accurate and consistent.

Scalability
The database should be able to handle increasing data and user load by scaling vertically or horizontally.

Fault Tolerance
The system should continue functioning even when some components fail, using replication and failover mechanisms.

3. Types of databases and their use cases

Databases are mainly categorized into relational and non-relational (NoSQL) databases.

Relational Databases

Relational databases store data in tables with fixed schemas and predefined relationships.

Examples include MySQL, PostgreSQL, Oracle, and SQL Server.

Use Cases

Banking and financial systems

E-commerce platforms

Inventory and order management systems

Applications requiring strong consistency and structured data

Non-Relational (NoSQL) Databases

NoSQL databases store data in flexible formats such as documents, key-value pairs, or graphs.

Examples include MongoDB, Redis, Cassandra, and DynamoDB.

Use Cases

Social media applications

Real-time data processing

IoT and big data applications

Systems requiring high scalability and flexible schemas
# User Model Documentation

## Table Name
users

## Description
This table stores all users of the Fleet Management System.
Each user can have only one role: customer, owner, or driver.

## Columns

| Column Name | Data Type | Constraints |
|-----------|----------|------------|
| id | uuid | Primary Key, auto-generated |
| name | text | Not Null |
| email | text | Unique, Not Null |
| password | text | Not Null |
| role | text | Allowed values: customer, owner, driver |
| created_at | timestamp | Default: now() |

## Constraints

- Email must be unique.
- Role must be one of: customer, owner, driver.

## Relationships

- One user (owner) can own many vehicles.
- One user (driver) can be assigned to a vehicle.
- One user (customer) can create many trips.

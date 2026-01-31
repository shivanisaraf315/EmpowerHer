# Vehicle Model Documentation

## Table Name
vehicles

## Description
This table stores all vehicles registered by owners.
Each vehicle belongs to one owner and may be assigned to one driver.

## Columns

| Column Name | Data Type | Constraints |
|------------|----------|------------|
| id | uuid | Primary Key, auto-generated |
| name | text | Not Null |
| registration_number | text | Unique, Not Null |
| allowed_passengers | integer | Not Null |
| isAvailable | boolean | Default: true |
| driver_id | uuid | Nullable, Foreign Key |
| rate_per_km | numeric | Not Null |
| owner_id | uuid | Not Null, Foreign Key |
| created_at | timestamp | Default: now() |

## Constraints
- Registration number must be unique.
- Only owners can create vehicles.
- Vehicle availability changes based on trip status.

## Relationships
- owner_id → users.id (Owner of the vehicle)
- driver_id → users.id (Assigned driver)

# Trip Model Documentation

## Table Name
trips

## Description
This table stores trip details created by customers.
Each trip uses one vehicle and is completed when the journey ends.

## Columns

| Column Name | Data Type | Constraints |
|------------|----------|------------|
| id | uuid | Primary Key, auto-generated |
| customer_id | uuid | Not Null, Foreign Key |
| vehicle_id | uuid | Not Null, Foreign Key |
| start_date | date | Not Null |
| end_date | date | Not Null |
| location | text | Not Null |
| distance_km | numeric | Not Null |
| passengers | integer | Not Null |
| tripCost | numeric | Calculated at trip end |
| isCompleted | boolean | Default: false |
| created_at | timestamp | Default: now() |

## Constraints
- Vehicle must be available when creating a trip.
- Passenger count must not exceed allowed passengers.
- Trip cost = distance_km × rate_per_km.

## Relationships
- customer_id → users.id
- vehicle_id → vehicles.id

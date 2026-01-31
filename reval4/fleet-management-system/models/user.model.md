Table: users

Columns:
- id (uuid, PK)
- name (text, not null)
- email (unique)
- password (text)
- role (customer | owner | driver)
- created_at (timestamp)

Relationships:
- One user can be owner OR customer OR driver

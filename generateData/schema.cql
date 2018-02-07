CREATE TABLE users (
    id int PRIMARY KEY,
    email text,
    first_name text,
    last_name text,
    phone text
);

CREATE TABLE events_by_user_id (
    user_id int,
    event_type text,
    product_id int,
    created_at timestamp,
    PRIMARY KEY (user_id, created_at)
) with CLUSTERING ORDER BY (created_at DESC);

CREATE TABLE events_by_product_id (
    product_id int,
    event_type text,
    user_id int,
    created_at timestamp,
    PRIMARY KEY (product_id, created_at)
) with CLUSTERING ORDER BY (created_at DESC);


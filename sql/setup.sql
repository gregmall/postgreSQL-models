DROP TABLE IF EXISTS beers;
DROP TABLE IF EXISTS guitars;
DROP TABLE IF EXISTS shoes;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS bicycles;

CREATE TABLE beers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT CHECK (type = ANY('{lager,pilsner,ale}')),
    cost INT CHECK (cost > 0)
);

CREATE TABLE guitars (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT CHECK (type = ANY('{guitar,bass}')),
    cost INT CHECK (cost > 0)
);

CREATE TABLE shoes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT CHECK (type = ANY('{running, basketball, track, golf}')),
    cost INT CHECK (cost > 0)
);

CREATE TABLE cars (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT CHECK (type = ANY('{car, truck, SUV}')),
    cost INT CHECK (cost > 0)
);

CREATE TABLE bicycles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand TEXT NOT NULL,
    type TEXT CHECK (type = ANY('{mountain, road, bmx}')),
    cost INT CHECK (cost > 0)
);



DROP TABLE IF EXISTS beers;
DROP TABLE IF EXISTS guitars;

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


DROP TABLE IF EXISTS beers;

CREATE TABLE beers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT CHECK (type = ANY('{lager,pilsner,ale}')),
    cost INT CHECK (cost > 0)
);

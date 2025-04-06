CREATE TABLE IF NOT EXISTS public.companies
(
  id int GENERATED ALWAYS AS IDENTITY,
  isin varchar(12) NOT NULL,
  name text NOT NULL,
  exchange text NOT NULL,
  ticker text NOT NULL,
  website text,
  PRIMARY KEY (id),
  CONSTRAINT isin UNIQUE (isin)
);

INSERT INTO public.companies (isin, name, exchange, ticker, website) VALUES
('US0378331005', 'Apple Inc.', 'NASDAQ', 'AAPL', 'http://www.apple.com'),
('US1104193065', 'British Airways Plc', 'Pink Sheets', 'BAIRY', NULL),
('NL0000009165', 'Heineken NV', 'Euronext Amsterdam', 'HEIA', NULL),
('JP3866800000', 'Panasonic Corp', 'Tokyo Stock Exchange', '6752', 'http://www.panasonic.co.jp'),
('DE000PAH0038', 'Porsche Automobil', 'Deutsche Börse', 'PAH3', 'https://www.porsche.com');

CREATE TABLE IF NOT EXISTS public.users
(
  id int GENERATED ALWAYS AS IDENTITY,
  username text NOT NULL,
  password text NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT username UNIQUE (username)
);

INSERT INTO public.users (username, password) VALUES
('glass-lewis', '$2b$08$/dLGn.DoLLgXwJ5.MPo0KOHkRGzzG0oq39SwT767o/Qj6oZ1I1LTa');

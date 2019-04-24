-- comments
CREATE TABLE public.comments (
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    comment character varying(305) DEFAULT NULL::character varying
);

-- customers
CREATE SEQUENCE public.cust_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
CREATE TABLE public.customers (
    "CustID" integer DEFAULT nextval('public.cust_id_seq'::regclass) NOT NULL,
    name character varying(50),
    email character varying(50)
);

-- employees
CREATE SEQUENCE public.emp_id_seq
    AS integer
    START WITH 100
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
CREATE TABLE public.employees (
    "EmpID" integer DEFAULT nextval('public.emp_id_seq'::regclass) NOT NULL,
    "Name" character varying(50),
    "Position" character varying(50),
    "Department" character varying(30)
);
ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pk PRIMARY KEY ("EmpID");

-- instock
CREATE TABLE public.instock (
    "UPC" integer NOT NULL,
    "StoreID" integer NOT NULL,
    "Qty" integer NOT NULL
);
ALTER TABLE ONLY public.instock
    ADD CONSTRAINT instock_items_fk FOREIGN KEY ("UPC") REFERENCES public.items("UPC");
ALTER TABLE ONLY public.instock
    ADD CONSTRAINT instock_stores_fk FOREIGN KEY ("StoreID") REFERENCES public.stores("StoreID");

-- items
CREATE TABLE public.items (
    "UPC" integer NOT NULL,
    "Size" character varying(30),
    "Color" character varying(30),
    "Department" character varying(30),
    "Description" character varying(50),
    "Brand" character varying(30),
    "Price" money
);
ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pk PRIMARY KEY ("UPC");

-- Stores
CREATE SEQUENCE public.store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
CREATE TABLE public.stores (
    "StoreID" integer DEFAULT nextval('public.store_id_seq'::regclass) NOT NULL,
    "StoreName" character varying(30),
    "City" character varying(30),
    "State" character varying(30),
    rating integer,
    year integer
);
ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pk PRIMARY KEY ("StoreID");

-- transactions
CREATE TABLE public.transactions (
    "TransID" integer DEFAULT nextval('public.tran_id_seq'::regclass) NOT NULL,
    "EmpID" integer NOT NULL,
    "StoreID" integer NOT NULL,
    "CustID" integer NOT NULL,
    "Timestamp" timestamp without time zone,
    "Total" double precision
);
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pk PRIMARY KEY ("TransID");
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_customers_fk FOREIGN KEY ("CustID") REFERENCES public.customers("CustID");
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_employees_fk FOREIGN KEY ("EmpID") REFERENCES public.employees("EmpID");
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_stores_fk FOREIGN KEY ("StoreID") REFERENCES public.stores("StoreID");

-- users
CREATE TABLE public.users (
    id integer NOT NULL,
    custid numeric,
    empid numeric,
    username text NOT NULL,
    password text NOT NULL
);
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
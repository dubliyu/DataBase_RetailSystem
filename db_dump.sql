--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    comment character varying(305) DEFAULT NULL::character varying
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: cust_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cust_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cust_id_seq OWNER TO postgres;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    "CustID" integer DEFAULT nextval('public.cust_id_seq'::regclass) NOT NULL,
    name character varying(50),
    email character varying(50)
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: emp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.emp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.emp_id_seq OWNER TO postgres;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    "EmpID" integer DEFAULT nextval('public.emp_id_seq'::regclass) NOT NULL,
    "Name" character varying(50),
    "Position" character varying(50),
    "Department" character varying(30)
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employs (
    "StoreID" integer,
    "EmpID" integer,
    "StartYear" integer
);


ALTER TABLE public.employs OWNER TO postgres;

--
-- Name: instock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.instock (
    "UPC" integer NOT NULL,
    "StoreID" integer NOT NULL,
    "Qty" integer NOT NULL
);


ALTER TABLE public.instock OWNER TO postgres;

--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    "UPC" integer NOT NULL,
    "Size" character varying(30),
    "Color" character varying(30),
    "Department" character varying(30),
    "Description" character varying(50),
    "Brand" character varying(30),
    "Price" money
);


ALTER TABLE public.items OWNER TO postgres;

--
-- Name: purchasedItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."purchasedItem" (
    "UPC" integer NOT NULL,
    "TransID" integer NOT NULL
);


ALTER TABLE public."purchasedItem" OWNER TO postgres;

--
-- Name: store_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.store_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.store_id_seq OWNER TO postgres;

--
-- Name: stores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stores (
    "StoreID" integer DEFAULT nextval('public.store_id_seq'::regclass) NOT NULL,
    "StoreName" character varying(30),
    "City" character varying(30),
    "State" character varying(30),
    rating integer,
    year integer
);


ALTER TABLE public.stores OWNER TO postgres;

--
-- Name: tran_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tran_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tran_id_seq OWNER TO postgres;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    "TransID" integer DEFAULT nextval('public.tran_id_seq'::regclass) NOT NULL,
    "EmpID" integer NOT NULL,
    "StoreID" integer NOT NULL,
    "CustID" integer NOT NULL,
    "Timestamp" timestamp without time zone,
    "Total" double precision
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    custid numeric,
    empid numeric,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments ("timestamp", comment) FROM stdin;
2019-04-20 17:57:44.093228	I had an excellence experience at your store! I shop at the USF store and they are just so great and friendly. I love Simba's Department Store! I shop there all the time!
2019-04-20 17:58:57.288565	I had an awful experience! The store was a mess and the cashiers were too busy texting.
2019-04-20 17:59:12.638858	The dog in the photo is cute
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers ("CustID", name, email) FROM stdin;
2	Carlos Leon	cleon@mail.usf.edu
3	Skoervitch Emile	skoervitch@mail.com
4	Cayla Caskey	calya@mail.com
5	Alyscia Quichocho	alyscia@mail.com
6	Stacy Kappel	stacy@mail.com
7	Adam Dementov	adam@mail.com
8	Madison Penty	madison@mail.com
9	Brianna Jackson	brianna@mail.com
10	Claire Hammell	claire@mail.com
11	Eric Handstad	eric@mail.com
12	Hunter Sever	hunter@mail.com
13	Delanie Dolan	delanie@mail.com
14	Chloe Brown	chloe@mail.com
15	Andrew Roberts	andrew@mail.com
16	Brandon Hutchinson	brandon@mail.com
17	Joey Wilson	joey@mail.com
18	Glenn Johnson	glenn@mail.com
19	David Foens	david@mail.com
20	Brian Calas	brian@mail.com
21	Ryan Bradford	ryan@mail.com
22	George Herbert	george@mail.com
23	Alex Torres	alex@mail.com
24	Kris Richo	kris@mail.com
25	Claire Chatfield	claire1@mail.com
26	Alexis Weathers	alexis@mail.com
27	Angela Roberson	angela@mail.com
28	Charlecia Willams	charlecia@mail.com
29	Devon Ashton	devon@mail.com
30	Josh Lombardi	josh@mail.com
31	Kaci Henry	kaci@mail.com
32	Koen Roberson	koen@mail.com
33	Morgan Petro	morgan@mail.com
34	Sarah Loyd	sarah@mail.com
35	Shreyas Patil	shreyas@mail.com
36	Annie Brey	annie@mail.com
37	Trey Neads	trey@mail.com
38	Brooke Sankoe	brooke@mail.com
39	Olivia Penty	olivia@mail.com
40	Ashley Wang	ashley@mail.com
43	Carlos Leon 2	cleonromero@gmail.com
44	Carlos Leon 2	cleonromero@gmail.com
45	Carlos Leon 2	cleonromero@gmail.com
46	Carlos Leon 2	cleonromero@gmail.com
47	Carlos Leon 2	cleonromero@gmail.com
48	mary Wilson	mary@wilson.com
49	Susan Steve	susan@bad_emp.com
42	Hello World	cleonromero@gmail.com
50	Simba	mwilson18@mail.usf.edu
51	Simba	mwilson18@mail.usf.edu
52	Simba	mwilson18@mail.usf.edu
53	Joey	Jrw792@gmail.com
1	Mary Wilson	mwilson18@mail.usf.edu
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees ("EmpID", "Name", "Position", "Department") FROM stdin;
1004	Glenn Johnson	Manager	Shoes
1006	Cayla Caskey	Manager	Kids
1007	Skoervitch Emile	Associate	Kids
1011	Hunter Sever	Manager	Clothes
1012	Chloe Brown	Associate	Jewelry
1014	Brianna Jackson	Associate	Customer Service
1015	Claire Hammell	Associate	Shoes
1016	Brian Calas	Associate	Clothes
1003	Eric Handstad	Manager	Home
1005	Delanie Dolan	Manager	Jewelry
1009	Josh Lombardi	Associate	Stockroom
1010	David Foens	Associate	Home
1013	Joey Wilson	Manager	Register
1001	Mary Wilson	Manager	Kids
1008	Madison Penty	Associate	Register
1002	Carlos Leon	Manager	Kids
1017	Susan	Associate	Home
\.


--
-- Data for Name: employs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employs ("StoreID", "EmpID", "StartYear") FROM stdin;
101	1001	2017
101	1002	2017
101	1003	2017
101	1004	2017
101	1005	2017
101	1006	2017
101	1007	2018
101	1008	2019
101	1009	2019
101	1010	2018
101	1011	2018
101	1012	2019
101	1013	2018
101	1014	2019
101	1015	2019
101	1016	2017
\.


--
-- Data for Name: instock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.instock ("UPC", "StoreID", "Qty") FROM stdin;
10001	101	9
10001	102	11
50027	101	5
40001	103	6
10003	101	2
30010	101	1
30012	101	3
40001	101	4
40005	101	6
40009	101	5
40011	101	4
40016	101	6
50010	101	1
50011	101	3
50012	101	8
50013	101	5
50014	101	9
50016	101	1
50017	101	10
50018	101	2
10007	101	2
50019	101	2
50020	101	9
50021	101	8
40002	101	8
40003	101	1
40004	101	6
40006	101	8
40007	101	7
40008	101	3
40010	101	5
40012	101	7
40013	101	3
40014	101	6
40015	101	6
30003	101	5
50001	101	7
50002	101	9
50003	101	9
50004	101	4
50005	101	5
50006	101	3
50007	101	9
50008	101	6
50009	101	6
50015	101	7
50024	101	1
50025	101	5
50026	101	9
50028	101	7
50029	101	1
50030	101	2
50031	101	6
50032	101	9
50033	101	1
50022	101	7
50023	101	4
10002	102	4
10003	102	7
10004	102	3
10005	102	1
30006	102	10
10006	102	9
30007	102	8
30008	102	5
30010	102	6
30012	102	7
40001	102	4
40005	102	10
40009	102	1
40011	102	7
40016	102	9
50010	102	7
50011	102	3
50012	102	7
50013	102	8
50014	102	8
50016	102	6
50017	102	9
50018	102	5
10007	102	7
50019	102	1
50020	102	1
50021	102	6
20002	102	2
30009	102	8
30011	102	10
40002	102	0
40003	102	2
40004	102	7
40006	102	3
40007	102	3
40008	102	7
40010	102	3
40012	102	1
40013	102	2
40014	102	9
40015	102	8
10008	102	6
10009	102	9
10010	102	9
20001	102	3
20003	102	8
20004	102	7
40005	103	3
40009	103	1
20005	102	6
20006	102	4
20007	102	5
20008	102	4
20009	102	10
20010	102	4
20011	102	9
20012	102	7
20013	102	5
20014	102	0
20015	102	2
30001	102	6
30002	102	9
30003	102	2
30004	102	7
30005	102	1
50001	102	9
50002	102	0
50003	102	4
50004	102	6
50005	102	3
50006	102	5
50007	102	8
50008	102	2
50009	102	3
50015	102	4
50024	102	0
50025	102	3
50026	102	7
50027	102	8
50028	102	9
50029	102	3
50030	102	2
50031	102	4
50032	102	7
50033	102	2
50022	102	8
50023	102	6
10001	103	9
10002	103	2
10003	103	7
10004	103	1
10005	103	8
30006	103	5
10006	103	3
30007	103	5
30008	103	6
30010	103	2
30012	103	5
10004	101	1
10005	101	8
10006	101	8
10008	101	6
10009	101	6
10010	101	9
20001	101	9
20003	101	10
20004	101	9
20005	101	1
20006	101	7
20007	101	7
20008	101	1
20009	101	9
20010	101	9
20011	101	5
20012	101	6
20014	101	1
20015	101	3
20017	102	2
30011	101	5
20017	101	9
30001	101	1
30002	101	3
30004	101	5
30005	101	4
30007	101	8
30009	101	1
40011	103	4
40016	103	1
50010	103	7
50011	103	0
50012	103	0
50013	103	6
50014	103	0
50016	103	10
50017	103	8
50018	103	7
10007	103	7
50019	103	8
50020	103	6
50021	103	7
20002	103	3
30009	103	2
30011	103	8
40002	103	6
40003	103	5
40004	103	8
40006	103	0
40007	103	4
40008	103	9
40010	103	3
40012	103	8
40013	103	3
40014	103	2
40015	103	9
10008	103	9
10009	103	5
10010	103	0
20003	103	6
20004	103	7
20005	103	3
20006	103	6
20007	103	3
20008	103	3
20009	103	6
20010	103	1
20011	103	0
20012	103	4
20013	103	9
20014	103	6
20015	103	0
30001	103	2
30002	103	8
30003	103	8
30004	103	8
30005	103	3
50001	103	7
50002	103	8
50003	103	7
50004	103	6
50005	103	2
50006	103	5
50007	103	9
50008	103	3
50009	103	4
50015	103	8
50024	103	8
50025	103	4
50026	103	1
50027	103	4
50028	103	1
50029	103	4
50030	103	0
50031	103	4
50032	103	8
50033	103	7
50022	103	5
50023	103	8
20002	101	4
20013	101	4
30008	101	1
20017	103	6
10002	101	2
30006	101	5
20001	103	4
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items ("UPC", "Size", "Color", "Department", "Description", "Brand", "Price") FROM stdin;
10003	7	Gold	Jewelry	Ring	Pandora	$399.99
10004	8	Gold	Jewelry	Ring	Pandora	$399.99
10005	No	Silver	Jewelry	Heart Necklace	James Avery	$104.99
30006	6M	Blue	Kids	Infant Onesie	Carters	$9.99
10006	18in	Silver	Jewelry	Chain	James Avery	$39.99
30007	9M	Blue	Kids	Infant Onesie	Carters	$9.99
30008	6	Blue	Kids	Girls Jeans	Levi	$39.99
30010	10	Blue	Kids	Girls Jeans	Levi	$39.99
30012	No	Multi	Kids	Lego Toy	Lego	$49.99
40001	12	Black	Shoes	Kids Shoe	Stride Rite	$29.99
40005	6	White	Shoes	Womens Shoe	Clarks	$59.99
40009	10	White	Shoes	Womens Shoe	Clarks	$59.99
40011	7	Navy	Shoes	Mens Shoe	Vans	$49.99
40016	12	Navy	Shoes	Mens Shoe	Vans	$49.99
50010	L	Red	Clothing	Womens Shirt	Sonoma	$19.99
50011	XL	Red	Clothing	Womens Shirt	Sonoma	$19.99
50012	1X	Red	Clothing	Womens Plus Shirt	Sonoma	$21.99
50013	2X	Red	Clothing	Womens Plus Shirt	Sonoma	$21.99
50014	3X	Red	Clothing	Womens Plus Shirt	Sonoma	$21.99
50016	M	Teal	Clothing	Womens Shirt	Sonoma	$19.99
50017	L	Teal	Clothing	Womens Shirt	Sonoma	$19.99
50018	XL	Teal	Clothing	Womens Shirt	Sonoma	$19.99
10007	20in	Silver	Jewelry	Chain	James Avery	$44.99
50019	1X	Teal	Clothing	Womens Plus Shirt	Sonoma	$21.99
50020	2X	Teal	Clothing	Womens Plus Shirt	Sonoma	$21.99
50021	3X	Teal	Clothing	Womens Plus Shirt	Sonoma	$21.99
20002	Full/Queen	Grey	Home	Comforter	Madison Park	$79.99
30009	8	Blue	Kids	Girls Jeans	Levi	$39.99
30011	12	Blue	Kids	Girls Jeans	Levi	$39.99
40002	13	Black	Shoes	Kids Shoe	Stride Rite	$29.99
40003	1	Black	Shoes	Kids Shoe	Stride Rite	$29.99
40004	2	Black	Shoes	Kids Shoe	Stride Rite	$29.99
40006	7	White	Shoes	Womens Shoe	Clarks	$59.99
40007	8	White	Shoes	Womens Shoe	Clarks	$59.99
40008	9	White	Shoes	Womens Shoe	Clarks	$59.99
40010	11	White	Shoes	Womens Shoe	Clarks	$59.99
40012	8	Navy	Shoes	Mens Shoe	Vans	$49.99
40013	9	Navy	Shoes	Mens Shoe	Vans	$49.99
40014	10	Navy	Shoes	Mens Shoe	Vans	$49.99
40015	11	Navy	Shoes	Mens Shoe	Vans	$49.99
10008	22in	Silver	Jewelry	Chain	James Avery	$49.99
10009	No	Silver	Jewelry	Earrings	Tiffany	$89.99
10010	No	Gold	Jewelry	Earrings	Tiffany	$89.99
20003	King	Grey	Home	Comforter	Madison Park	$99.99
20004	10in	Red	Home	Frying Pan	Red Copper	$29.99
20005	12in	Red	Home	Frying Pan	Red Copper	$39.99
20006	10in	Black	Home	Frying Pan	Red Copper	$29.99
20007	12in	Black	Home	Frying Pan	Red Copper	$39.99
20008	16pc	White	Home	16pc Dining Set	Fiesta	$59.99
20009	16pc	Black	Home	16pc Dining Set	Fiesta	$59.99
20010	16pc	Red	Home	16pc Dining Set	Fiesta	$59.99
20011	Twin	White	Home	Sheet Set	Home Classics	$29.99
20012	Full	White	Home	Sheet Set	Home Classics	$34.99
20013	Queen	White	Home	Sheet Set	Home Classics	$39.99
20014	King	White	Home	Sheet Set	Home Classics	$44.99
20015	1pc	No	Home	Wine Glass	Food Network	$4.99
30001	2T	Pink	Kids	4pc PJ Set	Carters	$29.99
30002	3T	Pink	Kids	4pc PJ Set	Carters	$29.99
30003	4T	Pink	Kids	4pc PJ Set	Carters	$29.99
30004	NB	Blue	Kids	Infant Onesie	Carters	$9.99
30005	3M	Blue	Kids	Infant Onesie	Carters	$9.99
50001	S	Black	Clothing	Womens Shirt	Sonoma	$19.99
50002	M	Black	Clothing	Womens Shirt	Sonoma	$19.99
50003	L	Black	Clothing	Womens Shirt	Sonoma	$19.99
50004	XL	Black	Clothing	Womens Shirt	Sonoma	$19.99
50005	1X	Black	Clothing	Womens Plus Shirt	Sonoma	$21.99
50006	2X	Black	Clothing	Womens Plus Shirt	Sonoma	$21.99
50007	3X	Black	Clothing	Womens Plus Shirt	Sonoma	$21.99
50008	S	Red	Clothing	Womens Shirt	Sonoma	$19.99
50009	M	Red	Clothing	Womens Shirt	Sonoma	$19.99
50015	S	Teal	Clothing	Womens Shirt	Sonoma	$19.99
50024	L	Black	Clothing	Mens Shirt	Nike	$24.99
50025	XL	Black	Clothing	Mens Shirt	Nike	$24.99
50026	XXL	Black	Clothing	Mens Shirt	Nike	$24.99
50027	3XL	Black	Clothing	Mens Shirt	Nike	$24.99
50028	S	Green	Clothing	Mens Shirt	Nike	$24.99
50029	M	Green	Clothing	Mens Shirt	Nike	$24.99
50030	L	Green	Clothing	Mens Shirt	Nike	$24.99
50031	XL	Green	Clothing	Mens Shirt	Nike	$24.99
50032	XXL	Green	Clothing	Mens Shirt	Nike	$24.99
50033	3XL	Green	Clothing	Mens Shirt	Nike	$24.99
50022	S	Black	Clothing	Mens Shirt	Nike	$24.99
50023	M	Black	Clothing	Mens Shirt	Nike	$24.99
20017	4pc	No	Home	Wine Glass	Food Network	$17.99
20001	Twin	Grey	Home	Comforter	Madison Park	$59.99
10002	12	Silver	Jewelry	Ring	Pandora	$399.99
10001	7	Silver	Jewelry	Heart Necklace	Pandora	$399.94
\.


--
-- Data for Name: purchasedItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."purchasedItem" ("UPC", "TransID") FROM stdin;
10002	1001
50012	1001
20002	1002
50019	1003
40008	1004
10007	1005
10005	1005
\.


--
-- Data for Name: stores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stores ("StoreID", "StoreName", "City", "State", rating, year) FROM stdin;
101	USF	Tampa	Florida	10	2016
107	Sarasota	Sarasota	Florida	3	2017
108	Ocala	Ocala	Florida	5	2017
109	Orlando	Orlando	Florida	6	2017
110	Miami	Miami	Florida	8	2018
111	Columbus	Columbus	Ohio	4	2018
112	Cincinnati	Cincinnati	Ohio	9	2018
113	OSU	Columbus	Ohio	1	2018
114	Savanna	Savanna	Ohio	2	2019
115	UF	Gainsville	Florida	6	2019
116	FSU	Tallahassee	Florida	4	2019
102	Brandon	Brandon	Florida	7	2016
103	Tampa	Tampa	Florida	4	2016
104	Clearwater	Clearwater	Florida	6	2017
105	Atlanta	Atlanta	Georgia	8	2017
106	New Orleans	New Orleans	Louisiana	8	2017
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions ("TransID", "EmpID", "StoreID", "CustID", "Timestamp", "Total") FROM stdin;
1001	1002	101	1	2019-04-18 10:48:00	421.980000000000018
1003	1001	101	1	2019-04-18 10:52:00	21.9899999999999984
1004	1002	101	3	2019-04-18 10:54:00	59.990000000000002
1002	1017	101	1	2019-04-18 10:50:00	79.9899999999999949
1005	1017	101	2	2018-09-23 15:00:00	154.97999999999999
1007	1005	101	1	2019-04-19 09:31:00	49.990000000000002
1008	1004	101	1	2019-04-19 09:31:00	29.9899999999999984
1012	1002	101	1	2019-04-19 09:31:00	54.990000000000002
1013	1003	101	1	2019-04-19 09:31:00	39.990000000000002
1014	1011	101	1	2019-04-19 09:31:00	14.9900000000000002
1009	1017	101	1	2019-04-19 09:31:00	9.99000000000000021
1010	1017	101	1	2019-04-19 09:31:00	4.99000000000000021
1011	1017	101	1	2019-04-19 09:31:00	39.990000000000002
1006	1017	101	1	2019-04-19 09:31:00	29.9899999999999984
1015	1001	101	1	2019-04-20 05:51:00	31.9899999999999984
1016	1003	101	3	2019-04-20 05:51:00	1.98999999999999999
1017	1004	101	6	2019-04-20 05:51:00	4.99000000000000021
1018	1007	101	5	2019-04-20 05:51:00	49.990000000000002
1019	1017	101	3	2019-04-20 05:51:00	399.990000000000009
1020	1008	101	2	2019-04-20 05:51:00	599.990000000000009
1021	1009	101	1	2019-04-20 05:51:00	30.9899999999999984
1022	1010	101	1	2019-04-20 05:51:00	20
1023	1014	101	1	2019-04-20 05:51:00	18.9899999999999984
1024	1017	101	1	2019-04-20 05:51:00	17.9899999999999984
1025	1015	101	9	2019-04-20 05:51:00	15.9900000000000002
1026	1005	101	10	2019-04-20 05:51:00	14.9900000000000002
1027	1006	101	13	2019-04-20 05:51:00	12.9900000000000002
1028	1007	101	15	2019-04-20 05:51:00	15.9900000000000002
1029	1009	101	2	2019-04-20 05:51:00	13.9900000000000002
1030	1010	101	1	2019-04-20 05:51:00	43.990000000000002
1031	1014	101	4	2019-04-20 05:51:00	30
1032	1016	101	1	2019-04-20 05:51:00	29.9899999999999984
1033	1017	101	1	2019-04-20 05:51:00	500
1034	1008	101	1	2019-04-20 05:51:00	99.9899999999999949
1035	1008	101	3	2019-04-20 05:51:00	89.9899999999999949
1036	1006	101	2	2019-04-20 05:51:00	79.9899999999999949
1037	1008	101	7	2019-04-20 05:51:00	69.9899999999999949
1038	1004	101	9	2019-04-20 05:51:00	59.990000000000002
1039	1017	101	20	2019-04-20 05:51:00	49.990000000000002
1040	1017	101	9	2019-04-20 05:51:00	29.9899999999999984
1041	1017	101	3	2019-04-20 05:51:00	69.9899999999999949
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, custid, empid, username, password) FROM stdin;
1	\N	1002	carlosw151	$2b$10$F0tXAwnPobSOlXofjB/ZfeiQWh9nPvESD32G9IAMq569UUYCr/DlK
2	1	\N	allie0923	$2b$10$F0tXAwnPobSOlXofjB/ZfeiQWh9nPvESD32G9IAMq569UUYCr/DlK
3	\N	1017	susan	$2b$10$qLhjTswLxev.H5cFYDnTmeXUsX7w4PHk909o6ueZSQge0SY1R/egK
\.


--
-- Name: cust_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cust_id_seq', 53, true);


--
-- Name: emp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.emp_id_seq', 1019, true);


--
-- Name: store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.store_id_seq', 107, true);


--
-- Name: tran_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tran_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: customers customers_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pk PRIMARY KEY ("CustID");


--
-- Name: employees employees_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pk PRIMARY KEY ("EmpID");


--
-- Name: items items_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pk PRIMARY KEY ("UPC");


--
-- Name: stores stores_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pk PRIMARY KEY ("StoreID");


--
-- Name: transactions transactions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pk PRIMARY KEY ("TransID");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: employs employs_employees_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employs
    ADD CONSTRAINT employs_employees_fk FOREIGN KEY ("EmpID") REFERENCES public.employees("EmpID");


--
-- Name: employs employs_stores_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employs
    ADD CONSTRAINT employs_stores_fk FOREIGN KEY ("StoreID") REFERENCES public.stores("StoreID");


--
-- Name: instock instock_items_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instock
    ADD CONSTRAINT instock_items_fk FOREIGN KEY ("UPC") REFERENCES public.items("UPC");


--
-- Name: instock instock_stores_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instock
    ADD CONSTRAINT instock_stores_fk FOREIGN KEY ("StoreID") REFERENCES public.stores("StoreID");


--
-- Name: purchasedItem purchaseditem_items_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."purchasedItem"
    ADD CONSTRAINT purchaseditem_items_fk FOREIGN KEY ("UPC") REFERENCES public.items("UPC");


--
-- Name: purchasedItem purchaseditem_transactions_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."purchasedItem"
    ADD CONSTRAINT purchaseditem_transactions_fk FOREIGN KEY ("TransID") REFERENCES public.transactions("TransID");


--
-- Name: transactions transactions_customers_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_customers_fk FOREIGN KEY ("CustID") REFERENCES public.customers("CustID");


--
-- Name: transactions transactions_employees_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_employees_fk FOREIGN KEY ("EmpID") REFERENCES public.employees("EmpID");


--
-- Name: transactions transactions_stores_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_stores_fk FOREIGN KEY ("StoreID") REFERENCES public.stores("StoreID");


--
-- PostgreSQL database dump complete
--


PGDMP     "                     x            bootcamp    12.1    12.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    16775    bootcamp    DATABASE     �   CREATE DATABASE bootcamp WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE bootcamp;
                postgres    false            �            1259    16808    buyers    TABLE     �  CREATE TABLE public.buyers (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    telephone character varying NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    quantity integer NOT NULL,
    price integer NOT NULL,
    kk character varying NOT NULL,
    buyer_id integer NOT NULL,
    valid integer NOT NULL
);
    DROP TABLE public.buyers;
       public         heap    postgres    false            �            1259    16806    buyers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.buyers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.buyers_id_seq;
       public          postgres    false    207            !           0    0    buyers_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.buyers_id_seq OWNED BY public.buyers.id;
          public          postgres    false    206            �            1259    16789    events    TABLE     �  CREATE TABLE public.events (
    id integer NOT NULL,
    event_id integer NOT NULL,
    organizer character varying NOT NULL,
    "eventName" character varying NOT NULL,
    "dateStart" date NOT NULL,
    "dateEnd" date NOT NULL,
    artist character varying NOT NULL,
    category text NOT NULL,
    requirement text NOT NULL,
    term text NOT NULL,
    redeem text NOT NULL,
    venue character varying NOT NULL,
    city character varying NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL,
    description text NOT NULL,
    sold integer NOT NULL,
    available integer NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    "fileName" character varying NOT NULL,
    views integer NOT NULL
);
    DROP TABLE public.events;
       public         heap    postgres    false            �            1259    16787    events_id_seq    SEQUENCE     �   CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.events_id_seq;
       public          postgres    false    205            "           0    0    events_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;
          public          postgres    false    204            �            1259    16778    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    "isAdmin" integer NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16776    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    203            #           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    202            �
           2604    16811 	   buyers id    DEFAULT     f   ALTER TABLE ONLY public.buyers ALTER COLUMN id SET DEFAULT nextval('public.buyers_id_seq'::regclass);
 8   ALTER TABLE public.buyers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �
           2604    16792 	   events id    DEFAULT     f   ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);
 8   ALTER TABLE public.events ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            �
           2604    16781    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203                      0    16808    buyers 
   TABLE DATA           |   COPY public.buyers (id, name, email, telephone, "createdAt", "updatedAt", quantity, price, kk, buyer_id, valid) FROM stdin;
    public          postgres    false    207   �                 0    16789    events 
   TABLE DATA           �   COPY public.events (id, event_id, organizer, "eventName", "dateStart", "dateEnd", artist, category, requirement, term, redeem, venue, city, price, quantity, description, sold, available, "createdAt", "updatedAt", "fileName", views) FROM stdin;
    public          postgres    false    205                    0    16778    users 
   TABLE DATA           c   COPY public.users (id, email, username, password, "createdAt", "updatedAt", "isAdmin") FROM stdin;
    public          postgres    false    203   �       $           0    0    buyers_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.buyers_id_seq', 77, true);
          public          postgres    false    206            %           0    0    events_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.events_id_seq', 42, true);
          public          postgres    false    204            &           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 57, true);
          public          postgres    false    202            �
           2606    16816    buyers buyers_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.buyers
    ADD CONSTRAINT buyers_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.buyers DROP CONSTRAINT buyers_pkey;
       public            postgres    false    207            �
           2606    16797    events events_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.events DROP CONSTRAINT events_pkey;
       public            postgres    false    205            �
           2606    16786    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203               M   x�37�442��,LJ���/��-ȬrH�M���K��ə���[Xr���#3M9�M���pr��qqq Q8�         �   x�}���0Eg�+�-N«#�, �,N�JhIKJ��� D%�յu���a3G*H�Վ���b��v5]	N0�"��c�qEʨ`gF�`I6հ&U潾o\F�O�Z:�[A���P����MLq���Ƚ?�MU�t�����v��O�P�HB���^a�
	�i�����v�+���&����f��1ƞV@         �  x�u�ْ�:���9���A�ZTh@&Q�܄A� Q@��h�*W���
I�핽f �,ɿ�$)��>|����?.$-�'����e�U�u���O��<�:N���`��k���)��'&��I�#�!M �O(���� �1Ͱ�K�Ɓ��|	,gM�����le����o� O<G~��n�s�������x�sгx=�̑��	�$����S>W1FhSk�u��=�lx��MJ�%?����H������h�+��j[�1�;�9;:�";f-
�K��;ն&aL����{�x ��%�ם*�#P>̺�l����{�o��P�2�򖼐�if��QJr�v(D�A'x�Aj/��g��Ҙk$���8ٗ�p�@~H���= ��i�����Gy91EZ�u<5$p���H��GJ2].w�lM�#F�-���t_^�� �@W�ͽ�D�T �������vG�y,��#uҜ�,5a�dc�&v#�U1b�H*�0�+�Oƶο����~��_얺����3���Q�y�X�r�.QL���g���Yhv���d�C��� �|pr�l��P�|��$���C!��y�wL�+�$�+b���C�-���n���yu����V�<r�d�;��c����N�t�ŧ��Fl'J^��sî�c^/�}���G��$O���=�h5ogh�V��8= �v'�zE�9����a76�(��ߓ�i���[��Ct/�[�4 ���Ii�ufַ�e1��H_	GSo��,M�Ǚ����2�h�!8��� �̠y������7�,Sy����526SsLa�*+#U|�\ʙ��7t^L��:w�������0D!ܣ��h�Q}{}��7���H�{`�<_?] 8z��OK17������il"尨�I#�IP^�u]���1e�sF4[~�=c"�ć�a����� �     
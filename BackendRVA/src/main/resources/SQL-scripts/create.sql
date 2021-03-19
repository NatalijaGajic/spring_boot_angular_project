DROP TABLE IF EXISTS obrazovanje CASCADE;
DROP TABLE IF EXISTS preduzece CASCADE;
DROP TABLE IF EXISTS sektor CASCADE;
DROP TABLE IF EXISTS radnik CASCADE;

DROP SEQUENCE IF EXISTS sektor_seq;
DROP SEQUENCE IF EXISTS obrazovanje_seq;
DROP SEQUENCE IF EXISTS radnik_seq;
DROP SEQUENCE IF EXISTS preduzece_seq;


--create tables and pk
create table obrazovanje
(
	id integer not null,
	naziv varchar(100) not null,
	stepen_strucne_spreme varchar(10) not null,
	opis varchar(500),
	constraint pk_obrazovanje primary key(id)
);

create table radnik 
(
	id integer not null,
	ime varchar(50) not null,
	prezime varchar(50) not null,
	broj_lk integer not null ,
	obrazovanje integer,
	sektor integer,
	constraint pk_radnik primary key(id)
);

create table sektor 
(
	id integer not null,
	naziv varchar(100) not null,
	oznaka varchar(100),
	preduzece integer,
	constraint pk_sektor primary key(id)
);

create table preduzece
(
	id integer not null,
	naziv varchar(50) not null,
	pib integer not null,
	sediste varchar(100),
	opis varchar(500),
	constraint pk_preduzece primary key(id)
);

--foreign keys
alter table radnik
	add constraint fk_radnik_obrazovanje foreign key(obrazovanje) 
		references obrazovanje(id);
		
alter table radnik 
	add constraint fk_radnik_sektor foreign key(sektor)
		references sektor(id);
		
alter table sektor
	add constraint fk_sektor_preduzece foreign key(preduzece)
		references preduzece(id);

--sequences
create sequence obrazovanje_seq
increment 1;
create sequence preduzece_seq
increment 1;
create sequence radnik_seq
increment 1;
create sequence sektor_seq
increment 1;

--indexes
create index idxfk_radnik_obrazovanje
	on radnik(obrazovanje);
create index idxfk_radnik_sektor
	on radnik(sektor);
create index idxfk_sektor_preduzece
	on sektor(preduzece);
	
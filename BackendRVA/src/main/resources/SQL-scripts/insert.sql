TRUNCATE TABLE obrazovanje CASCADE;
TRUNCATE TABLE  preduzece CASCADE;
TRUNCATE TABLE  sektor CASCADE;
TRUNCATE TABLE  radnik CASCADE;

ALTER SEQUENCE sektor_seq RESTART WITH 1;
ALTER SEQUENCE obrazovanje_seq RESTART WITH 1;
ALTER SEQUENCE radnik_seq RESTART WITH 1;
ALTER SEQUENCE preduzece_seq RESTART WITH 1;

--obrazovanje 
insert into obrazovanje (id, naziv, stepen_strucne_spreme, opis)
values(nextval('obrazovanje_seq'), 'Srednje strucno obrazovanje ', '3. stepen', 'Srednje strucno obrazovanje u trajanju od tri godine');
insert into obrazovanje (id, naziv, stepen_strucne_spreme, opis)
values(nextval('obrazovanje_seq'), 'Srednje obrazovanje ', '4. stepen', 'Srednje obrazovanje u trajanju od cetiri godine (strucno, umetnicko, gimnazijsko)');
insert into obrazovanje (id, naziv, stepen_strucne_spreme, opis)
values(nextval('obrazovanje_seq'), 'Majstorsko i specijalisticko obrazovanje ', '5. stepen', 'Visokokvalifikovani (VKV) radnik');
insert into obrazovanje (id, naziv, stepen_strucne_spreme, opis)
values(nextval('obrazovanje_seq'), 'Osnovne akademske studije(OAS, 180 ESPB) ', '6. stepen', 'Vise obrazovanje u trajanju od dve do tri godine studija');
insert into obrazovanje (id, naziv, stepen_strucne_spreme, opis)
values(nextval('obrazovanje_seq'), 'Osnovne akademske studije(OAS, 240)', '6. stepen', 'Vise obrazovanje sa specijalizacijom u trajanju do godinu dana');
insert into obrazovanje (id, naziv, stepen_strucne_spreme, opis)
values(nextval('obrazovanje_seq'), 'Master akademske studije', '7. stepen', 'Master akademske studije (MAS,180+120 ili 240+60 ESPB)');

insert into obrazovanje (id, naziv, stepen_strucne_spreme, opis)
values(-101, 'Master akademske studije', '7. stepen', 'Master akademske studije');
insert into obrazovanje (id, naziv, stepen_strucne_spreme, opis)
values(-100, 'Master akademske studije', '7. stepen', 'Master akademske studije');


--preduzece
insert into preduzece (id, naziv, opis, pib, sediste)
values(nextval('preduzece_seq'),'SDD Information Technology Group', 'SDD Information Technology Group', 778262, 'Beograd');
insert into preduzece (id, naziv, opis, pib, sediste)	
values(nextval('preduzece_seq'),'SATURN ELECTRIC', 'SATURN ELECTRIC', 778462, 'Beograd');
insert into preduzece (id, naziv, opis, pib, sediste)
values(nextval('preduzece_seq'),'Feniks Sting', 'Feniks Sting', 778461, 'Pukovac');
insert into preduzece (id, naziv, opis, pib, sediste)
values(nextval('preduzece_seq'),'Gepard Vis', 'Gepard Vis', 776661, 'Novi Sad');
insert into preduzece (id, naziv, opis, pib, sediste)
values(nextval('preduzece_seq'),'ATB Sever', 'ATB Sever', 774441, 'Subotica');

insert into preduzece (id, naziv, opis, pib, sediste)
values(-101,'ATB Sever', 'ATB Sever', 774551, 'Subotica');
insert into preduzece (id, naziv, opis, pib, sediste)
values(-100,'ATB Sever', 'ATB Sever', 774445, 'Subotica');

--sektor
insert into sektor (id, naziv, oznaka, preduzece)
values(nextval('sektor_seq'),'Sektor nabavke','SNSDDITC', 1);
insert into sektor (id, naziv, oznaka, preduzece)
values(nextval('sektor_seq'),'Sektor nabavke','SNSE', 2);
insert into sektor (id, naziv, oznaka, preduzece)
values(nextval('sektor_seq'),'Sektor proizvodnje','SPSDDITC', 1);
insert into sektor (id, naziv, oznaka, preduzece)
values(nextval('sektor_seq'),'Sektor proizvodnje','SPFS', 3);
insert into sektor (id, naziv, oznaka, preduzece)
values(nextval('sektor_seq'),'Sektor proizvodnje','SPGV', 4);
insert into sektor (id, naziv, oznaka, preduzece)
values(nextval('sektor_seq'),'Sektor nabavke','SNGV', 4);
insert into sektor (id, naziv, oznaka, preduzece)
values(nextval('sektor_seq'),'Sektor nabavke','SNABTS', 5);
insert into sektor (id, naziv, oznaka, preduzece)
values(nextval('sektor_seq'),'Sektor proizvodnje','SPABTS', 5);
insert into sektor (id, naziv, oznaka, preduzece)
values(nextval('sektor_seq'),'Sektor IT','SITSDDITC', 1);

insert into sektor (id, naziv, oznaka, preduzece)
values(-101,'Sektor proizvodnje','SPFS', -101);
insert into sektor (id, naziv, oznaka, preduzece)
values(-100,'Sektor proizvodnje','SPFS', -101);

--radnici
insert into radnik (id, ime, prezime, broj_lk, obrazovanje, sektor)
values(nextval('radnik_seq'),'Aleksandar', 'Gajic', 878723,1,1);
insert into radnik (id, ime, prezime, broj_lk, obrazovanje, sektor)
values(nextval('radnik_seq'),'Stefan', 'Ostojic', 874723,2,2);
insert into radnik (id, ime, prezime, broj_lk, obrazovanje, sektor)
values(nextval('radnik_seq'),'Vladimir', 'Filipovic', 668723,3,3);
insert into radnik (id, ime, prezime, broj_lk, obrazovanje, sektor)
values(nextval('radnik_seq'),'Dejan', 'Tosenberger', 873723,4,1);
insert into radnik (id, ime, prezime, broj_lk, obrazovanje, sektor)
values(nextval('radnik_seq'),'Dusan', 'Krstic', 478723,5,4);
insert into radnik (id, ime, prezime, broj_lk, obrazovanje, sektor)
values(nextval('radnik_seq'),'Milan', 'Reljin', 128723,6,5);
insert into radnik (id, ime, prezime, broj_lk, obrazovanje, sektor)
values(nextval('radnik_seq'),'Natalija', 'Gajic', 138723,6,7);

insert into radnik (id, ime, prezime, broj_lk, obrazovanje, sektor)
values(-101,'Milan', 'Reljin', 128723,-101,-101);
insert into radnik (id, ime, prezime, broj_lk, obrazovanje, sektor)
values(-100,'Milan', 'Reljin', 128723,-101,-101);




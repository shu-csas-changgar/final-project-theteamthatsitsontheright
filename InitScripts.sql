delete from country where country_id >0; 
alter table country auto_increment = 1;
insert into country(name) values('United States');

delete from equipment_type where equipment_type_id >0; 
alter table equipment_type auto_increment = 1;
insert into equipment_type(type_name) values('Desktop PC');
insert into equipment_type(type_name) values('Laptop');
insert into equipment_type(type_name) values('Server');
insert into equipment_type(type_name) values('Printer');
insert into equipment_type(type_name) values('Smartphone');
insert into equipment_type(type_name) values('Tablet');
insert into equipment_type(type_name) values('Display');

delete from contract_type where contract_type_id >0; 
alter table contract_type auto_increment = 1;
insert into contract_type(contract_name) values('Owned');
insert into contract_type(contract_name) values('Leased');
insert into contract_type(contract_name) values('Rented');
insert into contract_type(contract_name) values('Temporary');

delete from state where state_id >0; 
alter table state auto_increment = 1;
insert into state(name) values('Alabama');
insert into state(name) values('Alaska');
insert into state(name) values('Arizona');
insert into state(name) values('Arkansas');
insert into state(name) values('California');
insert into state(name) values('Colorado');
insert into state(name) values('Connecticut');
insert into state(name) values('Delaware');
insert into state(name) values('Florida');
insert into state(name) values('Georgia');
insert into state(name) values('Hawaii');
insert into state(name) values('Idaho');
insert into state(name) values('Illinois');
insert into state(name) values('Indiana');
insert into state(name) values('Iowa');
insert into state(name) values('Kansas');
insert into state(name) values('Kentucky');
insert into state(name) values('Louisiana');
insert into state(name) values('Maine');
insert into state(name) values('Maryland');
insert into state(name) values('Massachusetts');
insert into state(name) values('Michigan');
insert into state(name) values('Minnesota');
insert into state(name) values('Mississippi');
insert into state(name) values('Missouri');
insert into state(name) values('Montana');
insert into state(name) values('Nebraska');
insert into state(name) values('Nevada');
insert into state(name) values('New Hampshire');
insert into state(name) values('New Jersey');
insert into state(name) values('New Mexico');
insert into state(name) values('New York');
insert into state(name) values('North Carolina');
insert into state(name) values('North Dakota');
insert into state(name) values('Ohio');
insert into state(name) values('Oklahoma');
insert into state(name) values('Oregon');
insert into state(name) values('Pennsylvania');
insert into state(name) values('Rhode Island');
insert into state(name) values('South Carolina');
insert into state(name) values('South Dakota');
insert into state(name) values('Tennessee');
insert into state(name) values('Texas');
insert into state(name) values('Utah');
insert into state(name) values('Vermont');
insert into state(name) values('Virginia');
insert into state(name) values('Washington');
insert into state(name) values('West Virginia');
insert into state(name) values('Wisconsin');
insert into state(name) values('Wyoming');

delete from city where city_id >0; 
alter table city auto_increment = 1;
insert into city(name) values('South Orange');
insert into city(name) values('Jersey City');
insert into city(name) values('Anchorage');

delete from location where location_id >0; 
alter table location auto_increment = 1;
insert into location(location_name, address, city_id, state_id, country_id, zip_code)
values('Seton Hall University', '400 South Orange Ave', 1, 30, 1, '07079');
insert into location(location_name, address, city_id, state_id, country_id, zip_code)
values('Lenovo Dist. NJ', '123 Docker St.', 2, 30, 1, '07302');
insert into location(location_name, address, city_id, state_id, country_id, zip_code)
values('Anchorage Office', '4413 Blackwell Street', 3, 2, 1, '99503');

delete from office where office_id >0; 
alter table office auto_increment = 1;
insert into office(office_name, floor_numbers, location_id)
values('McNulty Hall', 1, 1);
insert into office(office_name, floor_numbers, location_id)
values('Middle of Nowhere', 1, 4);

delete from vendor where vendor_id >0; 
alter table vendor auto_increment = 1;
insert into vendor(vendor_name, location_id)
values('Lenovo US' , 2);

delete from room where room_id >0; 
alter table room auto_increment = 1;
insert into room(floor_number, max_attendees, in_use, smart_enabled, office_id)
values(1, 5, False, False, 1);

insert into reservation(reservation_name, room_id, reservation_start, reservation_end)
values('Boy',1,'1970-01-01 00:00:01','1970-01-01 00:00:02');

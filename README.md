create table visitors(
    visitor_id serial primary key,
    visitor_name varchar(15),
    visitor_age int,
    date_of_visit date,
    time_of_visit time,
    assisted_by varchar(15),
    comments varchar(50)
)

insert into visitors(
    visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by, comments
) values(
    'Xolani',
    22,
    '03-03-2020',
    '20:00',
    'Njabulo',
    'It\s a nice place to visit'
)
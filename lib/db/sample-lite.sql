insert into User
(userId, username, password)
values
(-1, 'calvin', '$2a$10$KIScq4TmyeGqhU7/9cKzw.8Z53uris9QxztKT9VLP0FyWnP8CM5Py') --password is "foo"
;

insert into Connection
(databaseType, hostname, database, username, password, ownerId)
values
('pg', 'localhost', 'booktown', 'postgres', 'postgres', -1)
;
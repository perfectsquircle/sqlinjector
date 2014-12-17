create table User (
    userId integer primary key autoincrement,
    username text not null unique,
    password text,
    preferences json,
    inactiveDate timestamp with timezone
);

create table Permission (
    permissionId integer primary key autoincrement,
    name text not null
);

create table userPermission (
    userPermissionId integer primary key autoincrement,
    userId integer not null,
    permissionId integer not null,
    foreign key(userId) references User,
    foreign key(permissionId) references Permission
);

create table DatabaseType (
    databaseType text primary key
);

insert into DatabaseType (databaseType) values ('pg');
insert into DatabaseType (databaseType) values ('mysql');
insert into DatabaseType (databaseType) values ('maria');
insert into DatabaseType (databaseType) values ('sqlite3');
insert into DatabaseType (databaseType) values ('oracle');

create table Connection (
    connectionId integer primary key autoincrement,
    databaseType text not null,
    hostname text not null,
    database text not null,
    username text not null,
    password text not null,
    ownerId integer not null,
    inactiveDate timestamp with timezone,
    foreign key(databaseType) references DatabaseType,
    foreign key(ownerId) references User(userId)
);

create table StatementType (
    statementType text primary key
);

create table Statement (
    statementId integer primary key autoincrement,
    statementText text not null,
    parameters text[],
    statementType not null,
    createDate timestamp with timezone not null,
    foreign key(statementType) references StatementType
);

create table Report (
    reportId integer primary key autoincrement,
    name text not null,
    description text,
    inactiveDate timestamp with timezone
);



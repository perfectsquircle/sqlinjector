create database sqin;

create table sqin.User (
    userId uuid primary key,
    username text not null unique,
    password text,
    preferences json,
    inactiveDate timestamp with timezone
);

create table sqin.Permission (
    permissionId uuid primary key,
    name text not null
);

create table sqin.userPermission (
    userPermissionId uuid primary key,
    userId uuid not null references sqin.User,
    permissionId uuid not null references sqin.Permission
);

create table sqin.DatabaseType (
    databaseType text primary key
)

create table sqin.Connection (
    connectionId uuid primary key,
    databaseType text not null references sqin.DatabaseType,
    hostname text not null,
    database text not null,
    username text not null,
    password text not null,
    inactiveDate timestamp with timezone
);

create table sqin.StatementType (
    statementType text primary key
);

create table sqin.Statement (
    statementId uuid primary key,
    statementText text not null,
    parameters text[],
    statementType not null references sqin.StatementType,
    createDate timestamp with timezone not null default now()
);

create table sqin.Report (
    reportId uuid primary key,
    name text not null,
    description text,
    inactiveDate timestamp with timezone
);



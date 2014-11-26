create table User (
    userId uuid primary key,
    username text not null unique,
    password text,
    preferences json,
    inactiveDate timestamp with timezone
);

create table Permission (
    permissionId uuid primary key,
    name text not null
);

create table userPermission (
    userPermissionId uuid primary key,
    userId uuid not null references User,
    permissionId uuid not null references Permission
);

create table DatabaseType (
    databaseType text primary key
)

create table Connection (
    connectionId uuid primary key,
    databaseType text not null references DatabaseType,
    hostname text not null,
    database text not null,
    username text not null,
    password text not null,
    inactiveDate timestamp with timezone
);

create table StatementType (
    statementType text primary key
);

create table Statement (
    statementId uuid primary key,
    statementText text not null,
    parameters text[],
    statementType not null references StatementType,
    createDate timestamp with timezone not null default now()
);

create table Report (
    reportId uuid primary key,
    name text not null,
    description text,
    inactiveDate timestamp with timezone
);



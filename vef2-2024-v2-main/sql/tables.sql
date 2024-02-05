create table teams (
  id serial primary key,
  name text not null,
);

create table games(
  id serial primary key
  date date not null,
  home integer not null,
  away integer not null,
  home_score integer not null,
  away_score integer not null,
  foreign key(home) references teams(id),
  foreign key(away) references teams(id),
);

create table users (
  id serial primary key,
  username text not null,
  password text not null
);

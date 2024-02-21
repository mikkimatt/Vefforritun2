create table if not exists public.teams (
  id serial primary key,
  name text not null,
);

create table if not exists public.games(
  id serial primary key
  date date not null,
  home integer not null UNIQUE,
  away integer not null UNIQUE,
  homeScore integer not null,
  awayScore integer not null,
  foreign key(home) references teams(id),
  foreign key(away) references teams(id),
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if not exists public.users (
  id serial primary key,
  name CHARACTER VARYING(64) NOT NULL,
  username character varying(64) NOT NULL UNIQUE,
  password character varying(256) NOT NULL,
  admin BOOLEAN DEFAULT false
);

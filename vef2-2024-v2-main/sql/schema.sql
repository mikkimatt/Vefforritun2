create table if not exists public.teams (
  id serial primary key autoincrement,
  name text not null,
  slug text not null unique,
  description text
);

create table if not exists public.games(
  id serial primary key,
  date TIMESTAMP not null,
  home integer not null,
  away integer not null,
  home_score integer not null,
  away_score integer not null,
  constraint fk_home foreign key(home) references teams(id),
  constraint fk_away foreign key(away) references teams(id),
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

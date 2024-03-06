export type Games = {
    id: number;
    date: string;
    home: string;
    away: string;
    home_score: number;
    away_score: number;
    created: string;
    updated: string;
};

export type Game = {
    id: number;
    date: string;
    home: string;
    away: string;
    home_score: number;
    away_score: number;
    created: string;
    updated: string;
};

export type Teams = {
    id: number;
    slug: string;
    name: string;
    description: string;
    created: string;
    updated: string;
};

export type Team = {
    id: number;
    name: string;
    description: string;
    created: string;
    updated: string;
};
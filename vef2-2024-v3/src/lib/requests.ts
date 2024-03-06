import e, { NextFunction, Request, Response } from "express";
// Error handler
export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {    
    if (err.message === 'No games found') {
        res.status(404).json({ error: "Not found" });
    } else if (err.message === 'Game not found') {
        res.status(404).json({ error: "Not found" });
    } else if (err.message === 'Game not created') {
        res.status(500).json({ error: "Server error" });
    } else if (err.message === 'Bad Request: Home and away team cannot be the same') {
        res.status(400).json({ error: "Bad request: Home and away team cannot be the same" });
    } else if (err.message === 'Bad Request: No paramaters provided to update, must have at least one parameter: date, home, away, home_score, away_score') {
        res.status(400).json({ error: "Bad request: No paramaters provided to update, must have at least one parameter: date, home, away, home_score, away_score" });
    } else if (err.message === 'Game not updated') {
        res.status(500).json({ error: "Server error" });
    } else if (err.message === 'No game deleted') {
        res.status(500).json({ error: "Server error: No game deleted" });
    } else if (err.message === 'No teams found') {
        res.status(404).json({ error: "Not found" });
    } else if (err.message === 'Team not found') {
        res.status(404).json({ error: "Not found" });
    } else if (err.message === 'Team not created') {
        res.status(500).json({ error: "Server error" });
    } else if (err.message === 'Bad Request: Team not updated, needs a name') {
        res.status(400).json({ error: "Bad request: Team not updated, needs a name" });
    } else if (err.message === 'Team not updated') {
        res.status(500).json({ error: "Server error" });
    } else if (err.message === 'Team not deleted') {
        res.status(500).json({ error: "Server error: No team deleted" });
    } else if (err instanceof SyntaxError && "status" in err && err.status === 400 && "body" in err) {
        res.status(400).json({ error: "Invalid JSON" });
    } else {
        next(err);
    }
}
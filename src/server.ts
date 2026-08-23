import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
const app = express();

app.get('/health', (_req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: "Server running successfully"
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
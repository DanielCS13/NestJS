// src/types/session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    submissions?: {
      count: number;
      lastSubmissionTime: number;
    };
  }
}

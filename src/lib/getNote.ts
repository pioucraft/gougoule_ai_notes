import { and, eq, isNull, or } from "drizzle-orm";
import { db } from "../db/db";
import { note, user, type noteType } from "../db/schema";
import { getUserId } from "./getUserId";

export async function getNote(noteId: number | null, token: string): Promise<string | noteType[]> {
    const userId = await getUserId(token);
    if(userId == false) return "token invalid"
    if(noteId == null) {
        return (await db.select().from(note).where(and(isNull(note.parent), eq(note.userId, userId))));
    }
    let content = await db.select().from(note).where(or(and(eq(note.id, noteId), eq(note.userId, userId)), and(eq(note.userId, userId), eq(note.parent, noteId))));
    if(content.length) return content
    else return "note note found"
}
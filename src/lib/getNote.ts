import { and, eq, isNull } from "drizzle-orm";
import { db } from "../db/db";
import { note, type noteType } from "../db/schema";
import { getUserId } from "./getUserId";

export async function getNote(noteId: number | null, token: string): Promise<noteType | string | noteType[]> {
    const userId = await getUserId(token);
    if(userId == false) return "token invalid"
    if(noteId == null) {
        return (await db.select().from(note).where(and(isNull(note.parent), eq(note.userId, userId))));
    }
    let content = await db.select().from(note).where(and(eq(note.id, noteId), eq(note.userId, userId)));
    if(content.length) return content[0]
    else return "note note found"
}
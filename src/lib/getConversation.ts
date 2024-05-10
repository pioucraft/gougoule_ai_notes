import { and, eq, isNull } from "drizzle-orm";
import { db } from "../db/db";
import { conversation, type conversationType } from "../db/schema";
import { getUserId } from "./getUserId";

export async function getConversation(conversationId: number | null, token: string): Promise<conversationType | conversationType[] | string> {
    const userId = await getUserId(token)
    if(userId == false) return "token invalid"
    if(conversationId == null) return await db.select().from(conversation).where(and(isNull(conversation.parent), eq(conversation.userId, userId)));
    let content = await db.select().from(conversation).where(and(eq(conversation.id, conversationId), eq(conversation.userId, userId)));
    if(content.length) return content[0]
    else return "conversation not found"
}
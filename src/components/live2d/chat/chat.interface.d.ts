export type ChatMessage = {
    id: string;
    type: "user" | "agent";
    content: string;
    timestamp: Date;
};

export enum InteractionMode {
    Chat = "chat",
    Voice = "voice",
}

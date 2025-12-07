export type NodeInfo = {
    id: string;
    title: string;
    description: string;
    context: string;
}

export type Message = {
    role: 'user' | 'bot';
    content: string;
};

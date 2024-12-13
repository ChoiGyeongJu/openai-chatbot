interface Message {
  contents: string;
}

interface Chat {
  id: number;
  messages: Message[];
}

export type { Message, Chat };

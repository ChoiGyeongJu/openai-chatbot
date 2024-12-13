interface Message {
  contents: string;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

export type { Message, Chat };

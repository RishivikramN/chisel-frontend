export interface Board {
  id: string;
  title: string;
  visible?: boolean;
}

export interface EditBoard {
  boardId: string | null;
  title: string;
}

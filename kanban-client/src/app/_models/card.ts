export interface Card {
   title: string;
   description?: string;
   todoList?: Todo[]; 
   dueDate?: Date;
   estimatedTime?: number;
   tags?: string[];
}

export interface Todo {
    text: string;
    complete: boolean;
}
export interface Todo{
  id: string;
  task: string;
  category?: string;
  isDone: boolean;
}
export interface Category{
  id: string;
  name: string;
  color?: string;
  
}
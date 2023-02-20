import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api
  .enhanceEndpoints({ addTagTypes: ["todo", "todo-list"] })
  .injectEndpoints({
    endpoints: (build) => ({
      todoListsFindAll: build.query<
        TodoListsFindAllApiResponse,
        TodoListsFindAllApiArg
      >({
        query: (queryArg) => ({
          url: `/todo-lists`,
          params: { year: queryArg.year, month: queryArg.month },
        }),
        providesTags: ["todo-list"],
      }),
      todoListsFindOne: build.query<
        TodoListsFindOneApiResponse,
        TodoListsFindOneApiArg
      >({
        query: (queryArg) => ({ url: `/todo-lists/${queryArg.uid}` }),
      }),
      todoListsUpdate: build.mutation<
        TodoListsUpdateApiResponse,
        TodoListsUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `/todo-lists/${queryArg.uid}`,
          method: "PATCH",
          body: queryArg.updateTodoListDto,
        }),
      }),
      todoListsRemove: build.mutation<
        TodoListsRemoveApiResponse,
        TodoListsRemoveApiArg
      >({
        query: (queryArg) => ({
          url: `/todo-lists/${queryArg.uid}`,
          method: "DELETE",
        }),
      }),
      todosCreate: build.mutation<TodosCreateApiResponse, TodosCreateApiArg>({
        query: (queryArg) => ({
          url: `/todos`,
          method: "POST",
          body: queryArg.createTodoDto,
        }),
        invalidatesTags: (res) => [{ type: "todo", id: res?.uid }, "todo-list"],
      }),
      todosFindOne: build.query<TodosFindOneApiResponse, TodosFindOneApiArg>({
        query: (queryArg) => ({ url: `/todos/${queryArg.uid}` }),
      }),
      todosUpdate: build.mutation<TodosUpdateApiResponse, TodosUpdateApiArg>({
        query: (queryArg) => ({
          url: `/todos/${queryArg.uid}`,
          method: "PATCH",
          body: queryArg.updateTodoDto,
        }),
        invalidatesTags: (res) => [{ type: "todo", id: res?.uid }, "todo-list"],
      }),
      todosRemove: build.mutation<TodosRemoveApiResponse, TodosRemoveApiArg>({
        query: (queryArg) => ({
          url: `/todos/${queryArg.uid}`,
          method: "DELETE",
        }),
        invalidatesTags: (res) => [{ type: "todo", id: res?.uid }, "todo-list"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as todoApi };
export type TodoResponse = {
  uid: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};
export type TodoListResponse = {
  uid: string;
  dueDate: string;
  ToDo: TodoResponse[];
  _count: {
    ToDo: number;
  };
};
export type TodoListsFindAllApiResponse = TodoListResponse[] | undefined;
export type TodoListsFindAllApiArg = {
  year?: string;
  month?: number;
};
export type TodoListsFindOneApiResponse = unknown;
export type TodoListsFindOneApiArg = {
  uid: string;
};
export type TodoListsUpdateApiResponse = unknown;
export type TodoListsUpdateApiArg = {
  uid: string;
  updateTodoListDto: UpdateTodoListDto;
};
export type TodoListsRemoveApiResponse = unknown;
export type TodoListsRemoveApiArg = {
  uid: string;
};
export type TodosCreateApiResponse = TodoResponse;
export type TodosCreateApiArg = {
  createTodoDto: CreateTodoDto;
};
export type TodosFindOneApiResponse = TodoResponse;
export type TodosFindOneApiArg = {
  uid: string;
};
export type TodosUpdateApiResponse = TodoResponse;
export type TodosUpdateApiArg = {
  uid: string;
  updateTodoDto: UpdateTodoDto;
};
export type TodosRemoveApiResponse = { uid: string };
export type TodosRemoveApiArg = {
  uid: string;
};
export type UpdateTodoListDto = {
  dueDate?: string;
};
export type CreateTodoDto = {
  title: string;
  description?: string;
  listId?: string;
  dueDate?: string;
};
export type UpdateTodoDto = {
  title?: string;
  description?: string;
  listId?: string;
  dueDate?: string;
};
export const {
  useTodoListsFindAllQuery,
  useTodoListsFindOneQuery,
  useTodoListsUpdateMutation,
  useTodoListsRemoveMutation,
  useTodosCreateMutation,
  useTodosFindOneQuery,
  useTodosUpdateMutation,
  useTodosRemoveMutation,
} = injectedRtkApi;

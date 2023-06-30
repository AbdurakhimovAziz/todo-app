export enum TODO_STATUS {
  BACKLOG = 'backlog',
  TODO = 'todo',
  IN_PROGRESS = 'in progress',
  TEST = 'test',
  DONE = 'done',
}

export const todoStatusList = Object.keys(
  TODO_STATUS
) as (keyof typeof TODO_STATUS)[];

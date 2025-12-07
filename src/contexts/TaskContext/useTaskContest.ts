import { useContext } from 'react';
import { TaskContext } from './TaskContest';

export function useTaskContext() {
  return useContext(TaskContext);
}

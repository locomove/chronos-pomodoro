import { useEffect, useReducer, useRef } from 'react';
import { loadBeep } from '../../utils/loadBeep';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskContext } from './TaskContest';
import { initialTaskState } from './initialTaskState';
import { TaskActionsTypes } from './taskActions';
import { taskReducer } from './taskReducer';

type TaskContextProviderProps = {
  children: React.ReactNode;
};
export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();

  // eslint-disable-next-line react-hooks/refs
  worker.onmessage(e => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({
        type: TaskActionsTypes.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionsTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
    }
    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

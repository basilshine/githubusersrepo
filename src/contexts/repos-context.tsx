import * as React from 'react';

import { getRepos, getReposInfo } from '../services/repos-service';
import REQUEST_STATUS from '../enums';
import { IRepo } from '../components/Repo/Repo';
import { IRepoInfo } from '../components/RepoInfo/RepoInfo';

type Action = { type: string; payload?: {} };

const initialState = {
  data: [],
  repos: [] as IRepo[],
  status: REQUEST_STATUS.IDLE,
  repo_info: {} as IRepoInfo,
  error: []
};

type State = typeof initialState;

interface IDispatcherProps {
  getRepos: (name: string) => void;
  getReposInfo: (full_name: string) => void;
}

function reposReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'REPOS_FETCH_IN_PROGRESS':
      return {
        ...state,
        repo_info: {} as IRepoInfo,
        status: REQUEST_STATUS.IN_PROGRESS,
        error: []
      };

    case 'REPOS_FETCH_SUCCESS':
      return {
        data: action.payload as [],
        repos: action.payload as IRepo[],
        status: REQUEST_STATUS.SUCCESS,
        repo_info: {} as IRepoInfo,
        error: []
      };

    case 'REPOS_FETCH_ERROR':
      return {
        data: [],
        repos: [],
        status: REQUEST_STATUS.ERROR,
        repo_info: {} as IRepoInfo,
        error: action.payload as []
      };

    case 'REPOS_INFO_FETCH_IN_PROGRESS':
      return {
        ...state,
        status: REQUEST_STATUS.IN_PROGRESS,
        repo_info: {} as IRepoInfo,
        error: []
      };

    case 'REPOS_INFO_FETCH_SUCCESS':
      return {
        ...state,
        repo_info: action.payload as IRepoInfo,
        status: REQUEST_STATUS.IN_PROGRESS,
        error: []
      };

    case 'REPOS_INFO_FETCH_ERROR':
      return {
        data: [],
        repos: [],
        status: REQUEST_STATUS.ERROR,
        repo_info: {} as IRepoInfo,
        error: action.payload as []
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const ReposStateContext = React.createContext<State>(initialState);

const ReposDispatcherContext = React.createContext<typeof reposReducer>(
  reposReducer
);

function ReposProvider(props: any): JSX.Element {
  const { value, children } = props;
  const [state, dispatch] = React.useReducer(reposReducer, initialState);
  const dispatchRef = React.useRef({} as any);

  dispatchRef.current.getRepos = async (name: string) => {
    try {
      dispatch({ type: 'REPOS_FETCH_IN_PROGRESS' });

      const repos = await getRepos(name);

      dispatch({ type: 'REPOS_FETCH_SUCCESS', payload: repos });
    } catch (error) {
      dispatch({ type: 'REPOS_FETCH_ERROR', payload: error });
    }
  };

  dispatchRef.current.getReposInfo = async (full_name: string) => {
    try {
      dispatch({ type: 'REPOS_INFO_FETCH_IN_PROGRESS' });

      const repo_info = await getReposInfo(full_name);

      dispatch({ type: 'REPOS_INFO_FETCH_SUCCESS', payload: repo_info });
    } catch (error) {
      dispatch({ type: 'REPOS_INFO_FETCH_ERROR', payload: error });
    }
  };

  return (
    <ReposDispatcherContext.Provider value={dispatchRef.current}>
      <ReposStateContext.Provider value={value || state}>
        {children}
      </ReposStateContext.Provider>
    </ReposDispatcherContext.Provider>
  );
}

function useReposState(): State {
  const value = React.useContext(ReposStateContext);

  if (value === undefined) {
    throw new Error('[ERROR]: useReposState has no value');
  }

  return value as State;
}

function useReposDispatcher(): IDispatcherProps {
  const value = React.useContext(ReposDispatcherContext);

  if (value === undefined) {
    throw new Error('[ERROR]: useReposDispatcher has no value');
  }

  return value as any;
}

export { ReposProvider, useReposState, useReposDispatcher };

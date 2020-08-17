import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import FilteredRepoList from '../FilteredRepoList/FilteredRepoList';
import InputUser from '../InputUser/InputUser';

import {
  ReposProvider,
  useReposDispatcher
} from '../../contexts/repos-context';

const App: React.FC = (): JSX.Element => {
  const dispatcher = useReposDispatcher();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatcher.getRepos(event.target.value);
  };

  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">GITHUB user repos</h1>
      </Jumbotron>
      <InputUser handleChange={handleChange} />
      <FilteredRepoList />
    </Container>
  );
};

export default () => (
  <ReposProvider>
    <App />
  </ReposProvider>
);

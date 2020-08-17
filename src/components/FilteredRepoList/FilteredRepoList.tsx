import * as React from 'react';
import Row from 'react-bootstrap/Row';

import { useReposState } from '../../contexts/repos-context';
import Repo from '../Repo/Repo';

const FilteredRepoList: React.FC = (): JSX.Element => {
  const { repos } = useReposState();
  return (
    <>
      {repos.length === 0 && <Row>No repos found.</Row>}

      {repos.length > 0 &&
        repos.map((repo) => <Repo key={repo.id} {...repo} />)}
    </>
  );
};

export default FilteredRepoList;

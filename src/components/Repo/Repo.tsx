import * as React from 'react';
import Card from 'react-bootstrap/Card';

import RepoInfo from '../RepoInfo/RepoInfo';

export interface IRepo {
  id: number;
  description: string;
  name: string;
  full_name: string;
}

const Repo: React.FC<IRepo> = (props: IRepo): JSX.Element => {
  const { description, name } = props;

  return (
    <Card>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <RepoInfo {...props} />
      </Card.Body>
    </Card>
  );
};

export default Repo;

import * as React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Base64 } from 'js-base64';

import {
  useReposDispatcher,
  useReposState
} from '../../contexts/repos-context';
import { IRepo } from '../Repo/Repo';

export interface IRepoInfo {
  content: string;
  encoding: string;
  sha: string;
}

const RepoInfo: React.FC<IRepo> = (props: IRepo): JSX.Element => {
  const { full_name, name } = props;
  const { repo_info } = useReposState();
  const [show, setShow] = React.useState(false);
  const dispatcher = useReposDispatcher();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    dispatcher.getReposInfo(full_name);
    setShow(true);
  };

  const repo_info_content = repo_info.content && Base64.atob(repo_info.content);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View readme
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header translate="" closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>{repo_info_content}</Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RepoInfo;

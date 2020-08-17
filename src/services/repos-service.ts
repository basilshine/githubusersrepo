const getRepos = async (name: string): Promise<any> => {
  const response = await fetch(`https://api.github.com/users/${name}/repos`);

  if (!response.ok) {
    throw new Error('[REQUEST_ERROR]');
  }

  return response.json();
};

const getReposInfo = async (full_name: string): Promise<any> => {
  const response = await fetch(
    `https://api.github.com/repos/${full_name}/readme`
  );

  if (!response.ok) {
    throw new Error('[REQUEST_ERROR]');
  }

  return response.json();
};

export { getRepos, getReposInfo };

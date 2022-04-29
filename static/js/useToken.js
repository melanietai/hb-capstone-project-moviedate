const useToken = () => {

  const getToken = () => {
    const userToken = localStorange.getItem('token');
    return userToken
  };
  
  const [token, setToken] = React.useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    localStorange.removeItem('token');
    setToken(null);
  };

  return {
    setToken: saveToken,
    token: token,
    removeToken: removeToken
  }

};
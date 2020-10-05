import AsyncStorage from '@react-native-community/async-storage';

const CookiesService = (() => {
  const _setToken = tokenObj => {
    AsyncStorage.setItem('access_token', tokenObj.accessToken);
  };
  const _getAccessToken = () => {
    return AsyncStorage.getItem('access_token');
  };
  const _clearToken = () => {
    AsyncStorage.removeItem('access_token');
  };
  return {
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    clearToken: _clearToken
  };
})();
export default CookiesService;

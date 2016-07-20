import _ from 'lodash';
const userSchema = {
  name: true,
  username: true,
  password: true,
  facebookId: true,
  facebookAccessToken: true
};

function convertToQParams(searchObj) {
  // look at search params and search by the most specific one given
  console.log('searchObj', searchObj);
  let searchParams = '';
  let handleOr = false;
  // build search params based on input
  _.each(searchObj, (val, key) => {
    if (handleOr) {
      searchParams += ' OR ';
    }
    if (userSchema[key]) {
      searchParams += `${key} = ${val}`;
      handleOr = true;
    }
  });

  console.log(searchParams);
}

findUser({
  username: 'alex'
});

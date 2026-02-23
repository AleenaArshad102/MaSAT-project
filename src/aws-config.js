// AWS Amplify Configuration
// Configured with MaSAT Voice Chat AWS resources

const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_bPzSUFmfL',
      userPoolClientId: '1dd5h8ealt89cbbdblv78vg636',
      region: 'us-east-1',
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true,
        username: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: 'https://6skby47kzjcgdke4ita7l62dby.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'userPool',
    },
  },
}

console.log('🔧 Amplify configuration loaded:', {
  userPoolId: awsconfig.Auth.Cognito.userPoolId,
  region: awsconfig.Auth.Cognito.region,
  graphqlEndpoint: awsconfig.API.GraphQL.endpoint,
})

export default awsconfig

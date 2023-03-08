import querystring from 'querystring';

export default function() {

  const client_id = 'd61d9c2cce0241c1bee240e797303b23';
  const url = 'https://accounts.spotify.com/authorize?';
  const redirect_uri = 'http://localhost:3000/auth-check'
  const scope = '';

  return (
    <div>
      <div>please log in through spotify</div>
      <a href={url + querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        //state is optional but recommended, https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
        // state: state
      })}>
        <button>login to spotify</button>
      </a>
      <a href='http://localhost:3000/test'>go to test page</a>
    </div>
  )
}
